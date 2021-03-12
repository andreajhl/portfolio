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
  "Development"
  "Testing"
  "QA"
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
_commitId=$(git log --format="%H" -n 1)
_branchName=$(git symbolic-ref --short -q HEAD)
echo "Deploying ====> ${environments[selectedOption]} - ${_commitId}..."
echo

rm -rf .next
rm -rf node_modules
rm -rf package-lock.json
rm -rf react-app/node_modules
rm -rf react-app/package-lock.json
npm install
npm audit fix

if [[ ${environments[selectedOption]} = "Development" ]]; then
    npm run-script build-development
elif [[ ${environments[selectedOption]} = "Testing" ]]; then
    npm run-script build-testing
elif [[ ${environments[selectedOption]} = "QA" ]]; then
    npm run-script build-qa
elif [[ ${environments[selectedOption]} = "Production" ]]; then
    npm run-script build-production
else
    echo "Invalid environment"
    exit 1
fi

eb use "FamososFrontend-${environments[selectedOption]}"
eb deploy -l "${_commitId}"-${environments[selectedOption]}-$(date +%F_%H-%M-%S)
