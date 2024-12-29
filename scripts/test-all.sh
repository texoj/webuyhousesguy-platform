#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "Starting comprehensive test suite..."

# 1. Run unit tests
echo "\nRunning unit tests..."
npm test
if [ $? -ne 0 ]; then
    echo "${RED}Unit tests failed!${NC}"
    exit 1
fi
echo "${GREEN}Unit tests passed!${NC}"

# 2. Run integration tests
echo "\nRunning integration tests..."
npm run test:integration
if [ $? -ne 0 ]; then
    echo "${RED}Integration tests failed!${NC}"
    exit 1
fi
echo "${GREEN}Integration tests passed!${NC}"

# 3. Run E2E tests
echo "\nRunning E2E tests..."
npm run test:e2e
if [ $? -ne 0 ]; then
    echo "${RED}E2E tests failed!${NC}"
    exit 1
fi
echo "${GREEN}E2E tests passed!${NC}"

# 4. Check build
echo "\nTesting build..."
npm run build
if [ $? -ne 0 ]; then
    echo "${RED}Build failed!${NC}"
    exit 1
fi
echo "${GREEN}Build successful!${NC}"

# 5. Run performance tests
echo "\nRunning performance tests..."
node scripts/performance-test.js
if [ $? -ne 0 ]; then
    echo "${RED}Performance tests failed!${NC}"
    exit 1
fi
echo "${GREEN}Performance tests passed!${NC}"

echo "\n${GREEN}All tests completed successfully!${NC}"