#!/usr/bin/env python3
import sqlite3
from pathlib import Path

# Create database and schema
db_path = Path(__file__).parent / "db" / "organic_shet.db"
db_path.parent.mkdir(exist_ok=True)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Create tables
cursor.execute("""
CREATE TABLE IF NOT EXISTS problem (
    problem_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    symptoms TEXT NOT NULL,
    cause TEXT NOT NULL
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS organic_solution (
    solution_id INTEGER PRIMARY KEY AUTOINCREMENT,
    problem_id INTEGER NOT NULL,
    solution_name TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    preparation TEXT NOT NULL,
    dosage TEXT NOT NULL,
    timing TEXT NOT NULL,
    warning TEXT,
    FOREIGN KEY(problem_id) REFERENCES problem(problem_id) ON DELETE CASCADE
);
""")

# Insert sample data
cursor.executescript("""
INSERT INTO problem (name, symptoms, cause) VALUES
('पिवळसर पाने', 'पानांची कडा पिवळी आणि काळवट होत आहे', 'उशिरा खत देणे किंवा पाणी साचणे'),
('कोणपुर रोग', 'नदीगे अंधारती होतात आणि मुख्य फांदी द्रवू होते', 'मातीतील पाण्याचा तुटवडा किंवा वादळाची हानी');
""")

cursor.executescript("""
INSERT INTO organic_solution (problem_id, solution_name, ingredients, preparation, dosage, timing, warning) 
VALUES (1, 'नीम पाण्याचा फवारणी', '1 चमचा नीमपुरी, 1 लिटर पाणी', 'नीमपुरी पाण्यात भिजवून दहा तास ठेवावी.', 'प्रत्येक ७ दिवसांनी फवारणी', 'सकाळी किंवा संध्याकाळी करा, गरम काळात करू नका.', NULL);

INSERT INTO organic_solution (problem_id, solution_name, ingredients, preparation, dosage, timing, warning) 
VALUES (2, 'कोथिंबीर व तुळशीचा अर्क', 'एक मुट्ठी कोथिंबीर, काही पानं तुळशीची, 2 लिटर पाणी', 'सगळी सामग्री उकळत्या पाण्यात शिजवून गाळा.', '१०० मिली दिवसातून एकदा झाडांना हाताळा', 'झाड खूप दुष्ट नसेल तर परंतु सुरक्षिततेसाठी हातात चिटकू नका.', NULL);
""")

conn.commit()
conn.close()
print("✅ Database initialized at:", db_path)
