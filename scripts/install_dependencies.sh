#!/bin/bash
set -e  # Exit immediately if any command fails
set -x  # Enable debugging

# Ensure the directory exists
mkdir -p /home/ec2-user/myapp

# Give the EC2 user permissions on the myapp directory
sudo chown -R ec2-user:ec2-user /home/ec2-user/myapp/

# Change to the application directory
cd /home/ec2-user/myapp

# Verify package.json exists before attempting npm install
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found in /home/ec2-user/myapp/"
    exit 1
fi

# Install dependencies
npm install --production
