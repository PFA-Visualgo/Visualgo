from pyscript import document
from pyodide.ffi import create_proxy

from visualgo.logic.ui.ui_callbacks import UICallbacksInterface
from visualgo.logic.ui.types import TransferVariables
from visualgo.logic.types import Statistics
from visualgo.logic.controller import Controller
from debugger import TmpPyDebugger


# For demonstration purposes
class Callbacks(UICallbacksInterface):

    def get_code(self) -> str:
        return "print('Hello, World!')"

    def update_variables(self, vars: TransferVariables) -> None:
        pass

    def update_statistics(self, stats: Statistics) -> None:
        pass

    def show_error(self, message: str) -> None:
        print(f"Error: {message}")


class Visualisation:

    def __init__(self):
        self.controller = Controller(TmpPyDebugger, Callbacks())
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
    print(visualisation.controller.__dict__)

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
