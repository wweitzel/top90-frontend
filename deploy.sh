#!/bin/bash

set -e

# Prevent output text programs from opening by setting AWS_PAGER to empty
export AWS_PAGER=

bun run check-format
bun run check-types
bun run build
aws s3 sync build/ s3://www.top90.io
aws cloudfront create-invalidation --distribution-id E35J0ICF5X5SHZ --paths "/*"
aws cloudfront create-invalidation --distribution-id EECYMS9J1D029 --paths "/*"
