#!/bin/bash
npm run-script build && \
aws s3 cp build s3://staging.famosos.com --recursive && \
aws cloudfront create-invalidation --distribution-id E24ZXTLVX8AVT8 --paths '/*'
