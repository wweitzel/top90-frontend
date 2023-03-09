#!/bin/bash

set -e

npm run check-format
npm run check-types
npm run build
aws s3 sync build/ s3://www.top90.io
aws cloudfront create-invalidation --distribution-id E35J0ICF5X5SHZ --paths "/*"
aws cloudfront create-invalidation --distribution-id EECYMS9J1D029 --paths "/*"
