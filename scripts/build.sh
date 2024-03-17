#!/bin/bash

# Build the package into a wheel file, create a pyscript.json file
# and launch a http server at src/wasm-scripts/

set -e

rm -rf build dist

# Create a wheel file and place it in the src/wasm-scripts/
cd Visualgo-PyPI
# python setup.py bdist_wheel
make build_wheel
cd ..
cp Visualgo-PyPI/dist/*.whl src/wasm-scripts/

# Replace {PKG} in ps-template.json with the name of the whl file
PKG=$(basename src/wasm-scripts/*.whl)
sed "s@{PKG}@../wasm-scripts/$PKG@g" src/pyscript/ps-template.json > src/pyscript/pyscript.json
