#!/bin/bash

# Build the package into a wheel file, create a pyscript.json file
# and launch a http server at web/ folder

set -e

rm -rf build dist

# Create a wheel file and place it in the web/ folder
cd Visualgo-PyPI
python3 setup.py bdist_wheel
cd ..
cp Visualgo-PyPI/dist/*.whl src/ui/

# Replace {PKG} in ps-template.json with the name of the whl file
PKG=$(basename src/ui/*.whl)
sed "s@{PKG}@$PKG@g" src/ui/ps-template.json > src/ui/pyscript.json

# Launch http server at web/
cd src/ui
python3 -m http.server 8000
