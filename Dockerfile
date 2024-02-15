ARG drupalversion='10.2.x-dev'
ARG phpversion='8.3'
FROM tripalproject/tripaldocker:drupal${drupalversion}-php${phpversion}-pgsql13-noChado

ARG chadoschema='testchado'
COPY . /var/www/drupal/web/themes/trpcultivatetheme

## This theme uses nodejs and yarn to manage css compilation
## As such we install that here.
## RUN apt-get update \
##   && apt-get install -q -y nodejs npm \
##   && npm install -g yarn

WORKDIR /var/www/drupal/web/themes/trpcultivatetheme

## Complete Tripal installation and enable the theme.
RUN service postgresql restart \
  && drush trp-install-chado --schema-name=${chadoschema} \
  && drush trp-prep-chado --schema-name=${chadoschema} \
  && drush tripal:trp-import-types --username=drupaladmin --collection_id=general_chado \
  && drush tripal:trp-import-types --username=drupaladmin --collection_id=germplasm_chado \
  && drush tripal:theme trpcultivatetheme --yes \
  && drush cr
