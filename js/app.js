/////  PLAYER ROTATE /////
document.querySelectorAll(".flip").forEach(item => {
   item.addEventListener("click", function () {
      document.querySelector(".flip-player").classList.toggle("rotate");

   });
});

/////  VOLUME TRACK /////
document.querySelector(".volume-range").oninput = function() {
   this.style.background = 'linear-gradient(to right, #fff 0%, #fff '+this.value +'%, #ed5e74 ' + this.value + '%, #ed5e74 100%)'
 };
