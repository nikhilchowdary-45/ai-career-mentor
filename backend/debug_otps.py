from database import SessionLocal
import models
import datetime

db = SessionLocal()
now = datetime.datetime.utcnow()

print("Current UTC time:", now)
otps = db.query(models.OTP).all()
print(f"Total OTPs in DB: {len(otps)}")
for otp in otps:
    print(f"ID: {otp.id}, Email: '{otp.email}', Code: '{otp.code}', Purpose: '{otp.purpose}', Expires At: {otp.expires_at}, Created At: {otp.created_at}")
    print(f"Is Expired? {otp.expires_at < now}")
