
/**
 * @file
 * Tile slider behaviors.
 */

(function ($, Drupal, drupalSettings) {
  var initialized;
  
  /**
   * Function setup slider in large half tile.
   */
  function loadSlider() {
    if (!initialized) {
      initialized = true;
      
      // Reference key slider element containers:
      var sliderSlides  = $('#tripalcultivate-theme-tiles-slider-slides');

      // Count the number of half tiles present.
      var bulletCount   = $('.tripalcultivate-theme-tiles-large-half').length;

      // If there is a single tile present, render the tile a is and
      // omit bullet controls. Otherwise, prepare bullet per tile.
      if (bulletCount > 0) {
        if (bulletCount == 1) {
          // One slide.
        
        }
        else {
          // At least 2 slides.
          placeSlideBullets(bulletCount);
        }
      }
    }
  }

  /**
   * Append bullet element per slide.
   * 
   * @param count
   *   Number of bullet element to add. 
   */
  function placeSlideBullets(count) {
    var container =  $('.tripalcultivate-theme-tiles-slider-bullets');

    for(var i = 0; i < count - 1; i++) {
      // Set the first bullet to active bullet to correspond to the first
      // slide on page load.
      var isActive = (i == 0) ? 'tripalcultivate-theme-tiles-slider-bullets-active' : 'bullets';
      container.append('<div class="' + isActive + '">&nbsp;</div>');
    }

    // When bullets are created, enable controls.
    container.fadeIn();
  }

  Drupal.behaviors.stageAccordion = {
    attach: function(context, settings) {
      loadSlider();
    }
  }
 } (jQuery, Drupal, drupalSettings));