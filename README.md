# Tripal Cultivate Base Theme

<img src="https://github.com/TripalCultivate/TripalCultivate-Theme/assets/1566301/8f58c97b-9a81-4790-9e01-960c228ee704" width="480" height="360" align="right">

This theme is intended to provide a base for developing custom themes for project-specific or research group specific Tripal sites using the Tripal Cultivate package of modules. We request that you do not use this theme untouched but rather as a base to develop a custom look for your project or group. At a minimum you need to choose a unique colour for your site, a logo and a header image.

<br clear="right"/>

## Development

### Docker

As you may have noticed there is a dockerfile in this repository. The recommended way to contribute to this theme is the same as the recommendation for core development: use docker please :-) 

```bash
git clone https://github.com/TripalCultivate/TripalCultivate-Theme trpcultivatetheme
cd trpcultivatetheme
docker build --build-arg drupalversion=10.2.x-dev --build-arg phpversion=8.3 --tag=trpcultivate-theme:4x ./
docker run --publish=80:80 -tid --name=theme4x --volume=`pwd`:/var/www/drupal/web/themes/trpcultivatetheme trpcultivate-theme:4x
docker exec theme4x service postgresql restart
```

This docker image/container will have a fully functioning Tripal 4 site based on TripalDocker built using the specified version of Drupal and PHP. [For more details about TripalDocker see the official docs](https://tripaldoc.readthedocs.io/en/latest/install/docker.html#usage).

### Olivero as a Base Theme

This theme uses the core Olivero theme as a base theme. As of 2024Feb this is not technically recommended as the markup of Olivero is not fixed. You can see the current status / recommendation on using Oliverio as a subtheme in [Drupal Issue #3190946 - [META] Subtheming Olivero](https://www.drupal.org/project/drupal/issues/3190946). 

As you can see in [comment #19 of that issue](https://www.drupal.org/project/drupal/issues/3190946#comment-15443899), we've decided to use Olivero as a base theme despite the recommendation not to. This is because we believe that the effort to update this theme with any markup changes in Olivero is likely less work then the other options we considered. If we had copied Oliverio and renamed it for our own purposes as suggested, then it would have been a lot of work to re-incorporate any updates/fixes made to Olivero in core. This is because with the names of all the files changed, we could not do a direct comparison of files or git merge. The theme landscape at the beginning of 2024 is still very sparse for good Drupal themes so we couldn't just use a more stable theme as a base. There are a number of Bootstrap base themes available but the community has fractured quite a bit causing it to be confusing to know which one to use for long term sustainability. Furthermore, we did not like the base themeing provided by these base themes.
