$(document).ready(function () {
  $(".sh-burger").click(function () {
    $(this).toggleClass("sh-burger--active");
    $(".sh-menu-wrap").toggleClass("sh-menu-wrap--open");
    $(".header-bottom").toggleClass("active");
    document.body.style.overflow = document.querySelector('.header-bottom').classList.contains('active') ? "hidden" : ""
  });
});
