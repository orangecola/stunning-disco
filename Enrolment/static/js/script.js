
//Disable buttons first because page still loading
$('#section1Btn').prop('disabled', true);
$('#submitBtn').prop('disabled', true);
$('#confirmBtn').prop('disabled', true);

$('#idValue').hide();
$('#fingerValue').hide();
$('#timestampValue').hide();

$(document).ready(function(){
	// Enable buttons only when page fully loaded
	$(window).load(function(){
       $('#section1Btn').prop('disabled', false);
       $('#submitBtn').prop('disabled', false);
       $('#idValue').hide();
       $('#fingerValue').hide();
       $('#timestampValue').hide();
   });


	var randomId = Math.floor(Math.random()*9000000) + 1000000;
	var idHTML = document.getElementById('idLabel');
	$('#idValue').val(randomId);

	idHTML.innerHTML += randomId;


	$(this).scrollTop(0);

	$("#section1Btn").click(function() {
		$('html,body').animate({
			scrollTop: $(".section2").offset().top -5},
			'slow');
	});

	var data = {};

	$("#submitBtn").on("click", function() {
		// disable register button

	var test = new FingerprintSdkTest();
    test.startCapture();

		data = {
			personId: randomId,
			fname: $("#fname").val(),
			lname: $("#lname").val(),
			gender: $("#inputGender").val(),
			dob: $("#inputDate").val(),
			country: $("#inputCountry").val(),
			address: $("#inputAddress").val(),
			bloodType: $("#Bloodtype").val(),
			medicalCondition: $("#Medicalcondition").val()
			// fingerId: $("#fingerValue").val()
		};


		var displayHTML =
		'<label>' + data.personId + '</label>' +
		'<br>' +
		'<label>' + data.fname + '</label>' +
		'<br>' +
		'<label> ' + data.lname + '</label>' +
		'<br>' +
		'<label>' + data.gender + '</label>' +
		'<br>' +
		'<label>' + data.dob + '</label>' +
		'<br>' +
		'<label>' + data.country + '</label> '+
		'<br>'+
		'<label>'+ data.address +'</label>' + 
		'<br>' +
		'<label>' + data.bloodType + '</label> '+
		'<br>' +
		'<label>' + data.medicalCondition + '</label> ';
		document.getElementById('displayData').innerHTML += displayHTML;

		//Once fingerprint captured, do POST call to create new user (see app-enroll.js)


		// $.ajax({
		// 	url: $("#foo").attr("href"),
		// 	type: "POST",
		// 	data: data
		// })
		// .done(function(result) {

	 //    });
		// Scrolling to 3rd section
		$('html,body').animate({
			scrollTop: $(".section3").offset().top -5},
			'slow');
		// disable register btn
		$(this).prop('disabled', true);


	});



	$("#confirmBtn").click(function(e) {
		var ts = new Date().toJSON().toString();
		var dialog = document.getElementById('dialog')

		$("#timestamp").val(ts);

		$.extend(data, { "fingerId" : $("#fingerValue").val() });
		$.extend(data, { "picture" : $("#storedImage").attr("src")})
		$.extend(data, { "timestamp" : $("#timestamp").val() });
		// $.extend(data, { "address" : $("#timestampValue").val() });
		data.personId =  Math.floor(Math.random()*9000000) + 1000000;
		console.log(data);
    $.ajax({
        type: "POST",
        url: "/",
        data: data,
        success: function(result) {
					video.hidden = false;
				  screenshotButton.hidden = false;
				  img.hidden = true;
				  resetButton.hidden = true;
					confirmBtn.disabled = true;

				  pictureTaken = false;
					fingerprintTaken = false;

					$("#image").attr("src", "static/images/scan.gif");
				  $("#displayData").html("");
					$('html,body').animate({scrollTop:0},0);
					$("#submitBtn").prop("disabled", false);
					dialog.showModal();
        },
        error: function(result) {
            alert('error');
        }
    });
});




}); //End of doc ready
var okBtn = document.getElementById('ok');
var dialog2 = document.getElementById('dialog');
okBtn.addEventListener('click', function() {
   		dialog2.close();
  });
