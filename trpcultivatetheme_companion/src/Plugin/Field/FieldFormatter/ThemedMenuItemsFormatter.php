<?php

namespace Drupal\trpcultivatetheme_companion\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Core\Url;
use Drupal\tripal\TripalField\Attribute\TripalFieldFormatter;
use Drupal\tripal_chado\TripalField\ChadoFormatterBase;

/**
 * Plugin implementation of themed menu item (hexagon tile).
 * 
 * Each hexagon tile menu item is in the following structure.
 * <div>
 *   <a href="menu target link">
 *     <i icon code snippet></i> Menu text title.
 *   </a>
 * </div>
 * 
 * @see css/theme/themed-menu.css
 * @see trpcultivatetheme_companion/trpcultivatetheme_companion.install
 */
#[TripalFieldFormatter(
  id: 'themed_menu_items_formatter',
  label: new TranslatableMarkup('Themed Menu Items Formatter'),
  description: new TranslatableMarkup('Theme menu items in hexagon tile'),
  field_types: ['link'],
)]
class ThemedMenuItemsFormatter extends ChadoFormatterBase {
    
  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    
    $menu_items = [];
    $default_icon = '<i class="fa-regular fa-circle-right"></i>';

    foreach ($items as $delta => $item) {
      $title = $item->title;

      // Each hex-tile comprises of the icon snippet markup and the title
      // text (in this order). Enforce order so that icon is always over
      // the title text and there is always an icon if not provided.
      $menu_title = trim(strip_tags($title));
      $menu_icon = str_replace($menu_title, '', $title) ?: $default_icon;
    
      $menu_items[$delta] = [
        '#type' => 'link',
        '#url' => Url::fromUri($item->uri),
        '#prefix' => '<div class="trpcultivatetheme-hex-tile">',
        '#suffix' => '</div>',
        '#attributes' => [
          'title' => $menu_title,
        ],
        '#title' => [
          '#markup' => $menu_icon . strtoupper($menu_title),
        ],
      ];
    }

    // Wrap all tiles in this container element.
    return [
      0 => [
        '#type' => 'container',
        '#attributes' => [
          'id' => 'trpcultivatetheme-themed-menu',
        ],
        'hex_tiles' => $menu_items,
      ],
    ];
  }
}