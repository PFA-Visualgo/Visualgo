import time

from visualgo.logic.controller_callbacks import ControllerCallbacksInterface
from visualgo.logic.debugger.debugger import DebuggerInterface
from visualgo.logic.debugger.types import DebugContext
from visualgo.logic.types import CodeError

import to_worker


class TmpPyDebugger(DebuggerInterface):
    """
    TEMPORARY debugger for demonstration purposes
    """

    LINE_NUMBER = 0

    def __init__(self, callbacks: ControllerCallbacksInterface) -> None:
        self.__callbacks: ControllerCallbacksInterface = callbacks
        self.__code: str = ""
        self.context = DebugContext()

    def set_code(self, code: str) -> None:
        self.__code = code

    def add_breakpoint(self, line_number: int, cond: str) -> None:
        raise NotImplementedError("Method not implemented yet")

    def backward_step(self) -> None:
        raise NotImplementedError("Method not implemented yet")

    def forward_step(self) -> None:
        raise NotImplementedError("Method not implemented yet")

    def step_into(self) -> None:
        raise NotImplementedError("Method not implemented yet")

    def do_continue(self) -> None:
        raise NotImplementedError("Method not implemented yet")


if __name__ == "__main__":
    import from_worker

    from_worker.send_message("ready", None)

    while True:
        mes_id, mes_data = from_worker.wait_for_main_message()
        print("Worker received message: ", mes_id, mes_data)
        from_worker.send_message("done", mes_data)
        time.sleep(1)
        print("Worker sent message: done")
