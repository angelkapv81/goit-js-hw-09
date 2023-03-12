@echo off
set /p commit_msg="Enter summary: "

git config --global user.email "angelkapv81"
git config --global user.name "angelkapv81@gmail.com"

git add .
git commit -m "%commit_msg%"
git push origin main

