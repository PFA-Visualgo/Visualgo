from ui_callbacks_pyscript import UICallbacksInterface
from js import update_variables, update_statistics, show_error, get_code

class PyscriptUICallbacks(UICallbacksInterface):
    """
    Implementation of UICallbacksInterface that calls the JS frontend
    """

    def update_variables(self, variables) -> None:
        update_variables(variables)
        pass

    def update_statistics(self, statistics) -> None:
        update_statistics(statistics)
        pass

    def show_error(self, error) -> None:
        show_error(error)
        pass

    def get_code(self) -> str:
        return get_code()


# class Test():
#     def __init__(self):
#         self._scriptCode = ""
#         self._globalsVars = {}
#         self._localsVars = {}
#         self._currentLine = 0
#         self._task = None
#         self._runState = 0


