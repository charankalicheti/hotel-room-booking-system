# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session

# from app.database import get_db
# from app.schemas.auth_schema import RegisterRequest, LoginRequest, CustomerResponse, TokenResponse
# from app.services.auth_service import register_user, login_user
# from app.dependencies import get_current_user
# from app.models.customer import Customer

# router = APIRouter(prefix="/auth", tags=["Authentication"])


# @router.post("/register", response_model=CustomerResponse)
# def register(request: RegisterRequest, db: Session = Depends(get_db)):
#     return register_user(request, db)


# @router.post("/login", response_model=TokenResponse)
# def login(request: LoginRequest, db: Session = Depends(get_db)):
#     return login_user(request, db)


# @router.get("/profile", response_model=CustomerResponse)
# def profile(current_user: Customer = Depends(get_current_user)):
#     return current_user



from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.auth_schema import RegisterRequest, CustomerResponse, TokenResponse
from app.services.auth_service import register_user, login_user
from app.dependencies import get_current_user
from app.models.customer import Customer

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=CustomerResponse)
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    return register_user(request, db)


@router.post("/login", response_model=TokenResponse)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    return login_user(form_data, db)


@router.get("/profile", response_model=CustomerResponse)
def profile(current_user: Customer = Depends(get_current_user)):
    return current_user