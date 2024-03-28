from pyscript import document
from pyodide.ffi import create_proxy

from visualgo.logic import Controller, PyAbstractDebugger

from pyscript_ui_callbacks import PyscriptUICallbacks
import pyscript_to_worker


class Visualisation:

    def __init__(self):
        self.controller = Controller(PyAbstractDebugger, PyscriptUICallbacks())
        self.code = "print('Hello, World!')"

    async def start(self, _):
        await self.controller.start()

    async def pause_continue(self, _):
        await self.controller.pause_continue()

    def forward_step(self, _):
        self.controller.forward_step()

    def forward_next(self, _):
        self.controller.forward_next()

    def backward_step(self, _):
        self.controller.backward_step()

    def backward_next(self, _):
        self.controller.backward_next()


if __name__ == "__main__":
    pyscript_to_worker.set_implementation()
    visualisation = Visualisation()
    print("__main__")

    document.getElementById("startButton").addEventListener(
        "click", create_proxy(visualisation.start)
    )

    document.getElementById("pauseButton").addEventListener(
        "click", create_proxy(visualisation.pause_continue)
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
