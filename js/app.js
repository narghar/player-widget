"use strict";


/////  DATA /////

const data = [{
      duration: '1:40',
      title: 'Good God',
      artist: 'Piano Theme',
      artCover: 'https://res.cloudinary.com/igorwys/image/upload/v1559049643/01-thumnail.jpg',
      src: 'audio/01.mp3',
   },
   {
      duration: '1:20',
      title: 'Ambisax',
      artist: 'Wowa',
      artCover: 'img/02.jpg',
      src: 'audio/02.mp3',
   },
   {
      duration: '1:19',
      title: 'Jazz-Mezzo',
      artist: 'Wowa',
      artCover: 'img/03.jpg',
      src: 'audio/03.mp3',
   },
   {
      duration: '2:10',
      title: 'Palmtrees',
      artist: 'Fresh HipHop',
      artCover: 'img/04.jpg',
      src: 'audio/04.mp3',
   },
   {
      duration: '2:35',
      title: 'Runs',
      artist: 'Triphop',
      artCover: 'img/05.jpg',
      src: 'audio/05.mp3',
   },
   {
      duration: '1:58',
      title: 'Easy',
      artist: 'Wowa',
      artCover: 'img/06.png',
      src: 'audio/06.mp3',
   },
   {
      duration: '1:45',
      title: 'Trumpets',
      artist: 'In Your Ears',
      artCover: 'img/07.jpg',
      src: 'audio/07.mp3',
   },
   {
      duration: '0:55',
      title: 'Blue Sky',
      artist: 'Free',
      artCover: 'img/08.jpg',
      src: 'audio/08.mp3',
   },
];

let playList = data;

/////  SELECTORS /////
const audio = document.getElementById('audio');
const playButton = document.querySelector('.icon-bottom-play');
const playPauseIcon = document.getElementById('play-pause');
const playlistInner = document.querySelector('.playlist-inner');
const volumeControl = document.querySelector('.volume-range');
const artistName = document.querySelector('.player-artistName');
const songTitle = document.querySelector('.player-songTitle');
const nextButton = document.querySelector('.icon-bottom-next');
const prevButton = document.querySelector('.icon-bottom-prev');
const shuffleButton = document.querySelector('.icon-top-shuffle');
const image = document.querySelector('.player-cover');
let currentTrack = 0;
let frontSide = true;
let shuffleState = false;
audio.volume = 0.75;


/////  EVENTS /////
playButton.addEventListener('click', handlePlay);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);
shuffleButton.addEventListener('click', shuffleTracks);


async function playAudio() {
   try {
      await audio.play();
      playPauseIcon.setAttribute('xlink:href', 'img/sprite.svg#icon-pause');
   } catch (err) {
      console.log('Play error');
   }
}


function handlePlay() {
   if (audio.paused) {
      playAudio();
   } else {
      audio.pause();
      playPauseIcon.setAttribute('xlink:href', 'img/sprite.svg#icon-play');
   }
}


function renderPlaylist(array) {
   array.forEach((track, index) => {
      const markup = `
         <div class="playlist-item">
            <div data-index="${index}" class="playlist-track flip">
               <span class="playlist-track-duration">${track.duration}</span>
               <span class="playlist-track-artist">${track.artist}</span>
               <h2 class="playlist-track-title">${track.title}</h2>
            </div>
            <div class="playlist-icons">
               <svg class="playlist-icons-svgShare">
                  <use xlink:href="img/sprite.svg#icon-share"></use>
               </svg>
               <svg class="playlist-icons-svgFavorite">
                  <use xlink:href="img/sprite.svg#icon-favorite"></use>
               </svg>
            </div>
         </div>
      `;
      playlistInner.insertAdjacentHTML('beforeend', markup);
   });

   document.querySelectorAll('.playlist-track').forEach(item => {
      item.addEventListener('click', playSelected);
   });
};


function playSelected() {
   currentTrack = this.dataset.index;
   updateUI(currentTrack);
   playAudio();
};


function updateUI(currentTrack) {
   artistName.textContent = playList[currentTrack].artist;
   songTitle.textContent = playList[currentTrack].title;
   audio.setAttribute('src', playList[currentTrack].src);
   image.setAttribute('src', playList[currentTrack].artCover);
}


function nextTrack() {
   currentTrack < playList.length - 1 ? currentTrack++ : currentTrack = 0;

   if (audio.paused) {
      updateUI(currentTrack);
   } else {
      updateUI(currentTrack);
      playAudio();
   }
}


function prevTrack() {
   currentTrack > 0 ? currentTrack-- : currentTrack = playList.length - 1;
   if (audio.paused) {
      updateUI(currentTrack);
   } else {
      updateUI(currentTrack);
      playAudio();
   }
}


/////  PLAYER ROTATE /////
function rotate() {
   document.querySelectorAll('.flip').forEach(item => {
      item.addEventListener('click', function () {

         document.querySelector('.flip-player').classList.toggle('rotate');

         // Edge glitches fix
         if (frontSide) {
            setTimeout(() => {
               playlistInner.classList.toggle('edge-scroll');
            }, 400);
         } else {
            playlistInner.classList.toggle('edge-scroll');

         }
         frontSide = !frontSide;

      });
   });
}


/////  VOLUME CONTROL /////
function changeVolume() {
   volumeControl.oninput = function () {
      this.style.background = 'linear-gradient(to right, #fff 0%, #fff ' + this.value + '%, #ed5e74 ' + this.value + '%, #ed5e74 100%)';
      audio.volume = this.value / 100;
   };
}


function lastVisibleTrack() {
   let playListItem = document.querySelectorAll('.playlist-item');
   let offset = 12;
   playListItem[4].style.opacity = 0.2;
   playlistInner.addEventListener('scroll', function () {
      var hide = playlistInner.offsetHeight + playlistInner.scrollTop - offset;
      playListItem.forEach(item => {
         if (item.offsetTop > hide) {
            item.style.opacity = '0.2';
         } else {
            item.style.opacity = '1';
         }
      })
   });
}


function shuffleTracks() {

   if (!shuffleState) {
      playList = shuffle(playList);
      shuffleState = true;
   } else {
      playList = data;
      shuffleState = false;
   }
   playlistInner.textContent = '';
   rotate();
   init(playList);
};


function shuffle(array) {
   const cloneArray = [...array];
   for (let i = cloneArray.length - 1; i > 0; i--) {
      // random index from 0 to i
      let j = Math.floor(Math.random() * (i + 1));
      // swap elements
      [cloneArray[i], cloneArray[j]] = [cloneArray[j], cloneArray[i]];
   }
   return (cloneArray);
}


function init(array = playList) {
   renderPlaylist(array);
   rotate();
   lastVisibleTrack();
   updateUI(currentTrack);
   changeVolume();
}
init();
