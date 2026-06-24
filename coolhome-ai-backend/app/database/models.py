from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    TIMESTAMP,
    ForeignKey,
    text
)

from app.database.database import Base


class RoomAnalysis(Base):

    __tablename__ = "room_analysis"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    windows = Column(Integer)

    ventilation = Column(String(20))

    sunlight = Column(String(20))

    indoor_plants = Column(Boolean)

    furniture_density = Column(String(20))

    airflow_obstruction = Column(String(20))

    created_at = Column(
        TIMESTAMP,
        server_default=text(
            "CURRENT_TIMESTAMP"
        )
    )


class Score(Base):

    __tablename__ = "scores"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    analysis_id = Column(
        Integer,
        ForeignKey(
            "room_analysis.id"
        )
    )

    cooling_score = Column(Integer)

    potential_cooling_score = Column(Integer)

    sustainability_score = Column(Integer)

    potential_sustainability_score = Column(Integer)

    energy_score = Column(Integer)

    potential_energy_score = Column(Integer)