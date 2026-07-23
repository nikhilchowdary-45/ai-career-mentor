import os
import json
import urllib.request
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
EMAIL_FROM = os.getenv("EMAIL_FROM", "AI Career Mentor <onboarding@resend.dev>")

# SMTP Settings
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

def send_email(to_email: str, subject: str, body_html: str) -> bool:
    print(f"--- OUTGOING EMAIL ---")
    print(f"To: {to_email}")
    print(f"Subject: {subject}")
    print(f"----------------------")

    # 1. Try Resend Service if API Key is configured
    if RESEND_API_KEY:
        try:
            url = "https://api.resend.com/emails"
            headers = {
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json"
            }
            payload = {
                "from": EMAIL_FROM,
                "to": [to_email],
                "subject": subject,
                "html": body_html
            }
            data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(url, data=data, headers=headers, method="POST")
            
            with urllib.request.urlopen(req) as response:
                res_code = response.getcode()
                if res_code in (200, 201):
                    print("Email successfully dispatched via Resend API.")
                    return True
        except Exception as e:
            print(f"Resend dispatch failed, falling back. Error: {e}")

    # 2. Try SMTP Service if server is configured
    if SMTP_SERVER:
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = EMAIL_FROM
            msg["To"] = to_email
            
            part = MIMEText(body_html, "html")
            msg.attach(part)
            
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.starttls()
                if SMTP_USERNAME and SMTP_PASSWORD:
                    server.login(SMTP_USERNAME, SMTP_PASSWORD)
                server.sendmail(EMAIL_FROM, to_email, msg.as_string())
            print("Email successfully dispatched via SMTP Server.")
            return True
        except Exception as e:
            print(f"SMTP dispatch failed, falling back. Error: {e}")

    # 3. Fallback to Local Sandbox Console Logging
    print("DEMO MODE FALLBACK: Credentials not fully configured. Outputting code to standard output:")
    print(f"HTML Body Content:\n{body_html}")
    print(f"----------------------")
    return True

def send_otp_email(to_email: str, code: str, purpose: str) -> bool:
    purpose_labels = {
        "registration": "Verify Your Email Address",
        "password_reset": "Reset Your Account Password",
        "profile_update": "Verify Your Profile Update Request"
    }
    
    subject = f"{purpose_labels.get(purpose, 'Verification Code')} - {code}"
    
    body_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }}
            .container {{ max-width: 500px; margin: 0 auto; background: #1e293b; padding: 30px; border-radius: 16px; border: 1px solid #334155; }}
            .code {{ font-size: 32px; font-weight: bold; color: #8b5cf6; letter-spacing: 4px; text-align: center; margin: 20px 0; font-family: monospace; }}
            .footer {{ font-size: 11px; color: #64748b; text-align: center; margin-top: 30px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h2 style="color: #ffffff; text-align: center;">AI Career Mentor</h2>
            <p>Hello,</p>
            <p>You requested a security verification code for: <strong>{purpose.replace('_', ' ')}</strong>.</p>
            <p>Please use the following 6-digit verification code. This code expires in 10 minutes.</p>
            <div class="code">{code}</div>
            <p>If you did not request this verification, please ignore this email.</p>
            <div class="footer">
                &copy; {datetime.datetime.utcnow().year} AI Career Mentor. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    """
    # Replace datetime import with local import if needed
    import datetime
    body_html = body_html.replace("{datetime.datetime.utcnow().year}", str(datetime.datetime.utcnow().year))
    
    return send_email(to_email, subject, body_html)
