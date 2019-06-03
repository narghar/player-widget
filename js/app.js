document.querySelectorAll(".flip").forEach(item => {
  item.addEventListener("click", function(){
     document.querySelector(".flip-player").classList.toggle("rotate");

  });
  });
