FROM python:3.7-slim
RUN apt-get update
RUN apt-get install libglib2.0-dev libsm6 libxext6 libfontconfig1 libxrender1 -y 
COPY requirements.txt /requirements.txt
RUN pip3 install -r /requirements.txt

COPY . /app
WORKDIR /app

ARG SERVERIP
ENV SERVERIP $SERVERIP

ENTRYPOINT ["python",  "main.py"]
