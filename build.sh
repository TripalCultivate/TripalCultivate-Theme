#!/bin/sh
echo ""
echo ""
echo "👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇"
echo "This is a barebones script. It does bulk renames without any regard to whether"
echo "the renamed file is valid. If you use any of the following, it will fail:"
echo ""
echo " - JavaScript reserved words"
echo " - PHP reserved words"
echo " - Spaces or non-standard characters"
echo " - hyphens or underscores"
echo ""
echo "👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆"
echo ""

read -p "Enter the name of the theme (example: MyTheme): " THEMENAME
read -p "Enter the machine name of the theme (example: my_theme): " THEMENAME_LOWER

# Copy Olivero theme from core.
cp -r ../../core/themes/olivero/* ./
DIRS=("./" "config/install/" "config/optional/" "config/schema/")

# Rename all filenames to use new themename.
for DIR in "${DIRS[@]}"
do
  for file in $DIR*olivero* ; do mv $file ${file//olivero/$THEMENAME_LOWER} ; done
done

# Rename the prerender file by ensuring that only the first letter of the theme is capitalized.
mv src/OliveroPreRender.php src/${THEMENAME}PreRender.php

# Rename all occurrances of "Olivero" within the theme (both lower case and normal).
grep -rl olivero . --exclude=\*.{sh,md} --exclude-dir={node_modules,scripts,.git} | xargs sed -i "" -e "s/olivero/$THEMENAME_LOWER/g"
grep -rl Olivero . --exclude=\*.{sh,md} --exclude-dir={node_modules,scripts,.git} | xargs sed -i "" -e "s/Olivero/$THEMENAME/g"

# Move make configuration optional (this is needed if Olivero is already enabled).
mv ./config/install/block* ./config/optional/
mv ./config/install/core* ./config/optional/
