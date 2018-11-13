// //Turn on fingerprint sensor (Fingerprint page)
// function startFingerprint() {
//   $(document).ready(function(){
//     setTimeout(function(){
//       $.ajax({
//           type: "POST",
//           url: "/fingerprintEnroll",
//           dataType: "html",
//           success: function() {
//               console.log("RUN");
//           },
//           error: function (xhr, status, error) {
//               console.log(error);
//           }
//       });
//     },2000); // milliseconds
//   });
// };

// //Changing text of fingerprint page message (Fingerprint page)
// function updateFingerPage(){
//   $(document).ready(function(){
//     setInterval(function(){
//       $.ajax({
//         url: "/fingerprintUpdate",
//         type: "GET",
//         success: function(response) {
//           $("#fingerMessage").html(response);
//         },
//         error: function(xhr) {
//           $("#fingerMessage").html("Loading...");
//         }
//       });
//     },2000); // milliseconds
//   });
//};

//Changing text of fingerprint page message (Fingerprint page)
function update(){
  $(document).ready(function(){
    setInterval(function(){
      $.ajax({
        url: "/statusUpdate",
        type: "GET",
        success: function(response) {
          $("#fingerMessage").html(response);
        },
        error: function(xhr) {
          $("#fingerMessage").html("Loading...");
        }
      });
    },2000); // milliseconds
  });
};

//startFingerprint()
//updateFingerPage()
update()