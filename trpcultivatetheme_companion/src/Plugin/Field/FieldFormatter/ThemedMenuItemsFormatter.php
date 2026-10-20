<?php

namespace Drupal\trpcultivatetheme_companion\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Core\Url;
use Drupal\tripal\TripalField\Attribute\TripalFieldFormatter;
use Drupal\tripal_chado\TripalField\ChadoFormatterBase;

/**
 * Plugin implementation of default Tripal stock formatter.
 */
#[TripalFieldFormatter(
  id: 'themed_menu_items_formatter',
  label: new TranslatableMarkup('Themed Menu Items Formatter'),
  description: new TranslatableMarkup('Theme menu items'),
  field_types: ['link'],
)]
class ThemedMenuItemsFormatter extends ChadoFormatterBase {
    
  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    
    $menu_items = [];

    foreach ($items as $delta => $item) {
      // Menu title comprises of the icon snippet and the title text (in this order).
      // Enforce so that the icon is always over the title text.
      $title = $item->title;
      $menu_title = trim(strip_tags($title));
      $menu_icon = str_replace($menu_title, '', $title);
    
      $menu_items[$delta] = [
        '#type' => 'link',
        '#title' => $menu_icon . $menu_title,
        '#url' => Url::fromUri($item->uri),
        '#prefix' => '<div class="trpcultivatetheme-menu-item">',
        '#suffix' => '</div>'
      ];
    }

    $elements['themed_menu'] = [
      '#type' => 'container',
      '#attributes' => [
        'id' => 'trpcultivatetheme-themed-menu-items',
      ],
      'menu_items' => $menu_items,
    ];

    return $elements;
  }
}