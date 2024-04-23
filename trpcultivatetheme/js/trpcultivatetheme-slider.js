/**
 * @file
 * Tile slider behaviors.
 */

(function ($, Drupal, drupalSettings) {
  var initialized;
  var autoSlider;

  Drupal.behaviors.tripalCultivateThemeSlider = {
    attach: function(context, settings) {
      loadSlider();
    }
  }
  
  /**
   * Initialize slider.
   */
  function loadSlider() {
    if (!initialized) {
      initialized = true;

      // Inspect available tiles/slide in large half tile region.
      // Based on the number of slide, append slider controls (bullets)
      // when there is at least 2 slides, otherwise slide will be a static slide.

      // Immediate child div in the selector is the the base theme's markup for region.
      var tileContainer = $('#tripalcultivate-theme-tiles-slider-slides > div');
      // Slides that contains the tile element and other markup applied by the base theme.
      var tiles = tileContainer.children('div');

      if (tiles.length > 0) {
        // A tile is present. Load the first tile (index 0).
        // Other tiles in the stack are set to no display.
        // @see block.html.twig
        tiles.eq(0).fadeIn();

        // Depending on the number of slide, provide a slider control bullets
        // when there is at least 2 slides.
        if (tiles.length > 1) {
          // Bullets container.
          var bulletContainer = $('.tripalcultivate-theme-tiles-slider-bullets');
          
          for(var i = 0; i < tiles.length; i++) {
            // Set the first bullet to active bullet to correspond to the first
            // slide on page load.
            var isActive = (i == 0) ? 'tripalcultivate-theme-tiles-slider-bullets-active' : '';
            bulletContainer.append('<div class="' + isActive + '">&nbsp;</div>');
          }

          // Enable slide bullets.
          bulletContainer.fadeIn();
          
          // Begin slider.
          autoSlider = setInterval(loadSliderSlide, 5000);

          // Event listeners. 
          // Attach event listener to tiles to pause slider on mouse over.
          tileContainer.on('mouseover', 'div', stopSliderSlide);
          
          // Resume slider from the last slide selected.
          tileContainer.on('mouseleave', 'div', startSliderSlide);

          // Resume slider from last slide selected using slider bullets.
          bulletContainer.on('mouseleave', 'div', startSliderSlide);

          // Switch slide when bullet is clicked.
          bulletContainer.on('click', 'div', function() {
            // Get the index number of the bullet clicked and
            // load the corresponding slide.
            var slideIndex = $(this).index();
            
            loadSliderSlide(slideIndex);
            stopSliderSlide();
          });
        } 

        // else, no bullets needed.
      }
    }
  }

  /**
   * Stop slider.
   */
  function stopSliderSlide() {
    if (autoSlider) {
      clearInterval(autoSlider);
    }
  }

  /**
   * Start slider.
   */
  function startSliderSlide() {
    if (autoSlider) {
      // To ensure precise timing, clear any previous time interval.
      clearInterval(autoSlider); 
      autoSlider = setInterval(loadSliderSlide, 5000);
    }
  }

  /**
   * Load a specific slide.
   * 
   * @param slideIndex
   *   Slide index number.
   */
  function loadSliderSlide(slideIndex = -1) {
     // Immediate child div in the selector is the the base theme's markup for region.
     var tileContainer = $('#tripalcultivate-theme-tiles-slider-slides > div');
     // Slides that contains the tile element and other markup applied by the base theme.
     var tiles = tileContainer.children('div');

    // Active class name.
    var isActive = 'tripalcultivate-theme-tiles-slider-bullets-active';
    
    // Find the current slide by inspecting the slide bullets for
    // active class name in element class list.
    var bulletContainer = $('.tripalcultivate-theme-tiles-slider-bullets');
    var currentSlide = bulletContainer.children('.' + isActive).index();
    
    // If specific slide was provided (bullet clicked) otherwise get the next slide.
    var nextIndex;

    if (slideIndex < 0) {
      nextIndex = currentSlide + 1;
      if (nextIndex >= tiles.length) {
        // Reset index back to the first slide after
        // reaching the last slide in the stack.
        nextIndex = 0;
      }
    }
    else {
      nextIndex = slideIndex;
    }

    // Switch slides.
    tiles.eq(currentSlide).hide();
    tiles.eq(nextIndex).fadeIn('slow');

    // Update bullets.
    bulletContainer.children('div')
      .eq(currentSlide).removeClass(isActive);
    bulletContainer.children('div')
      .eq(nextIndex).addClass(isActive);
  }
} (jQuery, Drupal, drupalSettings));