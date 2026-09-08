import os
import smtplib
import sqlite3
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path

from flask import Flask, request, jsonify

DB_PATH = Path(__file__).parent / "bookings.db"

SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "info@rokoshots.hu")

app = Flask(__name__)


def send_booking_email(data):
    if not SMTP_USER or not SMTP_PASSWORD:
        app.logger.warning("SMTP_USER/SMTP_PASSWORD not set — skipping booking email")
        return

    msg = EmailMessage()
    msg["Subject"] = f"New Shoot Booking — {data['name']}"
    msg["From"] = SMTP_USER
    msg["To"] = NOTIFY_EMAIL
    msg["Reply-To"] = data["email"]
    msg.set_content(
        "\n".join(
            [
                f"Name: {data['name']}",
                f"Email: {data['email']}",
                f"Phone: {data.get('phone') or '—'}",
                f"Company: {data.get('company') or '—'}",
                f"Project type: {data.get('projectType') or '—'}",
                f"Location: {data.get('location') or '—'}",
                f"Date: {data['date']}",
                f"Time: {data['time']}",
                f"Duration: {data.get('duration') or 1}h",
                "",
                "Details:",
                data.get("message") or "—",
            ]
        )
    )

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)


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


REQUIRED_FIELDS = ("name", "email", "date", "time")


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

    conn = get_db()
    with conn:
        cur = conn.execute(
            """INSERT INTO bookings
               (created_at, name, email, phone, company, project_type,
                location, shoot_date, shoot_time, duration_hours, message)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                datetime.now(timezone.utc).isoformat(),
                str(data["name"]).strip(),
                str(data["email"]).strip(),
                str(data.get("phone", "")).strip(),
                str(data.get("company", "")).strip(),
                str(data.get("projectType", "")).strip(),
                str(data.get("location", "")).strip(),
                str(data["date"]).strip(),
                str(data["time"]).strip(),
                duration,
                str(data.get("message", "")).strip(),
            ),
        )
    conn.close()

    try:
        send_booking_email(data)
    except Exception:
        app.logger.exception("Failed to send booking notification email")

    return jsonify(status="ok", id=cur.lastrowid), 201


@app.get("/api/health")
def health():
    return jsonify(status="ok")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)
