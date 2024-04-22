/**
 * @file
 * Attach a color picker to background color field.
 */

(function ($, Drupal, drupalSettings) {
  var initialized;
  
  Drupal.behaviors.tripalCultivateThemeColorPicker = {
    attach: function(context, settings) {
      initializeColorPicker();
    }
  }
  
  /**
   * Initialize color picker.
   */
  function initializeColorPicker() {
    if (!initialized) {
      initialized = true;

      // Place a color picker button that will launch a color picker
      // window to allow user to select a color instead of typing a hex code.
  
      // The Block Content edit page contains bgcolor field with the label
      // Tile Background Color. Locate the field bgcolor using this label.
      // @see install hook.
      
      var fldLabelBgColor = $('label:contains("Tile Background Colour")');
      if (fldLabelBgColor.length > 0) {
        // Get the field element this field label is for.
        
        var fldBgColor = fldLabelBgColor.siblings('input');
        if (fldBgColor.length > 0) {
          // Create an HTML 5 color picker by defining an input element with the
          // type attribute set to color.
          var colorPicker = $('<input type="color" title="Color Picker" />');
          
          // Set the default value to black #000000 if the field has no value
          // previously set;
          var defValue = fldBgColor.val() ? fldBgColor.val() : '#000000'; 
          colorPicker.val(defValue);
          
          // Append the color picker button next the tile background color field.
          fldBgColor.after(colorPicker);

          // Attach an event listener to the color picker to transfer the hex code equivalent
          // of color selection into the tile background color field.
          $(document).on('change', 'input[type="color"]', function() {
            var hexVal = $(this).val();

            if (hexVal.length > 0) {
              fldBgColor.val(hexVal.toUpperCase());
            }
          });

          // Double check field for manually entered hex value.
          fldBgColor
            .on('blur', function() {
              var hexRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
              var fldVal = $(this).val();

              if (fldVal.length > 0 && !hexRegex.test(fldVal)) {
                alert('Invalid hex color code value. Please enter a valid hex color code or use the color picker.');
              }
            })
            .on('focus', function() {
              $(this).select();
            });
        }
      }
    }
  }
} (jQuery, Drupal, drupalSettings));