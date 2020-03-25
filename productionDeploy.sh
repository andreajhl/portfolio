#!/bin/bash

rm -rf zip.zip && zip -r zip.zip . --exclude=*.git* --exclude=node_modules/ --exclude=node_modules/*  --exclude=*.env* \
  && mkdir deploy-tmp \
  && cp .env.production deploy-tmp/.env | zip -mqj zip.zip deploy-tmp/.env \
  && rm -rf deploy-tmp \
  && eb use FamososForBusinessFrontend-Production \
  && eb deploy \
  && rm -r zip.zip