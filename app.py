"""
Simple launcher for Organic Shet Doctor AI
Combines backend API with frontend files serving
"""

import sys
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Import FastAPI app
from backend.main import app

if __name__ == "__main__":
    import uvicorn
    from fastapi.staticfiles import StaticFiles
    from fastapi.responses import FileResponse
    
    # Mount frontend
    frontend_path = project_root / "frontend"
    
    # Serve index.html on root
    @app.get("/")
    def serve_frontend():
        return FileResponse(frontend_path / "index.html", media_type="text/html")
    
    # Mount static files
    app.mount("/static", StaticFiles(directory=frontend_path), name="static")
    
    print("\n" + "="*60)
    print("🌾 Organic Shet Doctor AI - Server Starting")
    print("="*60)
    print("\n✅ Frontend: http://localhost:8000/")
    print("✅ API Docs: http://localhost:8000/docs")
    print("\nPress Ctrl+C to stop\n")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    )
