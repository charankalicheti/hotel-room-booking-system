from sqlalchemy import Column, Integer, String

from app.database import Base


class Hotel(Base):
    __tablename__ = "hotel"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String(100),
        nullable=False,
    )

    location = Column(
        String(200),
        nullable=False,
    )