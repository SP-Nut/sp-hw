@echo off
echo Stopping all Node.js processes...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul
echo Starting development server...
cd /d "%~dp0"
npm run dev