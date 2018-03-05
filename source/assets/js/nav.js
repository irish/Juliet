jQuery(document).ready(function($) {
  //open-close submenu on mobile
  $(".ip-main-nav").on("click", function(event) {
    if ($(event.target).is(".ip-main-nav"))
      $(this)
        .children("ul")
        .toggleClass("is-visible");
  });
});
