ARG drupalversion='10.2.x-dev'
ARG phpversion='8.3'
ARG pgsqlversion='16'
FROM knowpulse/tripalcultivate:base-notheme-drupal${drupalversion}-php${phpversion}-pgsql${pgsqlversion}

## Setup this container to show theme debugging settings
## such as the template suggestions in the html
## and rebuilding the theme cache everytime changes are detected.
WORKDIR /var/www/drupal/web/sites/default/
RUN cp default.services.yml services.yml \
  && sed -i '82s/debug: false/debug: true/' services.yml

## Change our working directory to the new theme
COPY ./trpcultivatetheme /var/www/drupal/web/themes/trpcultivatetheme
WORKDIR /var/www/drupal/web/themes/trpcultivatetheme

## Complete Tripal installation and enable the theme.
RUN service postgresql restart \
  && drush theme:enable trpcultivatetheme --yes \
  && drush config-set system.theme default trpcultivatetheme \
  && drush config:set system.site name "Tripal Cultivate THEME DEV Docker" \
  && drush cr
