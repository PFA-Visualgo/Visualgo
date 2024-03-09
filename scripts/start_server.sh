#!/bin/bash
# Build the package into a wheel file, create a pyscript.json file
# and launch a http server at src/ui/
RESET='\033[0m'
BOLD='\033[1m'
GREEN='\033[32m'
set -e

# Determine the appropriate Python interpreter
if command -v python &> /dev/null; then
    PYTHON=python
elif command -v python3 &> /dev/null; then
    PYTHON=python3
else
    echo "Error: Python interpreter not found."
    exit 1
fi

# Launch http server at src/ui/
echo -e "${BOLD}${GREEN}>> Join the website at http://localhost:8000/src/ui/ <<${RESET}"
$PYTHON -m http.server 8000