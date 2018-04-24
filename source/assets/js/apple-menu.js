(function() {
  var burger = document.querySelector(".burger-container"),
    header = document.querySelector(".masthead");

  burger.onclick = function() {
    header.classList.toggle("menu-opened");
  };
})();
