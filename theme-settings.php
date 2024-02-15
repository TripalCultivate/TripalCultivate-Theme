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

  $form['trpcultivatetheme'] = [
    '#type' => 'details',
    '#title' => t('Tripal Cultivate Base Theme'),
    '#open' => TRUE,
  ];

  $form['trpcultivatetheme']['example'] = [
    '#type' => 'textfield',
    '#title' => t('Example'),
    '#default_value' => theme_get_setting('example'),
  ];

}
