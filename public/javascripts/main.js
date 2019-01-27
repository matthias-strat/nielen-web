$(function() {
  var percent = 0,
      time = 6,
      tick,
      isPause,
      bar = $('.carousel-progress-bar'),
      crsl = $('#myCarousel'),
      running = false;

  function carouselProgressBar() {
    bar.css({width: percent+'%'});
    percent += 1/time;
    if (percent > 100) {
      percent = 0;
      crsl.carousel('next');
    }
  }

  function carouselProgressBarStart() {
    if (!running) {
      running = true;
      tick = setInterval(carouselProgressBar, 10);
    }
  }

  crsl.carousel({
    interval: false,
    pause: true
  }).on('slid.bs.carousel', function() {});

  crsl.hover(function() {
    clearInterval(tick);
    running = false;
  }, function() {
    carouselProgressBarStart();
  });

  carouselProgressBarStart();
  $(window).enllax();
  $(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });

})