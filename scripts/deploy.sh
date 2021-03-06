#!/bin/bash
#===============================================================================
#
#          FILE: deploy.sh
#
#         USAGE:  ./deploy.sh
#
#   DESCRIPTION: deployed the ./out folder to gh-pages
#
#===============================================================================

echo -e "🚀  Deploying... \n"
NEW_VERSION=$(jq -r .version ./package.json)

git add ./out/*
git amend -n
git push
git subtree push --prefix out origin gh-pages

echo -e "🎉 MiroPad v${COLOR_GREEN}${NEW_VERSION}${NO_COLOR} deployed \n"