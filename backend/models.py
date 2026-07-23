import datetime
from sqlalchemy import Column, String, Integer, DateTime, Boolean, Text
from database import Base

class User(Base):
    __tablename__ = "users"

    email = Column(String, primary_key=True, index=True)
    password_hash = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    
    # Profile Preferences
    github_id = Column(String, nullable=True)
    linkedin_url = Column(String, nullable=True)
    profile_photo_url = Column(Text, nullable=True)
    user_role = Column(String, nullable=True)
    target_role = Column(String, nullable=True)
    study_preference = Column(String, nullable=True)
    daily_hours = Column(String, nullable=True)
    study_time_of_day = Column(String, nullable=True)
    
    registered_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class OTP(Base):
    __tablename__ = "otps"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, index=True, nullable=False)
    code = Column(String(6), nullable=False)
    purpose = Column(String(50), nullable=False)  # 'registration', 'password_reset', 'profile_update'
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
