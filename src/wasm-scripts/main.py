from pyscript import document
from pyodide.ffi import create_proxy

import numpy as np

from visualgo.logic import Controller, PyDebugger

from pyscript_ui_callbacks import PyscriptUICallbacks

class Visualisation:
    """
    Class that acts as the main interface between the frontend and the backend.
    """

    def __init__(self):
        self.__controller = Controller(PyDebugger, PyscriptUICallbacks())

    def start(self, _):
        self.__controller.start()
        pass


if __name__ == "__main__":
    visualisation = Visualisation()
    # print(visualisation.controller.__dict__)

    document.getElementById("startButton").addEventListener(
        "click", create_proxy(visualisation.start)
    )
