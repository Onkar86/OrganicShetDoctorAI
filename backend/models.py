from pydantic import BaseModel
from typing import Optional, List


class Problem(BaseModel):
    problem_id: int
    name: str
    symptoms: str
    cause: str


class OrganicSolution(BaseModel):
    solution_id: int
    problem_id: int
    solution_name: str
    ingredients: str
    preparation: str
    dosage: str
    timing: str
    warning: Optional[str] = None
