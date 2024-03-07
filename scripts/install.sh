#!/bin/bash

# Build the package into a wheel file, create a pyscript.json file
# and launch a http server at src/ui/

RESET='\033[0m'
BOLD='\033[1m'
GREEN='\033[32m'

set -e

rm -rf build dist

# Create a wheel file and place it in the src/ui/
cd Visualgo-PyPI
python setup.py bdist_wheel
cd ..
cp Visualgo-PyPI/dist/*.whl src/ui/

# Replace {PKG} in ps-template.json with the name of the whl file
PKG=$(basename src/ui/*.whl)
sed "s@{PKG}@$PKG@g" src/ui/ps-template.json > src/ui/pyscript.json

# Launch http server at src/ui/
cd src/ui
echo -e "${BOLD}${GREEN}>> Join the website at http://localhost:8000 <<${RESET}"
python -m http.server 8000
