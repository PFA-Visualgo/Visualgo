# Makefile

# Default target
all: build server

BOLD := $(shell tput bold)
GREEN := $(shell tput setaf 2)
RESET := $(shell tput sgr0)
RED := $(shell tput setaf 1)

export PYTHONPATH := $(PWD)/src:$(PYTHONPATH)

update-submodules:
	@echo "$(BOLD)$(GREEN)>> Updating submodules <<$(RESET)"
	git submodule update --init --recursive

# Check if the virtual environment is activated and not the default Conda environment
check-venv:
	@if [ -n "$$VIRTUAL_ENV" ]; then \
		echo "$(BOLD)$(GREEN)>> Virtual environment is activated (venv) <<$(RESET)"; \
	elif [ -n "$$CONDA_PREFIX" ] && [ "$$CONDA_PREFIX" != "$$(conda info --base)" ]; then \
		echo "$(BOLD)$(GREEN)>> Conda environment is activated and not the default Conda environment <<$(RESET)"; \
	elif [ -n "$$PYENV_VIRTUAL_ENV" ]; then \
		echo "$(BOLD)$(GREEN)>> Virtual environment is activated (pyenv) <<$(RESET)"; \
	elif [ -n "$$PIPENV_ACTIVE" ]; then \
		echo "$(BOLD)$(GREEN)>> Virtual environment is activated (pipenv) <<$(RESET)"; \
	else \
		echo "$(BOLD)$(RED)>> Error: Virtual environment not activated. Please activate your virtual environment of choice. <<$(RESET)"; \
		exit 1; \
	fi

dependencies:
	@echo "$(BOLD)$(GREEN)>> Installing dependencies <<$(RESET)"
	python -m pip install --upgrade pip
	pip install wheel

# Install dependencies from requirements.txt
build: update-submodules check-venv dependencies
	@echo "$(BOLD)$(GREEN)>> Building the visualgo wheel <<$(RESET)"
	./scripts/build.sh 

server:
	@if [ -z "$$(ls -A src/ui/*.whl 2>/dev/null)" ]; then \
		echo "$(BOLD)$(RED)No .whl file found in src/ui/, run 'make build'$(RESET)"; \
	else \
		echo "$(BOLD)$(GREEN)>> Starting the Visualgo html page <<$(RESET)"; \
		./scripts/start_server.sh; \
	fi

clean:
	@echo "$(BOLD)$(GREEN)>>Cleaning up <<$(RESET)"
	rm -rf src/ui/*.whl 
	cd Visualgo-PyPI; make clean
	@echo "$(BOLD)$(GREEN)Project Visualgo cleaned correctly.$(RESET)"

# Define phony targets
.PHONY: all check-venv build run clean tests freeze
