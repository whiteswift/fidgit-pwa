var status = document.getElementById("status");

var flickPlastic = new Audio("assets/media/flick-pastic.mp3");
var metalButton = new Audio("assets/media/metal-button.mp3");
var monkeyWrench = new Audio("assets/media/monkey-wrench.mp3");
var plasticButton = new Audio("assets/media/plastic-button.mp3");
var plasticTap = new Audio("assets/media/plastic-tap.mp3");

/////////////
var umbrellaButton = document.querySelector("#umbrella-button");
var umbrellaLogo = document.querySelector("#umbrella-logo");
var audioFile = new Audio("assets/media/rain.mp3");

audioFile.addEventListener("timeupdate",
  function () {
    // console.log('currentTime',this.currentTime);
    var buffer = 0.85;
    if (this.currentTime > this.duration - buffer) {
      this.currentTime = 0;
      this.play();
    }
  },
  false
);

umbrellaButton.addEventListener("click", () => { //TODO touchup event?
  umbrellaLogo.classList.toggle('rotate');
  if (status.innerHTML === "Raining") {
    status.innerHTML = "Paused";
    audioFile.pause();
  } else {
    status.innerHTML = "Raining";
    audioFile.play();
  }
});

// Add to homescreen event // Does this event exist still?
window.addEventListener("beforeinstallprompt", function (e) {
  e.userChoice.then(function (choiceResult) {
    console.log(choiceResult.outcome);
    if (choiceResult.outcome == "dismissed") {
      console.log("User cancelled home screen install");
    } else {
      console.log("User added to home screen");
    }
  });
});

function restartAudio() {
  audioFile.close();
  audioFile.start();
}

function setupMediaNotification() {
  if ('mediaSession' in navigator) {

    navigator.mediaSession.metadata = new MediaMetadata({
      title: 'Fidget',
      artist: '',
      album: 'Focus',
      artwork: [
        { src: 'assets/images/fidget_144.png', sizes: '144x144', type: 'image/png' },
        { src: 'assets/images/fidget_256.png', sizes: '256x256', type: 'image/png' },
        { src: 'assets/images/fidget_512.png', sizes: '512x512', type: 'image/png' }
      ]
    });

    navigator.mediaSession.setActionHandler(
      'play', () => {
        audioFile.play();
      })
    navigator.mediaSession.setActionHandler(
      'pause', () => {
        audioFile.pause();
      })
  }
}

setupMediaNotification();

[].forEach.call(document.getElementsByClassName('plastic'), (element) => {
  element.addEventListener('click', function () {
    plasticButton.play();
  });
});

[].forEach.call(document.getElementsByClassName('metal'), (element) => {
  element.addEventListener('click', function () {
    metalButton.play();
  });
});

[].forEach.call(document.getElementsByClassName('wrench'), (element) => {
  element.addEventListener('mousedown', function () {
    monkeyWrench.play();
  });
});