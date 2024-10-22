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

let isPlaying = false;
let currentTrackIndex = 0;

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
        albumArt: "imgs/LIH.jfif", // 
        src: "music/Let It Happen - Tame Impala.mp3" // 
    },
    {
        title: "Get Lucky",
        artist: "Daft Punk",
        albumArt: "imgs/dp.jfif",
        src: "music/Daft Punk - Get Lucky.mp3"
    }
    // Add more tracks as needed
];

// Load the current track
function loadTrack(index) {
    const track = tracks[index];
    trackTitle.textContent = track.title;
    artistName.textContent = track.artist;
    albumArt.src = track.albumArt; // Update the album art
    audioPlayer.src = track.src; // Update the audio source
}

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
    // Automatically load the next track
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Loop back to the first track
    loadTrack(currentTrackIndex);
    audioPlayer.play(); // Play the next track automatically
});

// Next track
nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Loop to first track if at the end
    loadTrack(currentTrackIndex);
    audioPlayer.play(); // Play the next track automatically
});

// Previous track
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Loop to last track if at the start
    loadTrack(currentTrackIndex);
    audioPlayer.play(); // Play the previous track automatically
});

// Load the first track when the page loads
loadTrack(currentTrackIndex);
