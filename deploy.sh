#!/bin/bash
START_TIME=$SECONDS

# Get the name of the current Git branch and then ensure that only
# the master Git branch is deployable to production by this script.
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# Only push this update to the server if the current branch is the Master branch
if [[ "$branch" == "master" ]]
then
    echo "\nCompiling and deploying $branch to production.famosos.com..."

    npm run-script build-production  && \
            aws s3 cp build s3://production.famosos.com --recursive # && \
            # aws cloudfront create-invalidation --distribution-id E24ZXTLVX8AVT8 --paths '/*'

    ELAPSED_TIME=$(($SECONDS - $START_TIME))
    echo "\nFinished in $ELAPSED_TIME seconds.\n\n"

elif [[ "$branch" == "staging" ]]
then
    echo "\nCompiling and deploying $branch to staging.famosos.com..."

    npm run-script build-staging  && \
            aws s3 cp build s3://staging.famosos.com --recursive # && \
            # aws cloudfront create-invalidation --distribution-id E24ZXTLVX8AVT8 --paths '/*'

    ELAPSED_TIME=$(($SECONDS - $START_TIME))
    echo "\nFinished in $ELAPSED_TIME seconds.\n\n"

elif [[ "$branch" == "testing" ]]
then
    echo "\nCompiling and deploying $branch to testing.famosos.com..."

    npm run-script build-testing  && \
            aws s3 cp build s3://testing.famosos.com --recursive # && \
            # aws cloudfront create-invalidation --distribution-id E24ZXTLVX8AVT8 --paths '/*'

    ELAPSED_TIME=$(($SECONDS - $START_TIME))
    echo "\nFinished in $ELAPSED_TIME seconds.\n\n"

else
    echo "---$branch Error---"
fi

