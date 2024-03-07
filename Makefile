# Makefile

# Default target
all: start

RESET = \033[0m
BOLD = \033[1m
GREEN = \033[32m
RED = \033[31m

export PYTHONPATH := $(PWD)/src:$(PYTHONPATH)

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

update-submodules:
	@echo "$(BOLD)$(GREEN)>> Updating submodules <<$(RESET)"
	git submodule update --init --recursive

# Install dependencies from requirements.txt
install: update-submodules check-venv dependencies
	@echo "$(BOLD)$(GREEN)>> Installing the visualgo wheel <<$(RESET)"
	./scripts/install.sh

start: install
	@echo "$(BOLD)$(GREEN)>> Starting the visualgo html page <<$(RESET)"
	./scripts/start_server.sh

# Define phony targets
.PHONY: all check-venv install run clean tests freeze
