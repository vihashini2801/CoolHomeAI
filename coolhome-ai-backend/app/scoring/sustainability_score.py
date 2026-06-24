def calculate_sustainability_score(room_data):

    score = 0

    ventilation_scores = {
        "poor": 10,
        "moderate": 20,
        "good": 30
    }

    score += ventilation_scores.get(
        room_data["ventilation"],
        0
    )

    if room_data["indoor_plants"]:
        score += 30

    sunlight_scores = {
        "high": 5,
        "medium": 10,
        "low": 20
    }

    score += sunlight_scores.get(
        room_data["sunlight"],
        0
    )

    furniture_scores = {
        "high": 2,
        "medium": 6,
        "low": 10
    }

    score += furniture_scores.get(
        room_data["furniture_density"],
        0
    )

    airflow_scores = {
        "high": 0,
        "medium": 5,
        "low": 10
    }

    score += airflow_scores.get(
        room_data["airflow_obstruction"],
        0
    )

    return min(score, 100)