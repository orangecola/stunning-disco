from flask import Flask, flash, redirect, render_template, request, session, abort
import json, os
import requests, traceback
import hashlib
from datetime import datetime

apiUrl=os.environ['SERVERIP'] + ":3000"
app = Flask(__name__)

def PersonIDHash(id):
    hash_object= hashlib.sha256(id.encode())
    hex_dig = hash_object.hexdigest()
    return hex_dig


@app.route("/")
def index():
    # return "Flask App!"
    return render_template(
        'index.html')

@app.route('/',methods = ['POST'])
def result():

   if request.method == 'POST':
   	# #Format form data into JSON
    result = request.form
    data = json.dumps(dict(result))
    formData = json.loads(data)

    try:
        r = requests.post(apiUrl + '/api/Person/',
            headers = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
            #'X-Authorization': token
            },
            data = json.dumps({
                "$class": "org.example.id2020.Person",
                "personID": PersonIDHash(formData.get("personId")[0]),
                "fingerId": formData.get("fingerId")[0],
                "firstName": formData.get("fname")[0],
                "lastName": formData.get("lname")[0],
                "picture": formData.get("picture")[0],
                "dob": formData.get("dob")[0],
                "gender": formData.get("gender")[0],
                "country": formData.get("country")[0],
                "address": formData.get("address")[0],
                "bloodType": formData.get("bloodType")[0],
                "medicalCondition": formData.get("medicalCondition")[0],
                "immunization": "null",
                "allergies": "null",
                "accountNo": "null",
                "accountBalance": "null",
                "accountBranch": "null",
                "accountCurrency": "added",
                "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                })
            )

        print(r.status_code)

        if r.status_code == 200:
            print('\nPOSTED SUCCESSFULLY!\n')
        else:
            print('\nFAILED!!!\n')
            response2 = json.loads(r.text)
    except Exception as e:
        traceback.print_exc();
        print(e)

    return "Added"


# @app.route('/',methods = ['POST'])
# def update():
#     return render_template("index.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0',port='5000', ssl_context='adhoc')
