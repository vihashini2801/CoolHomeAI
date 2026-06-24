def calculate_cooling_score(room_data):

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

    windows = room_data["windows"]

    if windows >= 2:
        score += 20

    elif windows == 1:
        score += 10

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
        "high": 5,
        "medium": 10,
        "low": 15
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

    if room_data["indoor_plants"]:
        score += 5

    return min(score, 100)