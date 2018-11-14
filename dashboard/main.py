# from flask import Flask
from flask import Flask, redirect, render_template, request, session, abort, url_for
import datetime, os
import requests
now = datetime.datetime.now()
apiUrl=os.environ['SERVERIP'] + ":3000"
name = "aster"
date = str(now)
app = Flask(__name__)

@app.route("/")
def index():
    # return "Flask App!"
    return render_template(
        'home.html',name=name,date=date)

@app.route("/clear")
def clear():
    r = requests.get(apiUrl + "/api/Person")
    data = r.json()

    #For each person, submit a delete request to clear the person list (Resetting demo to start state )
    for i in data:
        requests.delete(apiUrl + '/api/Person/' + i.get("personID"))
    return redirect(url_for('index'))


if __name__ == "__main__":
    app.run(host='0.0.0.0',port='5001')
