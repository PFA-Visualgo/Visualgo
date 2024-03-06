from js import alert
from pyscript import document
from pyodide.ffi import create_proxy

from visualgo.logic.ui.ui_callbacks import UICallbacksInterface
from visualgo.logic.ui.types import TransferVariables
from visualgo.logic.types import Statistics
from visualgo.logic.controller import Controller
from visualgo.logic.debugger.py_debugger import PyDebugger


# For demonstration purposes
class Callbacks(UICallbacksInterface):

    def get_code(self) -> str:
        return "print('Hello, World!')"

    def update_variables(self, vars: TransferVariables) -> None:
        self.show_error("Callback called: update_variables")

    def update_statistics(self, stats: Statistics) -> None:
        pass

    def show_error(self, message: str) -> None:
        alert(message)


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
