(function ($) {
  'use strict';

  $(function () {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var $carousel = $('.js-hero-carousel');

    if (!$carousel.length) return;

    var owl = $carousel.owlCarousel({
      items: 1,
      loop: true,
      nav: false,
      dots: true,
      dotsClass: 'hero__dots js-hero-dots',
      dotClass: 'hero__dot',
      autoplay: !prefersReducedMotion,
      autoplayTimeout: 6500,
      autoplayHoverPause: true,
      smartSpeed: prefersReducedMotion ? 0 : 800,
      slideTransition: prefersReducedMotion ? 'linear' : 'ease',
      onInitialized: updateAccessibility,
      onChanged: updateAccessibility
    });

    $('.js-hero-prev').on('click keydown', function (event) {
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      $carousel.trigger('prev.owl.carousel');
    });

    $('.js-hero-next').on('click keydown', function (event) {
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      $carousel.trigger('next.owl.carousel');
    });

    function updateAccessibility(event) {
      var carousel = event.relatedTarget;
      var totalSlides = event.item.count;
      var currentIndex = carousel.relative(event.item.index) + 1;
      var $slides = $carousel.find('.hero__slide');
      var $dots = $('.js-hero-dots').find('.hero__dot');

      $slides.each(function (index) {
        var $slide = $(this);
        var label = 'Diapositiva ' + (index + 1) + ' de ' + totalSlides + ': ' + $slide.find('.hero__title').text().trim();

        $slide.attr({
          'role': 'group',
          'aria-label': label,
          'tabindex': index + 1 === currentIndex ? '0' : '-1',
          'aria-hidden': index + 1 !== currentIndex
        });
      });

      $dots.attr('aria-current', 'false');
      $dots.each(function (index) {
        var label = 'Ir a la diapositiva ' + (index + 1) + ' de ' + totalSlides;
        $(this).attr('aria-label', label);
      });

      $dots.eq(currentIndex - 1).attr('aria-current', 'true');
    }
  });
})(jQuery);
