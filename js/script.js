const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');
let isPlaying = false;

// Play or pause the audio
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.textContent = 'play_arrow'; // Change to play icon
    } else {
        audioPlayer.play();
        playIcon.textContent = 'pause'; // Change to pause icon
    }
    isPlaying = !isPlaying;
});

// Update progress bar and current time
audioPlayer.addEventListener('timeupdate', () => {
    // Update progress bar
    const { currentTime, duration } = audioPlayer;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
    }

    // Update current time and duration display
    currentTimeElem.textContent = formatTime(currentTime);
    if (duration) {
        durationElem.textContent = formatTime(duration);
    }
});

// Seek when progress bar is changed
progressBar.addEventListener('input', (e) => {
    const { value } = e.target;
    const seekTime = (audioPlayer.duration / 100) * value;
    audioPlayer.currentTime = seekTime;
});

// Format time in mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// When the audio ends, reset the play button
audioPlayer.addEventListener('ended', () => {
    playIcon.textContent = 'play_arrow'; // Reset to play icon
    isPlaying = false;
});
