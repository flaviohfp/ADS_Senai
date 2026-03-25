@echo off
echo Iniciando servidor com verificacao completa...
echo.

REM Testa conexao DB  
node -e "const pool = require('./database/db'); pool.query('SELECT 1', (err,res)=>{if(err)console.error('DB ERROR:',err);else console.log('DB OK');process.exit()})"

REM Cria servidor  
node app.js
pause
