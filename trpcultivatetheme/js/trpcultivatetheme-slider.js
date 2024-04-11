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
          placeSliderBullets(tiles.length);

          // Start slider to cycle through the stack of slides.
          // Starting at second slide - index 1;
          var slideIndex = 1;
          autoSlider = setInterval(function() {
            loadSliderSlide(slideIndex);
            // Next.
            slideIndex++;

            if (slideIndex >= tiles.length) {
              // Reset index back to the first slide after
              // reaching the last slide in the stack.
              slideIndex = 0;
            }
          }, 5000);

          // Attach event listener to tiles to pause slider on mouse over.
          tileContainer.on('mouseover', 'div', function() { clearInterval(autoSlider); });
        } 

        // else, no bullets needed.
      }
    }
  }

  /**
   * Append tile region with slider navigation bullets.
   * 
   * @param bulletCount
   *   Number of bullet elements to create based on the number of
   *   slide elements in the slide container.
   */
  function placeSliderBullets(count) {
    if (count > 1) {
      // Bullets container.
      var container =  $('.tripalcultivate-theme-tiles-slider-bullets');

      for(var i = 0; i < count; i++) {
        // Set the first bullet to active bullet to correspond to the first
        // slide on page load.
        var isActive = (i == 0) ? 'tripalcultivate-theme-tiles-slider-bullets-active' : '';
        container.append('<div class="' + isActive + '">&nbsp;</div>');
      }

      // Attach event listener to bullets.
      container.on('click', 'div', function() {
        // Get the index number of the bullet clicked and
        // load the corresponding slide.
        var slideIndex = $(this).index();
        loadSliderSlide(slideIndex);
      });

      // Enable slide bullets.
      container.fadeIn();
    }
  }

  /**
   * Load a specific slide.
   * 
   * @param slideIndex
   *   Slide index number.
   */
  function loadSliderSlide(slideIndex) {
    // Active class name.
    var isActive = 'tripalcultivate-theme-tiles-slider-bullets-active';
    
    // Find the current slide by inspecting the slide bullets for
    // active class name in element class list.
    var container = $('.tripalcultivate-theme-tiles-slider-bullets');
    var currentSlide = container.children('.' + isActive).index();
    
    // Switch slides.
    // Child div in the selector is the the base theme's markup for region.
    var tileContainer = $('#tripalcultivate-theme-tiles-slider-slides > div');
    var tiles = tileContainer.children('div');

    tiles.eq(currentSlide).hide();
    tiles.eq(slideIndex).fadeIn('slow');

    // Update bullets.
    container.children('div')
      .eq(currentSlide).removeClass(isActive);
    container.children('div')
      .eq(slideIndex).addClass(isActive);
  }

} (jQuery, Drupal, drupalSettings));