#!/bin/bash

# Version key/value should be on his own line
#PACKAGE_VERSION=$(cat package.json \
#  | grep version \
#  | head -1 \
#  | awk -F: '{ print $2 }' \
#  | sed 's/[",]//g' \
#  | xargs echo -n)
#
#USER=hrathod
#PORT=195.178.113.54
#TARGET_DIR=/data/docker/nobackup/test-drm/web/assets/player
#REMOTE_USER_PASSWORD=Hiren@54321
#echo "$PACKAGE_VERSION"

checkDirExists() {
  if [ -d "$1" ]
  then
      echo "Directory exists."
      echo "Switch to $1 version files"
      cd $1
      echo "Remove all Files exists."
      rm *
      echo "Exit."
  else
      echo "Directory does not exists."
      echo "Creating a new player version."
      mkdir "$1"
      echo "Exit"
  fi
}

#sshpass -p "$REMOTE_USER_PASSWORD" scp -r Some_Directory/ ubuntu@18.118.208.79:/home/ubuntu/
# shellcheck disable=SC2034
#sshpass -p "$CDN_PREPROD_PASS" ssh -p 5142  $CDN_PREPROD_USER@$CDN_PREPROD_ADDR "cd $TARGET_DIR; $(typeset -f checkDirExists); checkDirExists $PACKAGE_VERSION"
#sshpass -p "$CDN_PREPROD_PASS" ssh -p 5142  $CDN_PREPROD_USER@$CDN_PREPROD_ADDR "cd $CDN_PREPROD_TARGET_DIRECTORY; checkDirExists $VERSION"

#scp -P 5142 dist/HexaglobePlayer.bundle.js $CDN_PREPROD_USER@$CDN_PREPROD_ADDR:$CDN_PREPROD_TARGET_DIRECTORY/$VERSION
#scp -P 5142 dist/index.css $CDN_PREPROD_USER@$CDN_PREPROD_ADDR:$CDN_PREPROD_TARGET_DIRECTORY/$VERSION
