from database import SessionLocal
import models

db = SessionLocal()
try:
    num_otps = db.query(models.OTP).delete()
    num_users = db.query(models.User).delete()
    db.commit()
    print(f"Database wiped successfully! Removed {num_users} users and {num_otps} OTP codes.")
except Exception as e:
    db.rollback()
    print(f"Failed to clear database: {e}")
finally:
    db.close()
