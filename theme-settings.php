<?php declare(strict_types = 1);

/**
 * @file
 * Theme settings form for Tripal Cultivate Base Theme theme.
 */

use Drupal\Core\Form\FormState;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function trpcultivatetheme_form_system_theme_settings_alter(array &$form, FormState $form_state): void {

  $color_config = [
    'colors' => [
      'base_primary_color' => 'Primary base color',
    ],
    'schemes' => [
      'default' => [
        'label' => 'Tripal Cultivate Default',
        'colors' => [
          'base_primary_color' => '#3C8700',
        ],
      ],
      'grasslandgenomics' => [
        'label' => 'Grassland Genomics',
        'colors' => [
          'base_primary_color' => '#2c6743',
        ],
      ],
      'activatingcrops' => [
        'label' => 'Activating Crops',
        'colors' => [
          'base_primary_color' => '#4e7e46',
        ],
      ],
      'knowpulse' => [
        'label' => 'KnowPulse',
        'colors' => [
          'base_primary_color' => '#2F4153',
        ],
      ],
    ],
  ];

  $form['#attached']['drupalSettings']['olivero']['colorSchemes'] = $color_config['schemes'];

  // Update the drop down with the colour schemes defined above.
  $options = [];
  foreach ($color_config['schemes'] as $key => $details) {
    $options[$key] = $details['label'];
  }
  $form['olivero_settings']['olivero_utilities']['olivero_color_scheme']['color_scheme']['#options'] = $options;
}
