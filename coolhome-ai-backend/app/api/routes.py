"""
API ROUTES (UPDATED WITH SCORE CALCULATIONS)
Matches the new JSON format from Member 1's frontend
"""
import traceback
from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional, List
from app.core.recommendations import RecommendationEngine
from app.core.gemini_service import GeminiService
from app.database.storage import (get_analytics_summary,save_analysis, get_analysis_history)
from app.scoring.cooling_score import calculate_cooling_score
from app.scoring.sustainability_score import calculate_sustainability_score
from app.scoring.energy_score import calculate_energy_score
from app.database.database import SessionLocal
import tempfile
import os

from app.core.vision import analyze_room as analyze_image

# ============================================================
# SETUP
# ============================================================

router = APIRouter(prefix="/api", tags=["api"])
rec_engine = RecommendationEngine()
gemini_service = GeminiService()


# ============================================================
# DATA MODELS (Updated to match frontend JSON)
# ============================================================

class RoomFeatures(BaseModel):
    """
    Updated to match new JSON format from frontend
    
    Example from frontend:
    {
      "windows": 1,
      "ventilation": "poor",
      "sunlight": "high",
      "indoor_plants": false,
      "furniture_density": "high",
      "airflow_obstruction": "high"
    }
    """
    
    # Required fields
    windows: int
    ventilation: str  # "poor", "moderate", "good"
    sunlight: str    # "low", "moderate", "high"
    furniture_density: str  # "low", "moderate", "high"
    airflow_obstruction: str  # "low", "moderate", "high"
    
    # Optional fields
    indoor_plants: bool = False
    window_direction: Optional[str] = None  # "north", "south", "east", "west"
    curtain_type: Optional[str] = None
    roof_visible: Optional[bool] = None
    room_size: Optional[float] = None
    location: Optional[str] = None
    current_temperature: Optional[float] = None


class Recommendation(BaseModel):
    """Single recommendation"""
    category: str
    action: str
    priority: Optional[str] = None
    expected_impact: str
    cost: Optional[str] = None
    implementation_difficulty: Optional[str] = None
    details: Optional[str] = None
    source: Optional[str] = None


# ============================================================
# ENDPOINTS
# ============================================================

@router.get("/health")
async def health_check():
    """Check if backend is running"""
    return {
        "status": "healthy",
        "message": "CoolHome AI Backend is running!",
        "gemini_available": gemini_service.available
    }


@router.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "CoolHome AI Backend",
        "status": "running ✅",
        "docs": "http://localhost:8000/docs"
    }


@router.post("/recommendations")
async def get_recommendations(room_features: RoomFeatures):
    """
    Get rule-based recommendations
    
    INPUT: Room features from frontend
    OUTPUT: 10 prioritized recommendations
    """
    
    try:
        # Convert to dictionary
        room_data = room_features.dict()
        
        # Remove None values to avoid issues
        room_data = {k: v for k, v in room_data.items() if v is not None}
        
        # Generate recommendations
        recommendations = rec_engine.generate_recommendations(room_data)
        
        # Add source
        for rec in recommendations:
            rec["source"] = "rule_based"
        
        return {
            "status": "success",
            "recommendations": recommendations,
            "total": len(recommendations),
            "method": "rule_based",
            "message": f"Generated {len(recommendations)} rule-based recommendations"
        }
    
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error generating recommendations: {str(e)}"
        }


@router.post("/recommendations-ai")
async def get_ai_recommendations(room_features: RoomFeatures):
    """
    Get AI-powered recommendations from Gemini
    """
    
    try:
        # Check if Gemini is available
        if not gemini_service.available:
            return {
                "status": "error",
                "message": "Gemini API not configured. Please set GEMINI_API_KEY in .env file"
            }
        
        # Convert to dictionary
        room_data = room_features.dict()
        room_data = {k: v for k, v in room_data.items() if v is not None}
        
        print(f"📤 Sending to Gemini: {room_data}")
        
        # Get AI recommendations
        recommendations = gemini_service.generate_ai_recommendations(room_data)
        
        print(f"📥 Received from Gemini: {recommendations}")
        
        if not recommendations:
            return {
                "status": "error",
                "message": "Failed to generate recommendations from Gemini. Check server logs."
            }
        
        return {
            "status": "success",
            "recommendations": recommendations,
            "total": len(recommendations),
            "method": "ai_generated",
            "message": f"Generated {len(recommendations)} AI-powered recommendations"
        }
    
    except Exception as e:
        print(f"❌ Error in get_ai_recommendations: {str(e)}")
        return {
            "status": "error",
            "message": f"Error: {str(e)}"
        }


@router.post("/recommendations-hybrid")
async def get_hybrid_recommendations(room_features: RoomFeatures):
    """
    Get both rule-based AND AI recommendations combined
    """
    
    try:
        room_data = room_features.dict()
        room_data = {k: v for k, v in room_data.items() if v is not None}
        
        # Get rule-based
        rule_based = rec_engine.generate_recommendations(room_data)
        for rec in rule_based:
            rec["source"] = "rule_based"
        
        # Get AI (if available)
        ai_generated = []
        if gemini_service.available:
            ai_generated = gemini_service.generate_ai_recommendations(room_data)
        else:
            print("⚠️ Gemini not available, using rule-based only")
        
        # Combine
        combined = rule_based.copy()
        rule_actions = {rec["action"].lower() for rec in rule_based}
        for ai_rec in ai_generated:
            if ai_rec["action"].lower() not in rule_actions:
                combined.append(ai_rec)
        
        # Sort by priority
        def priority_value(rec):
            priority = rec.get("priority", "low")
            return {"high": 0, "medium": 1, "low": 2}.get(priority, 2)
        
        combined.sort(key=priority_value)
        
        return {
            "status": "success",
            "rule_based": rule_based,
            "ai_generated": ai_generated,
            "combined": combined[:15],
            "total_combined": len(combined),
            "message": f"Generated {len(rule_based)} rule-based + {len(ai_generated)} AI recommendations"
        }
    
    except Exception as e:
        print(f"❌ Error in get_hybrid_recommendations: {str(e)}")
        return {
            "status": "error",
            "message": str(e)
        }


@router.post("/analyze")
async def analyze_room(room_features: RoomFeatures):
    """
    Full analysis with recommendations + scores
    
    STEP 1: Get recommendations (rule-based + AI)
    STEP 2: Calculate CURRENT scores
    STEP 3: Create improved room BASED ON RECOMMENDATIONS
    STEP 4: Calculate POTENTIAL scores
    STEP 5: Return everything
    """
    
    try:
        room_data = room_features.dict()
        room_data = {k: v for k, v in room_data.items() if v is not None}
        
        # ============================================================
        # STEP 1: Get recommendations
        # ============================================================
        rule_based = rec_engine.generate_recommendations(room_data)
        ai_generated = gemini_service.generate_ai_recommendations(room_data)
        
        # Combine recommendations
        combined = rule_based.copy()
        rule_actions = {rec["action"].lower() for rec in rule_based}
        for ai_rec in ai_generated:
            if ai_rec["action"].lower() not in rule_actions:
                combined.append(ai_rec)
        
        # ============================================================
        # STEP 2: Calculate CURRENT scores
        # ============================================================
        
        current_cooling = calculate_cooling_score(room_data)
        current_sustainability = calculate_sustainability_score(room_data)
        current_energy = calculate_energy_score(
            current_cooling, 
            current_sustainability
        )
        
        # ============================================================
        # STEP 3: Create improved room BASED ON RECOMMENDATIONS
        # ============================================================
        
        improved_room = room_data.copy()
        
        # Apply improvements based on recommendations
        # Check what recommendations suggest
        recommendation_actions = {rec["action"].lower() for rec in combined}
        
        # If recommendations suggest better ventilation
        if any("ventilation" in action or "window" in action or "exhaust" in action 
               for action in recommendation_actions):
            improved_room["ventilation"] = "good"
        
        # If recommendations suggest adding plants
        if any("plant" in action for action in recommendation_actions):
            improved_room["indoor_plants"] = True
        
        # If recommendations suggest unblocking furniture
        if any("furniture" in action or "unblock" in action 
               for action in recommendation_actions):
            improved_room["furniture_density"] = "low"
            improved_room["airflow_obstruction"] = "low"
        
        # ============================================================
        # STEP 4: Calculate POTENTIAL scores
        # ============================================================
        
        potential_cooling = calculate_cooling_score(improved_room)
        potential_sustainability = calculate_sustainability_score(improved_room)
        potential_energy = calculate_energy_score(
            potential_cooling,
            potential_sustainability
        )
        
        # ============================================================
        # STEP 5: Return everything
        # ============================================================
        save_analysis(
           room_data,
           current_cooling,
           potential_cooling,
           current_sustainability,
           potential_sustainability,
           current_energy,
           potential_energy
        )
        return {
            "status": "success",
            "room_features": room_data,
            "recommendations": combined[:15],
            
            "current_scores": {
                "cooling": current_cooling,
                "sustainability": current_sustainability,
                "energy_efficiency": current_energy
            },
            
            "potential_scores": {
                "cooling": potential_cooling,
                "sustainability": potential_sustainability,
                "energy_efficiency": potential_energy
            },
            
            "improvements": {
                "cooling": potential_cooling - current_cooling,
                "sustainability": potential_sustainability - current_sustainability,
                "energy_efficiency": potential_energy - current_energy
            },
            
            "message": f"Analysis complete with {len(combined)} recommendations"
        }
    
    except Exception as e:
        print(f"❌ Error in analyze: {str(e)}")
        return {"status": "error", "message": str(e)}


@router.post("/score")
async def calculate_score(room_features: RoomFeatures):
    """Calculate scores"""
    
    try:
        room_data = room_features.dict()
        room_data = {k: v for k, v in room_data.items() if v is not None}
        
        # Current scores
        current_cooling = calculate_cooling_score(room_data)
        current_sustainability = calculate_sustainability_score(room_data)
        current_energy = calculate_energy_score(current_cooling, current_sustainability)
        
        # Create improved room (simple version)
        improved_room = room_data.copy()
        improved_room["ventilation"] = "good"
        improved_room["indoor_plants"] = True
        improved_room["furniture_density"] = "low"
        
        # Potential scores
        potential_cooling = calculate_cooling_score(improved_room)
        potential_sustainability = calculate_sustainability_score(improved_room)
        potential_energy = calculate_energy_score(potential_cooling, potential_sustainability)
        
        return {
            "status": "success",
            "current_scores": {
                "cooling_score": current_cooling,
                "sustainability_score": current_sustainability,
                "energy_savings_score": current_energy
            },
            "potential_scores": {
                "cooling_score": potential_cooling,
                "sustainability_score": potential_sustainability,
                "energy_savings_score": potential_energy
            }
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

@router.post("/analyze-image")
async def analyze_room_image(
    image: UploadFile = File(...),
    current_temperature: float = Form(...),
    location: Optional[str] = Form(None),
    window_direction: Optional[str] = Form(None)
):
    """
    Upload image -> Gemini Vision -> Scores -> Recommendations
    """

    try:

        # Save uploaded image temporarily
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".jpg"
        ) as temp_file:

            temp_file.write(await image.read())
            temp_path = temp_file.name

            # Analyze image using Gemini Vision
        vision_result = analyze_image(temp_path)

        print("VISION RESULT:")
        print(vision_result)

        # Delete temporary image
        os.remove(temp_path)

        # Combine image analysis with user inputs
        summary = vision_result.get(
            "summary",
            "AI analysis unavailable."
        )

        room_data = {
            "windows": vision_result.get("windows", 0),
            "ventilation": vision_result.get(
                "ventilation",
                "moderate"
            ),
            "sunlight": vision_result.get(
                "sunlight",
                "moderate"
            ),
            "indoor_plants": vision_result.get(
                "indoor_plants",
                False
            ),
            "furniture_density": vision_result.get(
                "furniture_density",
                "moderate"
            ),
            "airflow_obstruction": vision_result.get(
                "airflow_obstruction",
                "moderate"
            ),
            "current_temperature": current_temperature,
            "location": location,
            "window_direction": window_direction
        }

        room_data = {
            k: v
            for k, v in room_data.items()
            if v is not None
        }

        # ====================================================
        # Recommendations
        # ====================================================

        rule_based = rec_engine.generate_recommendations(room_data)

        ai_generated = []

        if gemini_service.available:
            ai_generated = gemini_service.generate_ai_recommendations(
                room_data
            )

        combined = rule_based.copy()

        rule_actions = {
            rec["action"].lower()
            for rec in rule_based
        }

        for ai_rec in ai_generated:

            if ai_rec["action"].lower() not in rule_actions:
                combined.append(ai_rec)

        # ====================================================
        # Current Scores
        # ====================================================

        current_cooling = calculate_cooling_score(
            room_data
        )

        current_sustainability = (
            calculate_sustainability_score(
                room_data
            )
        )

        current_energy = (
            calculate_energy_score(
                current_cooling,
                current_sustainability
            )
        )

        # ====================================================
        # Improved Room
        # ====================================================

        improved_room = room_data.copy()

        improved_room["ventilation"] = "good"
        improved_room["indoor_plants"] = True
        improved_room["furniture_density"] = "low"
        improved_room["airflow_obstruction"] = "low"

        potential_cooling = calculate_cooling_score(
            improved_room
        )

        potential_sustainability = (
            calculate_sustainability_score(
                improved_room
            )
        )

        potential_energy = calculate_energy_score(
            potential_cooling,
            potential_sustainability
        )

        # ====================================================
        # Save Analysis
        # ====================================================

        save_analysis(
            room_data,
            current_cooling,
            potential_cooling,
            current_sustainability,
            potential_sustainability,
            current_energy,
            potential_energy
        )

        return {
            "status": "success",
            "summary": summary,

            "room_features": room_data,

            "recommendations": combined[:15],

            "current_scores": {
                "cooling": current_cooling,
                "sustainability": current_sustainability,
                "energy_efficiency": current_energy
            },

            "potential_scores": {
                "cooling": potential_cooling,
                "sustainability": potential_sustainability,
                "energy_efficiency": potential_energy
            },

            "improvements": {
                "cooling":
                    potential_cooling - current_cooling,

                "sustainability":
                    potential_sustainability -
                    current_sustainability,

                "energy_efficiency":
                    potential_energy - current_energy
            }
        }

    except Exception as e:
         print("ERROR OCCURRED")
         traceback.print_exc()

         return {
            "status": "error",
             "message": str(e)
        }

@router.get("/analytics")
async def get_analytics():

    try:

        analytics = get_analytics_summary()

        return {
            "status": "success",
            "analytics": analytics
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }
    

@router.get("/history")
async def get_history():

    try:
        history = get_analysis_history()

        return {
            "status": "success",
            "history": history
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }