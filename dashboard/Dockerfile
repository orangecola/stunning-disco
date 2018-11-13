FROM alpine:latest
ARG SERVERIP
ENV SERVERIP $SERVERIP
RUN apk add --update python python-dev py-pip
COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt
COPY . /app
WORKDIR /app
RUN echo "apiUrl='$SERVERIP:3000'" > /app/static/server.js
ENTRYPOINT ["python",  "main.py"]
