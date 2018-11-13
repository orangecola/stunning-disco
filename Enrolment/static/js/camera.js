const constraints = {
  video: {width:250, height: 250}
};

const video = document.querySelector('#webcam');

navigator.mediaDevices.getUserMedia(constraints).
  then((stream) => {video.srcObject = stream});



const screenshotButton = document.querySelector('#screenshotBtn');
const img = document.querySelector('#storedImage');
const canvas = document.createElement('canvas');
const resetButton = document.querySelector('#retakeBtn');
const confirmButton = document.querySelector('#confirmBtn');

screenshotButton.onclick = video.onclick = function() {
  canvas.width = 250;
  canvas.height = 250;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  img.src = canvas.toDataURL('image/png');
  video.hidden = true;
  screenshotButton.hidden = true;
  resetButton.hidden = false;
  img.hidden = false;
  pictureTaken = true;
  if (fingerprintTaken && pictureTaken) {
    confirmBtn.disabled = false;
  }
};

resetButton.onclick = video.onclick = function() {
  video.hidden = false;
  screenshotButton.hidden = false;
  img.hidden = true;
  resetButton.hidden = true;
  pictureTaken = false;
  confirmBtn.disabled = true;
};

function handleSuccess(stream) {
  screenshotButton.disabled = false;
  video.srcObject = stream;
}
