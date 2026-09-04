function startGame() {
  window.location.href = "../ingame/game.html?score=0";
}

function resetGame() {
  const confirmed = confirm("Reset your best score to 0? This can't be undone.");
  if (!confirmed) return;

  localStorage.setItem("bestScore", "0");
  window.location.href = "menu.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const currentScore = urlParams.get("score");

  const scoreDisplay = document.getElementById("scoreDisplay");
  if (currentScore !== null) {
    scoreDisplay.textContent = `Your Last Score is: ${currentScore}`;
  }
});
const bestScore = localStorage.getItem("bestScore");

const bestScoreDisplay = document.querySelector(".best-score");

bestScoreDisplay.textContent = `Best Score: ${bestScore || 0}`;

const ICON_PLAY =
  '<svg class="icon icon-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z"/></svg>';
const ICON_PAUSE =
  '<svg class="icon icon-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';

function toggleAudio() {
  var audio = document.getElementById("backgroundMusic");
  var playButton = document.getElementById("customPlayButton");

  if (audio.paused) {
    audio.play();
    playButton.innerHTML = ICON_PAUSE;
    playButton.setAttribute("aria-label", "Pause menu music");
  } else {
    audio.pause();
    playButton.innerHTML = ICON_PLAY;
    playButton.setAttribute("aria-label", "Play menu music");
  }
}
function setVolume() {
  var audio = document.getElementById("backgroundMusic");
  var volumeSlider = document.getElementById("volumeSlider");
  audio.volume = volumeSlider.value;
}
let currentTime = 0;
let totalDuration = 0;

function updateMusicDuration() {
  const audio = document.getElementById("backgroundMusic");
  const durationElement = document.querySelector(".music-duration");

  audio.addEventListener("timeupdate", function () {
    currentTime = audio.currentTime;
    totalDuration = audio.duration;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(totalDuration / 60);
    const totalSeconds = Math.floor(totalDuration % 60);

    const formattedCurrentTime = `${currentMinutes}:${currentSeconds < 10 ? "0" : ""}${currentSeconds}`;
    const formattedTotalDuration = `${totalMinutes}:${totalSeconds < 10 ? "0" : ""}${totalSeconds}`;

    durationElement.textContent = `Duration: ${formattedCurrentTime} / ${formattedTotalDuration}`;
  });
}

function changeMusic(trackUrl) {
  const audio = document.getElementById("backgroundMusic");
  const musicSource = document.getElementById("musicSource");

  musicSource.src = trackUrl;
  audio.load();
  audio.play();

  updateMusicDuration();
}
