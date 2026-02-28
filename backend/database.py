import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent.parent / "db" / "organic_shet.db"


def get_connection():
    """Return a sqlite3 connection to the database."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn
