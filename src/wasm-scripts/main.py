from pyscript import document
from pyodide.ffi import create_proxy

from visualgo.logic import Controller, PyDebugger

from pyscript_ui_callbacks import PyscriptUICallbacks


class Visualisation:

    def __init__(self):
        self.controller = Controller(PyDebugger, PyscriptUICallbacks())
        self.code = "print('Hello, World!')"

    def start(self, _):
        self.controller.start()

    def forward_step(self, _):
        self.controller.forward_step()

    def forward_next(self, _):
        self.controller.forward_next()

    def backward_step(self, _):
        self.controller.backward_step()

    def backward_next(self, _):
        self.controller.backward_next()


if __name__ == "__main__":
    visualisation = Visualisation()
    print("__main__")

    document.getElementById("startButton").addEventListener(
        "click", create_proxy(visualisation.start)
    )

    document.getElementById("stepBackwardButton").addEventListener(
        "click", create_proxy(visualisation.backward_step)
    )

    document.getElementById("nextBackwardButton").addEventListener(
        "click", create_proxy(visualisation.backward_next)
    )

    document.getElementById("stepForwardButton").addEventListener(
        "click", create_proxy(visualisation.forward_step)
    )

    document.getElementById("nextForwardButton").addEventListener(
        "click", create_proxy(visualisation.forward_next)
    )
