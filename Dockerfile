FROM python:3.8-slim-buster

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY ./backend /app/
RUN apt update
RUN apt install -y python3-dev libpq-dev build-essential
RUN pip3 install --upgrade pip
RUN pip3 install -r ./requirements.txt
