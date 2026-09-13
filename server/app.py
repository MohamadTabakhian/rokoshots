import os
import smtplib
import sqlite3
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path

from flask import Flask, request, jsonify

DB_PATH = Path(__file__).parent / "bookings.db"

app = Flask(__name__)


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            company TEXT,
            project_type TEXT,
            location TEXT,
            shoot_date TEXT NOT NULL,
            shoot_time TEXT NOT NULL,
            duration_hours INTEGER,
            message TEXT
        )
    """)
    return conn


REQUIRED_FIELDS = ("name", "email")


def send_notification_email(booking):
    host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    port = int(os.environ.get("SMTP_PORT", "587"))
    user = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASSWORD")
    notify_to = os.environ.get("NOTIFY_EMAIL")

    if not all([user, password, notify_to]):
        print("Email not sent: SMTP env vars missing")
        return

    msg = EmailMessage()
    msg["Subject"] = f"New shoot reservation request from {booking['name']}"
    msg["From"] = user
    msg["To"] = notify_to
    msg["Reply-To"] = booking["email"]
    msg.set_content(
        f"Name: {booking['name']}\n"
        f"Email: {booking['email']}\n"
        f"Phone: {booking['phone']}\n"
        f"Company: {booking['company']}\n"
        f"Project type: {booking['project_type']}\n"
        f"Location: {booking['location']}\n"
        f"Date: {booking['shoot_date']}\n"
        f"Time: {booking['shoot_time']}\n"
        f"Duration: {booking['duration_hours']} hour(s)\n"
        f"Message: {booking['message']}\n"
    )

    try:
        with smtplib.SMTP(host, port, timeout=10) as server:
            server.starttls()
            server.login(user, password)
            server.send_message(msg)
        print(f"Email sent successfully to {notify_to}")
    except Exception as exc:
        print(f"Failed to send notification email: {exc}")


@app.post("/api/bookings")
def create_booking():
    data = request.get_json(silent=True) or {}

    missing = [f for f in REQUIRED_FIELDS if not str(data.get(f, "")).strip()]
    if missing:
        return jsonify(error=f"Missing required fields: {', '.join(missing)}"), 400

    try:
        duration = int(data.get("duration") or 1)
    except (TypeError, ValueError):
        duration = 1

    booking = {
        "name": str(data["name"]).strip(),
        "email": str(data["email"]).strip(),
        "phone": str(data.get("phone", "")).strip(),
        "company": str(data.get("company", "")).strip(),
        "project_type": str(data.get("projectType", "")).strip(),
        "location": str(data.get("location", "")).strip(),
        "shoot_date": str(data.get("date", "")).strip(),
        "shoot_time": str(data.get("time", "")).strip(),
        "duration_hours": duration,
        "message": str(data.get("message", "")).strip(),
    }

    conn = get_db()
    with conn:
        cur = conn.execute(
            """INSERT INTO bookings
                (created_at, name, email, phone, company, project_type,
                 location, shoot_date, shoot_time, duration_hours, message)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                datetime.now(timezone.utc).isoformat(),
                booking["name"],
                booking["email"],
                booking["phone"],
                booking["company"],
                booking["project_type"],
                booking["location"],
                booking["shoot_date"],
                booking["shoot_time"],
                booking["duration_hours"],
                booking["message"],
            ),
        )
    conn.close()

    send_notification_email(booking)

    return jsonify(status="ok", id=cur.lastrowid), 201


@app.get("/api/health")
def health():
    return jsonify(status="ok")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)
