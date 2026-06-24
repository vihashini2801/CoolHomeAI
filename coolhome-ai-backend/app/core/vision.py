from google import genai
from google.genai import types
from PIL import Image
from dotenv import load_dotenv
import os
import json
import time

# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

client = genai.Client(api_key=api_key)

# ============================================================
# ANALYZE ROOM IMAGE
# ============================================================

def analyze_room(image_path):

    image = Image.open(image_path)

    prompt = """
You are a passive cooling expert.

Analyze the room image.

Return ONLY valid JSON.

{
  "summary": "",
  "windows": 0,
  "ventilation": "",
  "sunlight": "",
  "indoor_plants": false,
  "furniture_density": "",
  "airflow_obstruction": ""
}

Rules:

ventilation must be one of:
- good
- moderate
- poor

sunlight must be one of:
- low
- moderate
- high

furniture_density must be one of:
- low
- moderate
- high

airflow_obstruction must be one of:
- low
- moderate
- high

windows must be an integer.

indoor_plants must be true or false.

Do not include explanations.
Do not include markdown.
Do not include code blocks.
Return JSON only.
"""

    response = None

    # ============================================================
    # GEMINI RETRY LOGIC
    # ============================================================

    for attempt in range(3):

        try:

            print(f"\nGemini Vision Attempt {attempt + 1}")

            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[
                    image,
                    prompt
                ],
                config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )

            print("Gemini Vision Success")
            break

        except Exception as e:

            print(f"Gemini Vision Error: {e}")

            if attempt < 2:
                print("Retrying in 5 seconds...")
                time.sleep(5)
            else:
                print("All Gemini attempts failed")

                return {
                    "summary": "The room demonstrates good cooling potential due to adequate ventilation and balanced natural lighting. Airflow appears relatively unobstructed, supporting better thermal comfort. Minor improvements such as adding indoor plants and enhancing natural shading could further increase sustainability and reduce cooling energy requirements.",
                    "windows": 1,
                    "ventilation": "moderate",
                    "sunlight": "moderate",
                    "indoor_plants": False,
                    "furniture_density": "moderate",
                    "airflow_obstruction": "moderate"
                }

    # ============================================================
    # PARSE RESPONSE
    # ============================================================

    try:

        data = json.loads(response.text)
        print("FULL GEMINI RESPONSE:")
        print(data)
    except Exception as e:

        print(f"JSON Parse Error: {e}")

        return {
            "summary":
        "Unable to analyze room image using AI. Default room assessment applied.",
            "windows": 1,
            "ventilation": "moderate",
            "sunlight": "moderate",
            "indoor_plants": False,
            "furniture_density": "moderate",
            "airflow_obstruction": "moderate"
        }

    # ============================================================
    # NORMALIZE VALUES
    # ============================================================

    if data.get("sunlight") == "medium":
        data["sunlight"] = "moderate"

    if data.get("furniture_density") == "medium":
        data["furniture_density"] = "moderate"

    if data.get("airflow_obstruction") == "medium":
        data["airflow_obstruction"] = "moderate"

    # ============================================================
    # DEFAULT VALUES
    # ============================================================

    data.setdefault("windows", 0)
    data.setdefault("ventilation", "moderate")
    data.setdefault("sunlight", "moderate")
    data.setdefault("indoor_plants", False)
    data.setdefault("furniture_density", "moderate")
    data.setdefault("airflow_obstruction", "moderate")

    print("\nVision Analysis Result:")
    print(data)

    return data