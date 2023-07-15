#!/bin/bash

# Install Git submodules
git submodule update --init --recursive

# Install Linux prerequisites
curl -sS https://raw.githubusercontent.com/shaka-project/shaka-player/main/build/install-linux-prereqs.sh | bash

# Navigate to the submodule directory
cd packages/shaka-player

# Run the build script
python build/all.py