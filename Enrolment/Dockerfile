FROM alpine:latest
ARG SERVERIP
ENV SERVERIP $SERVERIP
RUN apk add --update python python-dev py-pip py-openssl
COPY ./requirements.txt /
RUN pip install -r requirements.txt
COPY . /app
WORKDIR /app
ENTRYPOINT ["python",  "main.py"]
