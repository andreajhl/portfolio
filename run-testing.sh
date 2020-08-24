#!/usr/bin/env bash

cd react-app/

npm run-script build-testing

cp -R build/ ../build

cd ../

node server.js
