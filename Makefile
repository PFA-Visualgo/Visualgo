PYTHON := $(shell command -v python3 2> /dev/null || echo python)

all:
	echo "Using Python: $(PYTHON)"
	echo "Join server at http://localhost:8000"
	$(PYTHON) -m http.server 8000
