from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    github_id: Optional[str] = None
    linkedin_url: Optional[str] = None
    profile_photo_url: Optional[str] = None
    user_role: Optional[str] = None
    target_role: Optional[str] = None
    study_preference: Optional[str] = None
    daily_hours: Optional[str] = None
    study_time_of_day: Optional[str] = None

class UserSignup(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    registered_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class SendOTPRequest(BaseModel):
    email: EmailStr
    purpose: str # 'registration' | 'password_reset' | 'profile_update'

class VerifyOTPRequest(BaseModel):
    email: EmailStr
    code: str
    purpose: str

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    code: str
    new_password: str

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    github_id: Optional[str] = None
    linkedin_url: Optional[str] = None
    profile_photo_url: Optional[str] = None
    user_role: Optional[str] = None
    target_role: Optional[str] = None
    study_preference: Optional[str] = None
    daily_hours: Optional[str] = None
    study_time_of_day: Optional[str] = None
    password: Optional[str] = None
