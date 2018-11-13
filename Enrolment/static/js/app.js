
var test = null;

var state = document.getElementById('content-capture');

var fingerprintTaken = false;
var pictureTaken = false;

var currentFormat = Fingerprint.SampleFormat.PngImage;
var deviceTechn = {
               0: "Unknown",
               1: "Optical",
               2: "Capacitive",
               3: "Thermal",
               4: "Pressure"
            }

var deviceModality = {
               0: "Unknown",
               1: "Swipe",
               2: "Area",
               3: "AreaMultifinger"
            }

var deviceUidType = {
               0: "Persistent",
               1: "Volatile"
            }

var FingerprintSdkTest = (function () {
    function FingerprintSdkTest() {
        var _instance = this;
        this.operationToRestart = null;
        this.acquisitionStarted = false;
        this.sdk = new Fingerprint.WebApi;
        this.sdk.onDeviceConnected = function (e) {
            // Detects if the deveice is connected for which acquisition started
            showMessage("Scan your finger");
        };
        this.sdk.onDeviceDisconnected = function (e) {
            // Detects if device gets disconnected - provides deviceUid of disconnected device
            showMessage("Device disconnected");
        };
        this.sdk.onCommunicationFailed = function (e) {
            // Detects if there is a failure in communicating with U.R.U web SDK
            showMessage("Communinication Failed")
        };
        this.sdk.onSamplesAcquired = function (s) {
            // Sample acquired event triggers this function
                sampleAcquired(s);
        };
        //this.sdk.onQualityReported = function (e) {
            // Quality of sample aquired - Function triggered on every sample acquired
                //document.getElementById("qualityInputBox").value = Fingerprint.QualityCode[(e.quality)];
        //}

    }

    FingerprintSdkTest.prototype.startCapture = function () {
        if (this.acquisitionStarted) // Monitoring if already started capturing
            return;
        var _instance = this;
        showMessage("");
        this.operationToRestart = this.startCapture;
        this.sdk.startAcquisition(currentFormat).then(function () {
            _instance.acquisitionStarted = true;

        }, function (error) {
            showMessage(error.message);
        });
    };
    FingerprintSdkTest.prototype.stopCapture = function () {
        if (!this.acquisitionStarted) //Monitor if already stopped capturing
            return;
        var _instance = this;
        showMessage("");
        this.sdk.stopAcquisition().then(function () {
            _instance.acquisitionStarted = false;

        }, function (error) {
            showMessage(error.message);
        });
    };

    FingerprintSdkTest.prototype.getInfo = function () {
        var _instance = this;
        return this.sdk.enumerateDevices();
    };

    FingerprintSdkTest.prototype.getDeviceInfoWithID = function (uid) {
        var _instance = this;
        return  this.sdk.getDeviceInfo(uid);
    };


    return FingerprintSdkTest;
})();

function showMessage(message){
    var _instance = this;
    //var statusWindow = document.getElementById("status");
    x = state.querySelectorAll("#status");
    if(x.length != 0){
        x[0].innerHTML = message;
    }
    document.cookie="username=";
    document.cookie="ID="+document.all.idValue.value;
}

window.onload = function () {
    localStorage.clear();
    test = new FingerprintSdkTest();
};

function sampleAcquired(s){
            // If sample acquired format is PNG- perform following call on object recieved
            // Get samples from the object - get 0th element of samples as base 64 encoded PNG image
                localStorage.setItem("imageSrc", "");
                var samples = JSON.parse(s.samples);
                localStorage.setItem("imageSrc", "data:image/png;base64," + Fingerprint.b64UrlTo64(samples[0]));
                if(state == document.getElementById("content-capture")){
                    var vDiv = document.getElementById('imagediv');
                    vDiv.innerHTML = "";
                    var image = document.createElement("img");
                    image.id = "image";
                    image.height = 250;
                    image.width = 250;
                    image.src = localStorage.getItem("imageSrc");
                    vDiv.appendChild(image);
                    fingerprintTaken = true

                    console.log('Fingerprint captured');
                    // test.stopCapture();
                    console.log(samples);

                    //Encode image to base64
                    // console.log(localStorage.getItem("imageSrc"));
                    $('#fingerValue').val(localStorage.getItem("imageSrc"));

                    var data = {
                        personId: $("#idValue").val(),
                        fname: $("#fname").val(),
                        lname: $("#lname").val(),
                        gender: $("#inputGender").val(),
                        dob: $("#inputDate").val(),
                        country: $("#inputCountry").val(),
                        fingerId: $("#fingerValue").val()
                    };

                    fingerprintTaken = true;
                    if (fingerprintTaken && pictureTaken) {
                      confirmBtn.disabled = false;
                    }

                    // Confirm to use the current fingerprint that is showing
                    $("#confirmBtn").on("click", function() {
                        console.log(data);
                        console.log('Stop capture')
                        $(this).prop('disabled', true);
                        test.stopCapture();
                    });
                }
}

// For Download and formats ends
