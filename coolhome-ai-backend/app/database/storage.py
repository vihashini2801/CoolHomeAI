from sqlalchemy import func

from app.database.database import (
    SessionLocal
)

from app.database.models import (
    RoomAnalysis,
    Score
)


def save_analysis(
    room_data,
    cooling_score,
    potential_cooling_score,
    sustainability_score,
    potential_sustainability_score,
    energy_score,
    potential_energy_score
):

    db = SessionLocal()

    try:

        analysis = RoomAnalysis(

            windows=room_data["windows"],

            ventilation=room_data[
                "ventilation"
            ],

            sunlight=room_data[
                "sunlight"
            ],

            indoor_plants=room_data[
                "indoor_plants"
            ],

            furniture_density=room_data[
                "furniture_density"
            ],

            airflow_obstruction=room_data[
                "airflow_obstruction"
            ]
        )

        db.add(analysis)

        db.commit()

        db.refresh(analysis)

        score = Score(

            analysis_id=analysis.id,

            cooling_score=cooling_score,

            potential_cooling_score=
            potential_cooling_score,

            sustainability_score=
            sustainability_score,

            potential_sustainability_score=
            potential_sustainability_score,

            energy_score=
            energy_score,

            potential_energy_score=
            potential_energy_score
        )

        db.add(score)

        db.commit()

        print(
            "Analysis Saved!"
        )

    finally:

        db.close()

def get_analysis_history():

    db = SessionLocal()

    try:

        results = (
            db.query(
                RoomAnalysis,
                Score
            )
            .join(
                Score,
                RoomAnalysis.id == Score.analysis_id
            )
            .order_by(
                RoomAnalysis.id.desc()
            )
            .limit(20)
            .all()
        )

        history = []

        for analysis, score in results:

            history.append({

                "analysis_id": analysis.id,

                "analysis": {

                    "windows":
                    analysis.windows,

                    "ventilation":
                    analysis.ventilation,

                    "sunlight":
                    analysis.sunlight,

                    "indoor_plants":
                    analysis.indoor_plants,

                    "furniture_density":
                    analysis.furniture_density,

                    "airflow_obstruction":
                    analysis.airflow_obstruction
                },

                "scores": {

                    "cooling_score":
                    score.cooling_score,

                    "potential_cooling_score":
                    score.potential_cooling_score,

                    "cooling_improvement":
                    (
                        score.potential_cooling_score
                        -
                        score.cooling_score
                    ),

                    "sustainability_score":
                    score.sustainability_score,

                    "potential_sustainability_score":
                    score.potential_sustainability_score,

                    "sustainability_improvement":
                    (
                        score.potential_sustainability_score
                        -
                        score.sustainability_score
                    ),

                    "energy_score":
                    score.energy_score,

                    "potential_energy_score":
                    score.potential_energy_score,

                    "energy_improvement":
                    (
                        score.potential_energy_score
                        -
                        score.energy_score
                    )
                },

                "created_at":
                str(
                    analysis.created_at
                )
            })

        return history

    finally:

        db.close()
        
def get_analytics_summary():

    db = SessionLocal()

    try:

        total_analyses = (
            db.query(
                RoomAnalysis
            ).count()
        )

        average_cooling_score = (
            db.query(
                func.avg(
                    Score.cooling_score
                )
            ).scalar()
        )

        average_sustainability_score = (
            db.query(
                func.avg(
                    Score.sustainability_score
                )
            ).scalar()
        )

        average_energy_score = (
            db.query(
                func.avg(
                    Score.energy_score
                )
            ).scalar()
        )

        highest_cooling_score = (
            db.query(
                func.max(
                    Score.cooling_score
                )
            ).scalar()
        )

        lowest_cooling_score = (
            db.query(
                func.min(
                    Score.cooling_score
                )
            ).scalar()
        )

        return {

            "total_analyses":
            int(total_analyses),

            "average_cooling_score":
            round(
                float(
                    average_cooling_score or 0
                ),
                2
            ),

            "average_sustainability_score":
            round(
                float(
                    average_sustainability_score or 0
                ),
                2
            ),

            "average_energy_score":
            round(
                float(
                    average_energy_score or 0
                ),
                2
            ),

            "highest_cooling_score":
            int(
                highest_cooling_score or 0
            ),

            "lowest_cooling_score":
            int(
                lowest_cooling_score or 0
            )
        }

    finally:

        db.close()