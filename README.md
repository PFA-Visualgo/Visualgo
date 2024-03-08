# Visualgo
A PFA project from 2023-2024 students of ENSEIRB-MATMECA.

## How to use

Update the submodule directory with `make update-submodules`. You can create a virtual environment with `python -m venv venv` and activate it with `source venv/bin/activate`.

Build the local wheel of Visualgo with `make build`.

Start without automatic updates: 
- Launch the website with python using `make server` and join the server at http://localhost:8000/src/ui 

Start with automatic updates: 
- Use the VsCode extension "Live Server", start and join http://localhost:5500/src/ui


## Known issue

- scrolling by selecting text with the mouse and going down hides the nav bar