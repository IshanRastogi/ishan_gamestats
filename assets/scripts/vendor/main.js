
$(window).scroll(function() {
  if( $(this).scrollTop() > 760 ) {
    $(".main-nav").addClass("scrolled");
  } else {
    $(".main-nav").removeClass("scrolled");
  }

  if( $(this).scrollTop() > 948 ) {
    $(".thebook").addClass("onscroll");
  } else {
    $(".thebook").removeClass("onscroll");
  }

  if( $(this).scrollTop() > 1919 ) {
  	$(".thebook").removeClass("onscroll");
    $(".thelessons").addClass("onscroll");
  } else {
    $(".thelessons").removeClass("onscroll");
  }

  if( $(this).scrollTop() > 3284 ) {
  	$(".thelessons").removeClass("onscroll");
    $(".theauthors").addClass("onscroll");
  } else {
    $(".theauthors").removeClass("onscroll");
  }


});