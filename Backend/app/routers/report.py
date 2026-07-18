from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.report_service import ReportService

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.get("/dashboard")
def get_dashboard_report(
    db: Session = Depends(get_db),
):
    """
    Returns dashboard statistics for the admin panel.
    """

    return ReportService.get_dashboard(db)