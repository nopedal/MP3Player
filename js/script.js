const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');
const albumArt = document.getElementById('album-art'); 
const trackTitle = document.getElementById('track-title'); 
const artistName = document.getElementById('artist-name'); 
const nextBtn = document.getElementById('next-btn'); 
const prevBtn = document.getElementById('prev-btn'); 
const background = document.getElementById('background');
const volumeSlider = document.getElementById('volume-slider');

let isPlaying = false;
let currentTrackIndex = 0;

// Artist backgrounds (add artist-specific backgrounds here)
const artistBackgrounds = {
    'Daft Punk': 'url(imgs/DPunk.jpg)',
    'Tame Impala': 'url(imgs/letithappen.jpg)'
    // Add more artist backgrounds as needed
};

// Track data
const tracks = [
    {
        title: "Instant Crush",
        artist: "Daft Punk",
        albumArt: "imgs/dp.jfif", 
        src: "music/Instant Crush - Daft Punk.mp3"
    },
    {
        title: "Let It Happen",
        artist: "Tame Impala",
        albumArt: "imgs/LIH.jfif", 
        src: "music/Let It Happen - Tame Impala.mp3"
    },
    {
        title: "Get Lucky",
        artist: "Daft Punk",
        albumArt: "imgs/dp.jfif",
        src: "music/Daft Punk - Get Lucky.mp3"
    }
];

// Load the current track
function loadTrack(index) {
    const track = tracks[index];
    trackTitle.textContent = track.title;
    artistName.textContent = track.artist;
    albumArt.src = track.albumArt;
    audioPlayer.src = track.src;
    
    // Reset progress bar and time
    progressBar.value = 0;
    currentTimeElem.textContent = "0:00";
    durationElem.textContent = "0:00";
    
    // Update background based on artist
    updateBackground(track.artist);

    // Preload metadata (like duration)
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationElem.textContent = formatTime(audioPlayer.duration);
    });
}

// Update background based on the artist
function updateBackground(artist) {
    if (artistBackgrounds[artist]) {
        background.style.backgroundImage = artistBackgrounds[artist];
    } else {
        background.style.backgroundImage = 'url(imgs/default-background.jpg)'; // Default background
    }
}

// Change volume based on slider input
volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value;
});

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
    const { currentTime, duration } = audioPlayer;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
    }

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

// When the audio ends, reset the play button and play the next track
audioPlayer.addEventListener('ended', () => {
    playIcon.textContent = 'play_arrow';
    isPlaying = false;
    nextTrack();  // Automatically play next track when current track ends
});

// Next track
nextBtn.addEventListener('click', nextTrack);

// Function to play the next track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    playIcon.textContent = 'pause'; // Ensure the pause icon is displayed when track is playing
    isPlaying = true;
}

// Previous track
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    playIcon.textContent = 'pause'; // Ensure the pause icon is displayed when track is playing
    isPlaying = true;
});

// Load the first track when the page loads
loadTrack(currentTrackIndex);
