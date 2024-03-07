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
        to_worker.send_message("code_set", code)

    def add_breakpoint(self, line_number: int, cond: str) -> None:
        error = CodeError(True, line_number, cond)
        self.__callbacks.on_error(error)
        to_worker.send_message("error", error)

    def backward_step(self) -> None:
        self.__callbacks.backward_step_done(self.context, 0)
        to_worker.send_message("backward_step_done", (self.context, 0))

    def forward_step(self) -> None:
        self.__callbacks.forward_step_done(self.context, 0)
        to_worker.send_message("forward_step_done", (self.context, 0))

    def step_into(self) -> None:
        self.__callbacks.step_into_done(self.context, 0)
        to_worker.send_message("step_into_done", (self.context, 0))

    def do_continue(self) -> None:
        self.__callbacks.continue_done(self.context, 0)
        to_worker.send_message("continue_done", (self.context, 0))


if __name__ == "__main__":
    import from_worker

    from_worker.send_message("ready", None)

    while True:
        mes_id, mes_data = from_worker.wait_for_main_message()
        print("Worker received message: ", mes_id, mes_data)
        from_worker.send_message("done", mes_data)
        time.sleep(1)
        print("Worker sent message: done")
