<?php

namespace Drupal\Tests\trpcultivate_theme\Functional\Update;

use Drupal\FunctionalTests\Update\UpdatePathTestBase;

/**
 * Tests the update path for TripalCultivateTheme.
 *
 * @group Update
 */
class TripalCultivateThemePostUpdateTest extends UpdatePathTestBase {

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * {@inheritdoc}
   */
  protected function setDatabaseDumpFiles() {
    $this->databaseDumpFiles = [
      __DIR__ . '/../../../../../../modules/system/tests/fixtures/update/drupal-9.4.0.filled.standard.php.gz',
    ];
  }

  /**
   * Tests update hook setting base primary color.
   */
  public function testTripalCultivateThemePrimaryColorUpdate() {
    $config = $this->config('trpcultivate_theme.settings');
    $this->assertEmpty($config->get('base_primary_color'));

    // Run updates.
    $this->runUpdates();

    $config = $this->config('trpcultivate_theme.settings');
    $this->assertSame('#1b9ae4', $config->get('base_primary_color'));
  }

}
