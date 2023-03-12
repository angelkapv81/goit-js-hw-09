@echo off

:: ����������
set folder=%1
set username=angelkapv81
set email= angelkapv81@gmail.com


:: ���� � ��������� ����� ��� �����������, ������� ���
IF NOT EXIST "%folder%\.git" (
    cd "%folder%"
    
    :: ������������� Git �����������
    git init

    :: ���������� ������ � Git
    git add .

    :: �������� ������� �������
    git commit -m "Initial commit"

    :: ���������� ���������� ����������� � ���������
    git remote add origin https://github.com/%username%/%folder%.git

    :: ���������� ����� main
    git push -u origin main
) ELSE (
    :: ���� ����������� ��� ����������, ����������� ��������� ��� �������
    set /p commit_msg="Enter summary: "

    :: ��������� � ��������� �����
    cd "%folder%"

    git config --global user.email "%email%"
    git config --global user.name "%username%"

    git add .
    git commit -m "%commit_msg%"
    git push origin main
)
