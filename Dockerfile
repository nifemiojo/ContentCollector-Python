# pull official base image
FROM python:3.7-slim

# Set metadata
LABEL owner="Femi Ojo"

# Setup env
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1

# Traffic into the container should be directed to the port 8000
EXPOSE 8000

# Create and set working dir
WORKDIR /home/app

# Install pipenv
RUN pip install --upgrade pip
RUN pip install pipenv

# Install python dependencies
COPY Pipfile .
COPY Pipfile.lock .
RUN pipenv install --deploy --ignore-pipfile

# Install application into container
COPY . /home/app
