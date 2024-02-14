<?php

/**
 * @file
 * Post update functions for TripalCultivateTheme.
 */

/**
 * Sets the default `base_primary_color` value of TripalCultivateTheme's theme settings.
 */
function trpcultivate_theme_post_update_add_trpcultivate_theme_primary_color() {
  \Drupal::configFactory()->getEditable('trpcultivate_theme.settings')
    ->set('base_primary_color', '#1b9ae4')
    ->save();
}
