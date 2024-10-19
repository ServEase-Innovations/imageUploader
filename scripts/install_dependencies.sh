#!/bin/bash
set -e  # Exit on error
set -x  # Enable debugging

# Create the directory (if it doesn't exist) and navigate to the app directory
mkdir -p /home/ec2-user/myapp

# Change to the app directory
cd /home/ec2-user/myapp

# Verify if package.json exists before running npm install
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found in /home/ec2-user/myapp/"
    exit 1
fi

# Install dependencies
npm install --production
