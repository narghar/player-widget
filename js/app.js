/////  PLAYER ROTATE /////
let frontSide = true;
document.querySelectorAll(".flip").forEach(item => {


   item.addEventListener("click", function () {
      document.querySelector(".flip-player").classList.toggle("rotate");

     // Edge glitches fix

        if (frontSide) {
         setTimeout(function () {
      document.querySelector('.playlist-inner').classList.toggle("edge-scroll");
         }, 400);
      } else {
      document.querySelector('.playlist-inner').classList.toggle("edge-scroll");

      }
      frontSide = !frontSide;

   });
});

/////  VOLUME TRACK /////
document.querySelector(".volume-range").oninput = function () {
   this.style.background = 'linear-gradient(to right, #fff 0%, #fff ' + this.value + '%, #ed5e74 ' + this.value + '%, #ed5e74 100%)'
};
