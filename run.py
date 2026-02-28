#!/usr/bin/env python3
"""
Simple script to run the complete Organic Shet Doctor AI application.
Serves frontend HTML + CSS + JS and runs FastAPI backend on same server.
"""

import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

# Import backend app
from backend.main import app as api_app

# Add static files (HTML, CSS, JS)
frontend_path = Path(__file__).parent / "frontend"
api_app.mount("/static", StaticFiles(directory=frontend_path), name="static")

# Serve index.html on root
@api_app.get("/")
def serve_frontend():
    return FileResponse(frontend_path / "index.html", media_type="text/html")

if __name__ == "__main__":
    print("\n" + "="*60)
    print("🌾 Organic Shet Doctor AI - Starting Server")
    print("="*60)
    print("\n✅ Frontend: http://localhost:8000/")
    print("✅ Backend API: http://localhost:8000/docs")
    print("\nPress Ctrl+C to stop server\n")
    
    uvicorn.run(
        api_app,
        host="0.0.0.0",
        port=8000,
        reload=False
    )
