def generate_improved_room(room_data):

    improved_room = room_data.copy()

    improved_room["ventilation"] = "good"

    improved_room["sunlight"] = "low"

    improved_room["indoor_plants"] = True

    improved_room["furniture_density"] = "low"

    improved_room["airflow_obstruction"] = "low"

    return improved_room