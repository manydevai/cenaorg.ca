@echo off
echo ========================================
echo CENA.ORG - Surge.sh Deployment Script
echo ========================================
echo.
echo This will deploy your app to Surge.sh
echo.
cd /d "%~dp0"
echo Building the app...
call npm run build
echo.
echo Deploying to Surge.sh...
echo.
npx surge ./dist
echo.
echo ========================================
echo Deployment Complete!
echo ========================================
pause
