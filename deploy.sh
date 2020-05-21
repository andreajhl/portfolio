#!/bin/bash

# REMOVE FILES
rm -rf zip.zip
rm -rf build

# INITIAL MESSAGE
clear
echo "Which environment do you want to deploy?"
echo

# ENVIRONMENTS
environments=(
  "Testing"
  "Production"
)
for i in "${!environments[@]}"; do
  echo "$i" "=" "${environments[$i]}"
done
echo

# SELECTED ENVIRONMENT
# shellcheck disable=SC2162
read -p 'Select an option: ' selectedOption
clear
echo
echo "Deploying ====> ${environments[selectedOption]}..."
echo


mkdir build
cd react-app
if [[ ${environments[selectedOption]} = "Testing" ]]; then
    npm run-script build-testing
elif [[ ${environments[selectedOption]} = "Production" ]]; then
    npm run-script build-production
else
    echo "Invalid environment"
    exit 1
fi
cp -R build/ ../build
rm -rf build

cd ../

zip -r zip.zip . \
 --exclude=*.git* \
 --exclude=node_modules/ \
 --exclude=node_modules/* \
 --exclude=*.env* \
 --exclude=react-app/ \
 --exclude=react-app/* \
 --exclude=.ebextensions/* \
 --exclude=.elasticbeanstalk/*

eb use "FamososFrontend-${environments[selectedOption]}"
eb deploy

rm -rf zip.zip
rm -rf build
