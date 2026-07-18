from sqlalchemy.orm import Session

from app.repositories.report_repository import (
    get_dashboard_statistics,
)


class ReportService:

    @staticmethod
    def get_dashboard(db: Session):
        """
        Returns all dashboard report statistics.
        """
        return get_dashboard_statistics(db)