$(document).ready(function() {
  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
 
  sync1.owlCarousel({
    center: true,
    loop: false,
    items: 1,
    responsiveRefreshRate : 200,
  });
 
  sync2.owlCarousel({
    center: true,
    loop: false,
    items: 3,
    margin: 10,
    responsiveRefreshRate : 100,
    afterInit: function(el) {
      el.find(".owl-item").eq(0).addClass("synced");
    }
  });

  document.getElementById("sync2").style.transform = "scale(0.2)";
  document.getElementById("sync2").style.opacity = "0";

  function switchToThumbnail() {
    console.log('Fingers spread: switch to thumbnail!');
  	document.getElementById("sync2").style.opacity = "1";
    document.getElementById("sync2").style.transform = "scale(1)";

    // Shrink and hide sync1.
    document.getElementById("sync1").style.transform = "scale(0.2)";
  	document.getElementById("sync1").style.opacity = "0";

    thumbnailMode();
  }

  function switchBack() {
	 console.log('Fist: switch back!');
    document.getElementById("sync1").style.opacity = "1";
    document.getElementById("sync1").style.transform = "scale(1)";
    
    // Shrink and hide sync1.
    document.getElementById("sync2").style.transform = "scale(0.2)";
  	document.getElementById("sync2").style.opacity = "0";

    slideMode();
  }

  function slideMode() {
    Myo.off('fist');
    Myo.off('fingers_spread');
    Myo.off('wave_in');
    Myo.off('wave_out');
    Myo.off('double_tap');

    Myo.on('fingers_spread', switchToThumbnail);
    Myo.on('wave_in', prevSlide);
    Myo.on('wave_out', nextSlide);
    Myo.on('double_tap', linkSelectMode);
  }

  function linkMode() {
    Myo.off('fist');
    Myo.off('fingers_spread');
    Myo.off('wave_in');
    Myo.off('wave_out');
    Myo.off('double_tap');

    Myo.on('fist', linkClose);
    Myo.on('wave_in', scrollUp);
    Myo.on('wave_out', scrollDown);
  }

  function thumbnailMode() {
    Myo.off('fist');
    Myo.off('fingers_spread');
    Myo.off('wave_in');
    Myo.off('wave_out');
    Myo.off('double_tap');

    Myo.on('fist', switchBack);
    Myo.on('wave_in', prevSlide);
    Myo.on('wave_out', nextSlide);
  }
 
  function linkSelectMode() {
    console.log('Double tap: link select mode!');
    var links = $('.owl-item.active a');
    // cycle through the links on the slide
    if (links.length === 0) return; // no links to select
    if (links.length > 1) {
        // focus the first link
        $(links[0]).addClass('focused-item');
        // bind the functions
        Myo.off('fist');
        Myo.off('fingers_spread');
        Myo.off('wave_in');
        Myo.off('wave_out');
        Myo.off('double_tap');

        Myo.on('double_tap', selectLink);
        Myo.on('wave_in', prevLink);
        Myo.on('wave_out', nextLink);
        Myo.on('fist', linkClose);
    } else {
      linkOpen(links[0].href);
    }
  }

  function prevLink() {
    var previous = $('.focused-item').prev('a');
    if (previous.length !== 0){
      $('.focused-item').removeClass('focused-item');
      previous.addClass('focused-item');
    }
  }
  function nextLink() {
    var next = $('.focused-item').next('a');
    if (next.length !== 0) {
        $('.focused-item').removeClass('focused-item');
        next.addClass('focused-item');
    }
  }
  function selectLink() {
    linkOpen($('.focused-item')[0].href);
  }
  
  function linkOpen(url) {
    console.log('Double tap: link open!');
    if (document.getElementById("link").src !== url) {
        document.getElementById("link").src = url;
    }
    document.getElementById("link").style.display = "block";
    linkMode();
  }

  function linkClose() {
    console.log('Fist: link close!');
    document.getElementById("link").style.display = "none";
    $('.focused-item').removeClass('focused-item');
    slideMode();
  }

  function scrollUp() {
    console.log('Wave in: scroll up!');
  }

  function scrollDown() {
    console.log('Wave out: scroll down!');
  }

  function prevSlide() {
    console.log('Wave in: previous slide!');
    owl1.trigger('prev.owl.carousel');
  }

  function nextSlide() {
    console.log('Wave out: next slide!');
    owl1.trigger('next.owl.carousel');
  }

  var owl1 = sync1.owlCarousel();
  var owl2 = sync2.owlCarousel();

  owl1.on('next.owl.carousel', function(e) {
    owl2.trigger('next.owl.carousel');
  });

  owl1.on('prev.owl.carousel', function(e) {
    owl2.trigger('prev.owl.carousel');
  });

  Myo.on('connected', function() {
    Myo.setLockingPolicy("none");
    slideMode();
  });

  Myo.connect();
});
