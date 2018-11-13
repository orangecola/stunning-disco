from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from fingerRecognition import recognition
import json
import time
import os
import sys
import urllib.request
import base64
import requests
from datetime import datetime

apiUrl=os.environ['SERVERIP'] + ":3000"
app = Flask(__name__)

fingerMessage = "Loading"

formCompleteFlag = 0
postCount = 0
verified = "false"

submitted = 0

@app.route("/")
def index():
    # return "Flask App!"
    verified = "false"
    return render_template(
        'login.html', fingerMessage=fingerMessage)

@app.route('/',methods = ['POST'])
def verify():
   global postCount
   global verified
   global fingerMessage
   global submitted

   if request.method == 'POST':
    postCount += 1

    # Load the original and current fingerprint base64 data taken from POST in app.js
    result = request.form
    data = json.dumps(dict(result))
    formData = json.loads(data)
    mylist = formData["current"].split(',')
    # Save original fingerprint image
    blockFinger = base64.b64decode(mylist[1])
    recognitionDirectory = './fingerRecognition/database/'
    currentImage = 'img1.png'
    blockImage='img2.png'
    currentImageFileName = recognitionDirectory+currentImage
    blockImageFileName = recognitionDirectory+blockImage
    with open(currentImageFileName,'wb') as f:
      f.write(blockFinger)


	#Get all fingerprints from the blockchain
    with urllib.request.urlopen(apiUrl + "/api/Person") as url:
        data = json.loads(url.read().decode())

    #For each fingerprint, create the image and verify against
    for i in data:
        mylist = i.get("fingerId").split(',')
        print("Checking against user :" + i.get("personID"), file=sys.stderr)
        blockFinger = base64.b64decode(mylist[1])
        with open(blockImageFileName,'wb') as f:
            f.write(blockFinger)
        result = recognition.main(currentImageFileName, blockImageFileName)
        if (result):
            return jsonify(i)
    return "Not Found"

@app.route('/update', methods = ['POST'])
def update():
    # #Format form data into JSON
    result = request.form
    data = json.dumps(dict(result))
    formData = json.loads(data)
    r = requests.put(apiUrl + '/api/Person/' + formData.get("personID"),
        headers = {
        'Content-Type': 'application/json'
        },
        data = json.dumps({
					"$class": "org.example.id2020.Person",
					"personID": formData.get("personID"),
					"fingerId": formData.get("fingerId"),
					"firstName": formData.get("firstName"),
					"lastName": formData.get("lastName"),
                    "picture": formData.get("picture"),
					"dob": formData.get("dob"),
					"gender": formData.get("gender"),
					"country": formData.get("country"),
					"address": formData.get("address"),
					"bloodType": formData.get("bloodType"),
					"medicalCondition": formData.get("medicalCondition"),
					"immunization": formData.get("immunization"),
					"allergies": formData.get("allergies"),
					"accountNo": formData.get("accountNo"),
					"accountBalance": formData.get("accountBalance"),
                    "accountBranch": formData.get("accountBranch"),
                    "accountCurrency": formData.get("accountCurrency"),
					"timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
					})
        )
    print(r.status_code, file=sys.stderr)
    return render_template("login.html", fingerMessage = fingerMessage)

@app.route('/statusUpdate',methods = ['POST', 'GET'])
def statusUpdate():
  if request.method == "GET":
    verifyStatus = message.get()

    return verifyStatus
  elif request.method == 'POST':
      result = request.form
      data = json.dumps(dict(result))
      formData = json.loads(data)
      formData = list(formData.values())
      message.set(formData[0][0])
      return message.get()

if __name__ == "__main__":
    app.run(host='0.0.0.0',port='5003')
