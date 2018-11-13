/* 
 $("#name").hide();
$("#gender").hide();
$("#imagediv").show();
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
$('#bankCode').hide();
$('#branchCode').hide();
$('#timestamp').hide();
$('#counter').hide();
$('#orginTimestamp').hide();
$("#idInput").hide();
 
$(document).ready(function(){
	cookieValue = document.cookie.split("ID=")[1]
	var test = new FingerprintSdkTest();
	test.startCapture();
	var hashedValue = '';
	var data = {};
	$("#verifyBtn").click(function(){
		$("#idLabel").hide();
		$("#idInput").hide();
		$("#name").show();
		$("#gender").show();
		$("#verifyBtn").hide();
		$("#submitBtn").show();
		hashedValue = sha256(cookieValue); //4215771
		$("#imagediv").show();

		//retrieve data
		$.ajax({
			url: "http://192.168.3.141:3000/api/Person/" + hashedValue,
			type: "GET",
			dataType: 'json',
			headers: {
			},
			contentType: 'application/json; charset=utf-8',
			success: function (result) {
				console.log(result);
				var fullName = result.firstName + ' ' + result.lastName;
				document.getElementById('name').innerHTML += fullName;
				document.getElementById('address').innerHTML += result.address;
				document.getElementById('country').innerHTML += result.country

				// Changes Muruganand
				//$('#personId').val($("#idInput").val());
				$('#personId').val(cookieValue);
				$('#fingerId').val(result.fingerId);
				// localStorage.setItem("originalFingerprint", )
				$('#fname').val(result.firstName);
				$('#lname').val(result.lastName);
				$('#inputGender').val(result.gender);
				$('#inputAddress').val(result.address);
				$('#inputDate').val(result.dob);
				$('#inputCountry').val(result.country);
				$('#bloodType').val(result.bloodType);
				$('#medicalCondition').val(result.medicalCondition);
				$('#immunization').val(result.immunization);
				$('#allergies').val(result.allergies);
				$('#counter').val(result.counter);
				$('#orginTimestamp').val(result.timestamp);

				localStorage.setItem("orginTimestamp", result.timestamp);
			},
			error: function (error) {
				console.log(error);

			}

		})

	}); // end of verify btn


	$("#submitBtn").click(function(){

		// PUT: update this person's counter value (+1)
		// POST: create "new" person with a "new" id number, which is the original id +1. then hash this "new" id
		var dialog = document.getElementById("dialog")

		var data = {};

		var ts = new Date().toJSON().toString();

		var accountNo = '';
		var bankCode = '';
		var branchCode = '';


		$('#accountNo').val(accountNo);
		$('#bankCode').val(bankCode);
		$('#branchCode').val(branchCode);


		$('#timestamp').val(ts);

		var counterIncrement = parseInt($('#counter').val()) + 1;
		$('#counter').val(counterIncrement);
		document.getElementById("submitBtn").disabled = true;



		data = {
			personId: $('#personId').val(),
			fingerId: $('#fingerId').val(),
			fname: $("#fname").val(),
			lname: $("#lname").val(),
			gender: $("#inputGender").val(),
			dob: $("#inputDate").val(),
			country: $("#inputCountry").val(),
			address: $("#inputAddress").val(),
			accountNo: accountNo,
			bankCode: bankCode,
			branchCode: branchCode,
			bloodType: $('#bloodType').val(),
			medicalCondition:$('#medicalCondition').val(),
			immunization: $('#immunization').val(),
			allergies: $('#allergies').val(),
			// timestamp: $('#timestamp').val(ts),
			counter: $('#counter').val(),
			orginTimestamp : $('#orignTimestamp').val()

		}
		console.log(localStorage.getItem("orginTimestamp"));

		$.extend(data, { "timestamp" : $("#timestamp").val() });
		$.extend(data, { "orginTimestamp" : localStorage.getItem("orginTimestamp") });

		// $('#orignTimestamp').val(result.timestamp);

		// post to Person api (creating new person again but this time hash the personid)
		$.ajax({
			type: "POST",
			url: "/",
			data: data,
			success: function(result) {
			dialog.showModal();

        },
        error: function(error) {
        	console.log(error)
        }
    });



	})


});

var okBtn = document.getElementById('ok');
var dialog2 = document.getElementById('dialog');
okBtn.addEventListener('click', function() {
   		dialog2.close();
  });
 */