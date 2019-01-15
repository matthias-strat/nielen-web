$(function() {
  var percent = 0,
      time = 6,
      tick,
      isPause,
      bar = $('.carousel-progress-bar'),
      crsl = $('#myCarousel');

  function carouselProgressBar() {
    bar.css({width: percent+'%'});
    percent += 1/time;
    if (percent > 100) {
      percent = 0;
      crsl.carousel('next');
    }
  }

  function carouselProgressBarStart() {
    tick = setInterval(carouselProgressBar, 10);
  }

  crsl.carousel({
    interval: false,
    pause: true
  }).on('slid.bs.carousel', function() {});

  crsl.hover(function() {
    clearInterval(tick);
  }, function() {
    carouselProgressBarStart();
  });

  carouselProgressBarStart();
})