from pyscript import document
from pyodide.ffi import create_proxy

from visualgo.logic.ui.ui_callbacks import UICallbacksInterface
from visualgo.logic.ui.types import TransferVariables
from visualgo.logic.types import Statistics
from visualgo.logic.controller import Controller
from visualgo.logic.debugger.py_debugger import PyDebugger

from pyscript_ui_callbacks import PyscriptUICallbacks

if __name__ == "__main__":
    controller = Controller(PyDebugger(), PyscriptUICallbacks())

def start(event):
    print("start")

class Visualisation:

    def __init__(self):
        self.controller = Controller(PyDebugger, Callbacks())
        self.code = "print('Hello, World!')"

    def start(self, _):
        self.controller.start(self.code)


if __name__ == "__main__":
    visualisation = Visualisation()
    print(visualisation.controller.__dict__)

    document.getElementById("startButton").addEventListener(
        "click", create_proxy(visualisation.start)
    )
