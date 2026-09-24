@echo off
cd rodin_events
python main.py
if %errorlevel% neq 0 (
    echo.
    echo Ocorreu um erro ao iniciar o aplicativo.
    echo Verifique se o Python e o CustomTkinter estao instalados.
    echo.
    echo Tentando instalar dependencias...
    python -m pip install customtkinter pillow
    echo.
    echo Tentando iniciar novamente...
    python main.py
)
pause
