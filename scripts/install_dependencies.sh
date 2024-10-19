#!/bin/bash
set -e  # Exit immediately if any command fails
set -x  # Enable debugging

# Ensure the target directory exists
mkdir -p /home/ec2-user/myapp

# Ensure the EC2 user owns the directory and files
sudo chown -R ec2-user:ec2-user /home/ec2-user/myapp/

# Go to the app directory
cd /home/ec2-user/myapp

# Check if package.json exists before installing dependencies
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found in /home/ec2-user/myapp/"
    exit 1
fi

# Install Node.js dependencies
npm install --production
