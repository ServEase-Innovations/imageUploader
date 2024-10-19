#!/bin/bash
set -e  # Exit on error
set -x  # Enable debugging

# Create the target directory if it doesn't exist
mkdir -p /home/ec2-user/myapp

# Change to the app directory
cd /home/ec2-user/myapp

# Install dependencies
npm install --production
