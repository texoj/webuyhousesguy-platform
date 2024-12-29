#!/bin/bash

# Environment validation
if [ -z "$NODE_ENV" ]; then
  echo "Error: NODE_ENV not set"
  exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm ci

# Run tests
echo "Running tests..."
npm test

if [ $? -ne 0 ]; then
  echo "Tests failed! Aborting deployment."
  exit 1
fi

# Build application
echo "Building application..."
npm run build

# Deploy based on environment
if [ "$NODE_ENV" = "production" ]; then
  echo "Deploying to production..."
  vercel --prod
else
  echo "Deploying to staging..."
  vercel
fi