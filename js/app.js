"use strict"

/////  AUDIO PLAYER /////
document.querySelector('.icon-bottom-pause').addEventListener('click', function () {
   var x = document.getElementById('audio');
   x.play()
});
let currentTrack = 0;

const playList = [
   {
      duration: '3:16',
      title: 'Still Don’t Know',
      artist: 'Icona Pop',
      artCover: 'https://res.cloudinary.com/igorwys/image/upload/v1559049643/01-thumnail.jpg',
      src: '',  //TODO: insert audio
   },
   {
      duration: '2:35',
      title: 'I Love It',
      artist: 'Icona Pop',
      artCover: '', // TODO: insert art
      src: '',  //TODO: insert audio
   },
   {
      duration: '2:50',
      title: 'Girlfriend',
      artist: 'Icona Pop',
      artCover: '', // TODO: insert art
      src: '',  //TODO: insert audio
   },
   {
      duration: '3:07',
      title: 'We Got the World',
      artist: 'Icona Pop',
      artCover: '', // TODO: insert art
      src: '',  //TODO: insert audio
   },
   {
      duration: '3:24',
      title: 'Nights Like This',
      artist: 'Icona Pop',
      artCover: '', // TODO: insert art
      src: '',  //TODO: insert audio
   },
];

const renderTrack = (track, index) => {
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
   document.querySelector('.playlist-inner').insertAdjacentHTML('beforeend', markup);
};
playList.forEach((el, index) => {
   renderTrack(el, index);
})

//get id onclick
document.querySelectorAll('.playlist-track').forEach(item => {
   item.addEventListener('click', function(){

      console.log(this.dataset.index);

      /* TODO
      Update UI
      setnew currentTrack
      play selected track


      */
   });
});


/////  PLAYER ROTATE /////
let frontSide = true;
document.querySelectorAll('.flip').forEach(item => {


   item.addEventListener('click', function () {
      document.querySelector('.flip-player').classList.toggle('rotate');

     // Edge glitches fix
        if (frontSide) {
         setTimeout(()=> {
      document.querySelector('.playlist-inner').classList.toggle('edge-scroll');
         }, 400);
      } else {
      document.querySelector('.playlist-inner').classList.toggle('edge-scroll');

      }
      frontSide = !frontSide;

   });
});

/////  VOLUME TRACK /////
document.querySelector('.volume-range').oninput = function () {
   this.style.background = 'linear-gradient(to right, #fff 0%, #fff ' + this.value + '%, #ed5e74 ' + this.value + '%, #ed5e74 100%)';
   document.getElementById('audio').volume = this.value / 100;
};

/* TODO:
1. create array for all selectors
2. refactor listeners to like this
meaningfulSelector.addEventListener('click', RespondClick);
function RespondClick() {
    // do stuff
}  */
