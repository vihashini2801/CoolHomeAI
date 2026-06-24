# CoolHome AI 🌿🏠

## AI-Powered Passive Cooling Advisor for Heat-Resilient Homes

CoolHome AI is an AI-powered web application that analyzes room images and provides personalized passive cooling recommendations to reduce indoor temperature, improve sustainability, and lower electricity consumption.

The system uses AI-based room analysis to identify heat-related issues and suggest affordable cooling improvements such as better ventilation, shading solutions, reflective materials, and indoor plants.

---

## Features

* AI-powered room image analysis
* Passive cooling recommendations
* Cooling Score calculation
* Sustainability Score calculation
* Energy Saving Score estimation
* Estimated temperature reduction prediction
* Interactive analytics dashboard

---

## Technology Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* Axios

### Backend

* Python
* FastAPI
* SQLAlchemy

### Database

* MySQL

### AI

* Gemini Vision API

---

## Project Structure

```text
CoolHomeAI/
├── coolhome-ai-frontend/
├── coolhome-ai-backend/
├── Screenshot/
└── README.md
```

---

## Installation

### Frontend

```bash
cd coolhome-ai-frontend
npm install
npm run dev
```

### Backend

```bash
cd coolhome-ai-backend

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## API Endpoint

### Analyze Room

```http
POST /api/analyze-image
```

Response Example:

```json
{
  "cooling_score": 45,
  "energy_score": 81,
  "sustainability_score": 72,
  "temperature_reduction": 4
}
```

---

## Future Enhancements

* Mobile application
* Roof material detection
* Weather integration
* Heat map visualization
* AI-generated PDF reports
* Personalized cooling plans

---

## Team Members

### AI Vision & Frontend Lead(Vihashini R)

* Gemini Vision Integration
* Image Analysis
* React Frontend

### Backend & Recommendation Lead(Sivaranjinee S)

* FastAPI Backend
* Recommendation Engine
* API Development

### Scoring & Database Lead(Uppili Srinivasan P)

* Cooling Score Engine
* Sustainability Score Engine
* MySQL Database

---

## License

This project is developed for educational, research, and sustainability-focused purposes.

---

⭐ If you found this project interesting, consider giving it a star on GitHub.
