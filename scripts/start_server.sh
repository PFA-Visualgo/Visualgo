#!/bin/bash

# Build the package into a wheel file, create a pyscript.json file
# and launch a http server at src/ui/

RESET='\033[0m'
BOLD='\033[1m'
GREEN='\033[32m'

set -e

# Launch http server at src/ui/
echo -e "${BOLD}${GREEN}>> Join the website at http://localhost:8000/src/ui/ <<${RESET}"
python3 -m http.server 8000
