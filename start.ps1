#!/usr/bin/env powershell
# Quick startup script for Organic Shet Doctor AI

Write-Host "
╔════════════════════════════════════════════════════════════╗
║  🌾 Organic Shet Doctor AI - ऑर्गेनिक शेती डॉक्टर 🌾       ║
║                 Startup Script (Windows)                   ║
╚════════════════════════════════════════════════════════════╝
"

$ProjectPath = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "📁 Project Path: $ProjectPath"
Write-Host ""

# Change to project directory
Set-Location $ProjectPath

# Check if venv exists
if (-Not (Test-Path "venv")) {
    Write-Host "❌ Virtual environment not found. Creating..."
    python -m venv venv
}

Write-Host "✅ Virtual environment found"
Write-Host "⚙️  Starting server on http://localhost:8000..."
Write-Host ""

# Run the application
& ".\venv\Scripts\python.exe" run.py

Write-Host ""
Write-Host "Server stopped."
