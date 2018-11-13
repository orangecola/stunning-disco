var resultOldDate =0
var blockCount = 0

function getEnrolmentBox(result) {
  x = '<h3 class="card-pf-subtitle"><strong style="overflow-wrap: break-word;">Block ' + sha256(result[0].personID + result[0].accountBranch) +'</strong></h3>' +
  '<div id="chart-pf-donut-6"></div>' +
  '<div class="chart-pf-sparkline" id="chart-pf-sparkline-6"></div>' +
  '</div>' +
  '<div id="dataCol' + blockCount + '">' +
  '<span class="card-pf-utilization-card-details-count">' + '</span>' +
  '<span class="card-pf-utilization-card-details-description">' +
  '<span class="card-pf-utilization-card-details-line-1" style="font-size: 16px;">' +
  '</span><br/>' +

  '<span class="card-pf-utilization-card-details-line-2"><b>Full Name:</b><font color ="#FF9933"> ' +result[0].firstName + ' ' + result[0].lastName + '</font></span>' +
  '<br>' +
  '<span class="card-pf-utilization-card-details-line-2"><b>Gender:</b><font color ="#FF9933"> ' + result[0].gender + '</font></span>' +
  '<br>' +
  '<span class="card-pf-utilization-card-details-line-2"><b>Country:</b><font color ="#FF9933"> ' + result[0].country +'</font></span>' +
  '<br>' +
  '<span class="card-pf-utilization-card-details-line-2"><b>Address:</b><font color ="#FF9933"> ' + result[0].address + '</font></span>' +
  '<br>' +
  '<span class="card-pf-utilization-card-details-line-2"><b>Date of Birth :</b><font color ="#FF9933"> ' + result[0].dob + '</font></span>' +
  '<br>' +
  '<span class="card-pf-utilization-card-details-line-2"><b>Medicial Conditions:</b><font color ="#FF9933"> ' + result[0].medicalCondition + '</font></span>' +
  '</span>' +
  '<br>' +
  '<span class="card-pf-utilization-card-details-line-2"><b>Blood Type:</b><font color ="#FF9933"> ' + result[0].bloodType + '</font></span>' +
  '<br>' +
  '<span class="card-pf-utilization-card-details-line-2"><b>Immunization:</b><font color ="#FF9933"> ' + result[0].immunization + '</font></span>' +
  '<br>' +
  '<span class="card-pf-utilization-card-details-line-2"><b>Allergies:</b><font color ="#FF9933"> ' + result[0].allergies + '</font></span>' +
  '<br>' +

  '<span class="card-pf-utilization-card-details-line-2">' + '</span>' +
  '</span>' +
  '</p>' +
  '<div id="chart-pf-donut-7"></div>' +
  '<div class="chart-pf-sparkline" id="chart-pf-sparkline-7"></div>' +
  '</div>' +

  '</div>' +
  '<hr>';
  return x;
}

function getHospitalBox(result) {
  x = '<h3 class="card-pf-subtitle"><strong style="overflow-wrap: break-word;">Block ' + sha256(result[0].personID + result[0].accountBranch) +'</strong></h3>' +
  '<div id="chart-pf-donut-6"></div>' +
  '<div class="chart-pf-sparkline" id="chart-pf-sparkline-6"></div>' +
  '</div>' +
  '<div id="dataCol' + blockCount + '">' +
  '<span class="card-pf-utilization-card-details-count">' + '</span>' +
  '<span class="card-pf-utilization-card-details-description">' +
  '<span class="card-pf-utilization-card-details-line-1" style="font-size: 16px;">' +
  '</span><br/>' +

  '<span class="card-pf-utilization-card-details-line-2"><b>Full Name:</b><font color ="#FF9933"> ' +result[0].firstName +" "+ result[0].lastName + ' </font></span>' +
  '<br>' +
  '<span class="card-pf-utilization-card-details-line-2"><b>Medicial Conditions:</b><font color ="#FF9933"> ' + result[0].medicalCondition + '</font></span>' +
  '</span>' +
  '<br>' +
  '<span id="bloodType3" class="card-pf-utilization-card-details-line-2"><b>Blood Type:</b><font color ="#FF9933"> ' + result[0].bloodType + '</font></span>' +
  '<br>' +
  '<span id="immunization3" class="card-pf-utilization-card-details-line-2"><b>Immunization:</b><font color ="#FF9933"> ' + result[0].immunization + '</font></span>' +
  '<br>' +
  '</span>' +
  '<span id="allergies3" class="card-pf-utilization-card-details-line-2"><b>Allergies:</b><font color ="#FF9933"> ' + result[0].allergies + '</font></span>' +
  '<br>' +
  '<span class="card-pf-utilization-card-details-line-2">' + '</span>' +
  '</span>' +
  '</p>' +
  '<div id="chart-pf-donut-7"></div>' +
  '<div class="chart-pf-sparkline" id="chart-pf-sparkline-7"></div>' +
  '</div>' +

  '</div>' +
  '<hr>';

  return x;
}

function getUpdate(){
  $.ajax({
    url: apiUrl + "/api/Person/",
    type: "GET",
    dataType: 'json',
    headers: {
    },
    contentType: 'application/json; charset=utf-8',
    success: function (result) {

          // sort results by timestamp so first row is always the latest data
          result.sort(function(a,b){
            return new Date(b.timestamp) - new Date(a.timestamp);
          });
          //console.log(result[0].timestamp);
          //Container
          var div = document.getElementById('box');
          var div2 = document.getElementById('box2');
          var div3 = document.getElementById('box3');

          //innerHTML
          var divBox1 = document.createElement('div');
          var divBox2 = document.createElement('div');
          var divBox3 = document.createElement('div');



          //checks if data exist if doesn not exist hightlight the changes.
          //Handles Enrollment
          if(resultOldDate != result[0].timestamp){

            resultOldDate = result[0].timestamp
            if(result[0].accountCurrency == "added") {
              divBox1.innerHTML = getEnrolmentBox(result)

              $('#speech').trigger('play')
              $('#enrolmentimg').fadeTo( 400, 0 );
              $('#enrolmentimg').fadeTo( 400, 100 );
              $('#enrolmentimg').fadeTo( 400, 0 );
              $('#enrolmentimg').fadeTo( 400, 100 );
              $('#enrolmentimg').fadeTo( 400, 0 );
              $('#enrolmentimg').fadeTo( 400, 100 );
            }
            else if (result[0].accountCurrency == "authorization" ){
              divBox2.innerHTML = getHospitalBox(result)
              $('#authorization').trigger('play')
              $('#hospitalimg').fadeTo( 400, 0 );
              $('#hospitalimg').fadeTo( 400, 100 );
              $('#hospitalimg').fadeTo( 400, 0 );
              $('#hospitalimg').fadeTo( 400, 100 );
              $('#hospitalimg').fadeTo( 400, 0 );
              $('#hospitalimg').fadeTo( 400, 100 );
            }
            else if (result[0].accountCurrency == "edited" ){
              divBox1.innerHTML = getEnrolmentBox(result)
              divBox2.innerHTML = getHospitalBox(result)
              $('#speech').trigger('play')
              $('.img').fadeTo( 400, 0 );
              $('.img').fadeTo( 400, 100 );
              $('.img').fadeTo( 400, 0 );
              $('.img').fadeTo( 400, 100 );
              $('.img').fadeTo( 400, 0 );
              $('.img').fadeTo( 400, 100 );
            }

          /*
          divBox2.innerHTML =
          '<h3 class="card-pf-subtitle"><strong style="overflow-wrap: break-word;">Block ' + sha256(blockCount.toString()) +'</strong></h3>' +
              '<div id="chart-pf-donut-6"></div>' +
              '<div class="chart-pf-sparkline" id="chart-pf-sparkline-6"></div>' +
              '</div>' +
              '<div id="dataCol' + blockCount + '">' +
              '<span class="card-pf-utilization-card-details-count">' + '</span>' +
              '<span class="card-pf-utilization-card-details-description">' +
              '<span class="card-pf-utilization-card-details-line-1" style="font-size: 16px;">' +
              '</span><br/>' +

              '<span class="card-pf-utilization-card-details-line-2"><b>Full Name:</b><font color ="#FF9933"> ' +result[0].firstName +" "+ result[0].lastName  + ' </font></span>' +
              '<br>' +
              '<span class="card-pf-utilization-card-details-line-2"><b>Account No:</b><font color ="#FF9933"> ' +  result[0].accountNo + '</font></span>' +
              '<br>' +
              '<span class="card-pf-utilization-card-details-line-2"><b>Account Balance:</b><font color ="#FF9933"> ' + result[0].accountBalance + '</font></span>' +
              '<br>' +
              '<span class="card-pf-utilization-card-details-line-2"><b>Account Branch:</b><font color ="#FF9933"> ' + result[0].accountBranch + '</font></span>' +
              '<br>' +
              '</span>' +
              '<span class="card-pf-utilization-card-details-line-2"><b>Account Currency:</b><font color ="#FF9933"> ' + result[0].accountCurrency + '</font></span>' +
              '</span>' +
              '<span class="card-pf-utilization-card-details-line-2">' + '</span>' +
              '</span>' +
              '</p>' +
              '<div id="chart-pf-donut-7"></div>' +
              '<div class="chart-pf-sparkline" id="chart-pf-sparkline-7"></div>' +
              '</div>' +

              '</div>' +
              '<hr>';
          */


          $(divBox1).hide().prependTo(div).slideDown(1000);
          $(divBox2).hide().prependTo(div2).slideDown(1000);
          $(divBox3).hide().prependTo(div3).slideDown(1000);
        }

      },
      error: function (error) {
        console.log(error);

      }

    })
setTimeout(getUpdate, 5000);
}









$(document).ready(function(e) {
  $('#speech').hide()
  $('#authorization').hide()
  getUpdate()
});
