const songs = [
    {
        title: "Unstoppable",
        artist: "Sia",
        file: "assets/songs/Unstoppable.mp3",
        image: "assets/thumbnails/Unstoppable.jpeg",
    },
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        file: "assets/songs/Shape-of-You.mp3",
        image: "assets/thumbnails/Shapeofyou.jpeg",
    },
    {
        title: "Despacito",
        artist: "Luis Fonsi",
        file: "assets/songs/Despacito.mp3",
        image: "assets/thumbnails/Despacito.jpeg",
    },
];

let currentSongIndex = 0;

function updateSongInfo() {
    const songTitle = document.getElementById("songTitle");
    const songArtist = document.getElementById("songArtist");
    const songImage = document.querySelector(".song-img");
    songTitle.textContent = songs[currentSongIndex].title;
    songArtist.textContent = songs[currentSongIndex].artist;
    songImage.src = songs[currentSongIndex].image;
}

function playSong(index) {
    const song = document.getElementById("song");
    const ctrlIcon = document.getElementById("ctrlIcon");
    song.src = songs[index].file;
    song.load();
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
    currentSongIndex = index;
    updateSongInfo();
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
}

function playPrevious() {
    currentSongIndex =
        (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
}

function addSong(title, artist, file, image) {
    songs.push({ title, artist, file, image });
    updatePlaylist();
}

function togglePlaylist() {
    var playlistContainer = document.getElementById("playlistContainer");
    var musicPlayer = document.querySelector(".musicplayer");
    if (playlistContainer.style.display === "none" || playlistContainer.style.display === "") {
        playlistContainer.style.display = "block";
        musicPlayer.style.display = "none";
    } 
    else {
        playlistContainer.style.display = "none";
        musicPlayer.style.display = "block";
    }
}

function updatePlaylist() {
    const playlist = document.getElementById("playlist");
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${song.title} - ${song.artist}`;
        listItem.addEventListener("click", () => playSong(index));
        playlist.appendChild(listItem);
    });
}

updatePlaylist();
updateSongInfo();

function goToMusicPlayer() {
    var home = document.getElementById("home");
    var musicPlayer = document.querySelector(".musicplayer");
    var playlistContainer = document.getElementById("playlistContainer");
    home.style.display = "none";
    musicPlayer.style.display = "block";
    playlistContainer.style.display = "none";

}

function goToHome() {
    var home = document.getElementById("home");
    var musicPlayer = document.querySelector(".musicplayer");
    musicPlayer.style.display = "none";
    home.style.display = "block";
}

let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

progress.addEventListener("input", function () {
    song.currentTime = progress.value;
});

progress.addEventListener("change", function () {
    song.play();
});

song.addEventListener("timeupdate", function () {
    progress.value = song.currentTime;
});
