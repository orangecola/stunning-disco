var test = null;
var state = document.getElementById('content-capture');

var myVal = ""; // Drop down selected value of reader
var disabled = true;
var startEnroll = false;
var userData = ""

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
            // Detects if the device is connected for which acquisition started
            showMessage("Communication OK");
        };
        this.sdk.onDeviceDisconnected = function (e) {
            // Detects if device gets disconnected - provides deviceUid of disconnected device
            showMessage("Device disconnected");
        };
        this.sdk.onCommunicationFailed = function (e) {
            // Detects if there is a failure in communicating with U.R.U web SDK
            showMessage("Communication Failed")
        };
        this.sdk.onSamplesAcquired = function (s) {
            // Sample acquired event triggers this function
            sampleAcquired(s);
        };
        //this.sdk.onQualityReported = function (e) {
            // Quality of sample aquired - Function triggered on every sample acquired
           // document.getElementById("qualityInputBox").value = Fingerprint.QualityCode[(e.quality)];
        //}

    }

    FingerprintSdkTest.prototype.startCapture = function () {
        if (this.acquisitionStarted) // Monitoring if already started capturing
            return;
        var _instance = this;
        showMessage("");
        this.operationToRestart = this.startCapture;
        this.sdk.startAcquisition(currentFormat, myVal).then(function () {
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
}

window.onload = function () {
    localStorage.clear();
    test = new FingerprintSdkTest();
};

function sampleAcquired(s){
    // If sample acquired format is PNG- perform following call on object recieved
    // Get samples from the object - get 0th element of samples as base 64 encoded PNG image
    initialize();
    localStorage.setItem("imageSrc", "");
    var samples = JSON.parse(s.samples);
    localStorage.setItem("imageSrc", "data:image/png;base64," + Fingerprint.b64UrlTo64(samples[0]));
    if(state == document.getElementById("content-capture")){
        var vDiv = document.getElementById('imagediv');
        vDiv.innerHTML = "";
        var image = document.createElement("img");
        image.id = "image";
        image.src = localStorage.getItem("imageSrc");
        vDiv.appendChild(image);

        $("#fingerMessage").html("Fingerprint Captured");
        console.log('Fingerprint captured');
        $("#verifyBtn").show();
        $("#submitBtn").hide();

        $('#fingerValue').val(localStorage.getItem("imageSrc"));
        }
    }

function delayAnimate(id,visibility)
{
   document.getElementById(id).style.display = visibility;
}

//Fullreset
function initialize() {
  $("#name").html("Name: ");
  $("#address").html("Address: ");
  $("#country").html("Country: ");
	$("#imagediv").show();
    $("#verifyBtn").show();
	$("#submitBtn").hide();
	$("#bloodType").hide();
	$("#medicalCondition").hide();
	$("#immunization").hide();
	$("#allergies").hide();
	$('#personId').hide();
	$('#fingerId').hide();
	$('#fname').hide();
	$('#lname').hide();
	$('#inputGender').hide();
	$('#inputAddress').hide();
	$('#inputDate').hide();
	$('#inputCountry').hide();
	$('#accountNo').hide();
	$('#accountBalance').hide();
	$('#timestamp').hide();
	$('#counter').hide();
    $("#info-header").hide();
    $('#image').attr("src", "static/scan.gif");
    $('#image').attr("width", 100);
    $('#image').attr("height", 100);
    $('#profilePicture').attr("src", "static/images/profile.png");
	$('input[type="radio"]').prop('checked', false);
    $('input[type="checkbox"]').prop('checked', false);
    $("#verifyBtn").prop('disabled', false);
	$("#fingerMessage").html("Place thumb/index onto fingerprint scanner");
    result = "";
}
$(document).ready(function(){
	initialize();
	var test1 = new FingerprintSdkTest();
	test1.startCapture();
});

var okBtn = document.getElementById('ok');
var dialog2 = document.getElementById('dialog');
okBtn.addEventListener('click', function() {
   		dialog2.close();
  });

// Confirm to use the current fingerprint that is showing
    $("#verifyBtn").on("click", function() {
        console.log('Stop capture')
        $("#verifyBtn").prop('disabled', true);
        $("#fingerMessage").html("Verifying fingerprint...");
        test.stopCapture();
        var fingerData = {
                current: localStorage.getItem("imageSrc")
        };
            //POST call to create
            $.ajax({
                type: "POST",
                url: "/",
                data: fingerData,
                success: function(result) {
                    if (result.constructor === {}.constructor){
                        $("#fingerMessage").html("Fingerprint recognized. Please confirm your details below");
                        console.log(result);
                        changeToSubmit(result);
                        userData = result
                    }
                    else {
                        // not json
                        $("#fingerMessage").html("Fingerprint not recognized. Please Try again");
                        $("#verifyBtn").prop('disabled', false);
                        }
                    },
                error: function(error) {
                    console.log(error)
                }
            });
		});

// Transition from Verify to Submit
function changeToSubmit(result){
        //Show the information
        $("#verifyBtn").hide();
        $("#submitBtn").show();
        $("#imagediv").show();
        $("#info-header").show();
        $("#name").html("Name: " + result.firstName + ' ' + result.lastName);
        $("#address").html("Address: " + result.address);
        $("#country").html("Country: " + result.country);
        $('#profilePicture').attr("src", result.picture);
        $("#submitBtn").prop('disabled', false);
        //Need to check / uncheck boxes based on result

        //Set checkboxes for medicial conditions
        var medicalConditionArr =  result.medicalCondition.split(",")
        for (i = 0; i <  medicalConditionArr.length; i++) {
            $("#collapse1 label input[name='" + medicalConditionArr[i] + "']").prop('checked', true);
        }

        //Set blood type
        $("#collapse2 label input[value='" + result.bloodType + "']").prop('checked', true);

        //Set checkboxes for immunization
        var immunizationArr =  result.immunization.split(",")
        for (i = 0; i <  immunizationArr.length; i++) {
            $("#collapse3 label input[name='" + immunizationArr[i] + "']").prop('checked', true);
        }

        //Set checkboxes for allergies
        var allergiesArr =  result.allergies.split(",")
        for (i = 0; i <  allergiesArr.length; i++) {
            $("#collapse4 label input[name='" + allergiesArr[i] + "']").prop('checked', true);
        }
    };

//Save data to blockchain
$("#submitBtn").click(function(){

		// PUT: update this person's counter value (+1)
		// POST: create "new" person with a "new" id number, which is the original id +1. then hash this "new" id
		var dialog = document.getElementById("dialog")

		var bloodType = '';
		var medicalConditionArr = [];
		var immunizationArr = [];
		var allergiesArr = [];

		var ts = new Date();

		// check which checkboxes were ticked
		$('#collapse1 input:checked').each(function() {
			medicalConditionArr.push($(this).attr('name'));
		});
		$('#collapse2 input:checked').each(function() {
			bloodType = $(this).attr('value');
		});
		$('#collapse3 input:checked').each(function() {
			immunizationArr.push($(this).attr('name'));
		});
		$('#collapse4 input:checked').each(function() {
			allergiesArr.push($(this).attr('name'));
		});

		var medicalConditionStr = medicalConditionArr.join();
		var immunizationStr = immunizationArr.join();
		var allergiesStr = allergiesArr.join();

        if (medicalConditionStr === "")
            medicalConditionStr = "null"
        if (immunizationStr === "")
            immunizationStr = "null"
        if (allergiesStr === "")
            allergiesStr = "null"
        if (bloodType === "")
            bloodType = "null"


		var counterIncrement = parseInt($('#counter').val()) + 1;
		$('#counter').val(counterIncrement);
		document.getElementById("submitBtn").disabled = true;

        userData.bloodType = bloodType
        userData.medicalCondition = medicalConditionStr
        userData.immunization = immunizationStr
        userData.allergies = allergiesStr
        console.log(userData);

		// post to Person api (creating new person again but this time hash the personid)
		$.ajax({
			type: "POST",
			url: "/update",
			data: userData,
			success: function(result) {
			dialog.showModal();
			initialize();

        },
        error: function(error) {
        	console.log(error)
        }
    });
})
