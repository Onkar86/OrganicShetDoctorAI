from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from .database import get_connection
from .models import Problem, OrganicSolution

app = FastAPI(title="Organic Shet Doctor AI Backend")

# allow frontend localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/problems", response_model=List[Problem])
def list_problems():
    """Fetch all problems from database."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM problem")
    rows = cursor.fetchall()
    conn.close()
    return [Problem(**dict(row)) for row in rows]


@app.get("/problems/{problem_id}/solutions", response_model=List[OrganicSolution])
def get_solutions(problem_id: int):
    """Get organic solutions for a given problem."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM organic_solution WHERE problem_id = ?",
        (problem_id,)
    )
    rows = cursor.fetchall()
    conn.close()
    if not rows:
        raise HTTPException(status_code=404, detail="No solutions found")
    return [OrganicSolution(**dict(row)) for row in rows]


@app.post("/upload")
def upload_image(file: UploadFile = File(...)):
    """Placeholder for future image classification. Currently returns 501."""
    # In future this could save and run an ML model.
    raise HTTPException(status_code=501, detail="Image based diagnosis not yet implemented")
