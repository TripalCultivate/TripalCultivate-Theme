ARG drupalversion='10.2.x-dev'
ARG phpversion='8.3'
FROM tripalproject/tripaldocker:drupal${drupalversion}-php${phpversion}-pgsql13-noChado

ARG chadoschema='testchado'

## Setup this container to show theme debugging settings
## such as the template suggestions in the html
## and rebuilding the theme cache everytime changes are detected.
WORKDIR /var/www/drupal/web/sites/default/
RUN cp default.services.yml services.yml \
  && sed -i '82s/debug: false/debug: true/' services.yml

## Change our working directory to the new theme
COPY . /var/www/drupal/web/themes/trpcultivatetheme
WORKDIR /var/www/drupal/web/themes/trpcultivatetheme

## Complete Tripal installation and enable the theme.
RUN service postgresql restart \
  && drush trp-install-chado --schema-name=${chadoschema} \
  && drush trp-prep-chado --schema-name=${chadoschema} \
  && drush tripal:trp-import-types --username=drupaladmin --collection_id=general_chado \
  && drush tripal:trp-import-types --username=drupaladmin --collection_id=germplasm_chado \
  && drush theme:enable trpcultivatetheme --yes \
  && drush config-set system.theme default trpcultivatetheme --yes \
  && drush cr
