@echo off

:: Переменные
set folder=%1
set username=angelkapv81
set email= angelkapv81@gmail.com


:: Если в указанной папке нет репозитория, создаем его
IF NOT EXIST "%folder%\.git" (
    cd "%folder%"
    
    :: Инициализация Git репозитория
    git init

    :: Добавление файлов в Git
    git add .

    :: Создание первого коммита
    git commit -m "Initial commit"

    :: Связывание локального репозитория с удаленным
    git remote add origin https://github.com/%username%/%folder%.git

    :: Публикация ветки main
    git push -u origin main
) ELSE (
    :: Если репозиторий уже существует, запрашиваем сообщение для коммита
    set /p commit_msg="Enter summary: "

    :: Переходим в указанную папку
    cd "%folder%"

    git config --global user.email "%email%"
    git config --global user.name "%username%"

    git add .
    git commit -m "%commit_msg%"
    git push origin main
)
