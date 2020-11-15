#!/bin/bash

# REMOVE FILES
rm -rf zip.zip
rm -rf build

mkdir build
cd react-app
npm run-script build-qa
cp -R build/ ../build
cd ..
node server.js
