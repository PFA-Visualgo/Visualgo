from visualgo.logic import UICallbacksInterface, TransferVariables, Statistics

from js import update_variables, update_statistics, show_error, get_code, show_message, set_current_line


class PyscriptUICallbacks(UICallbacksInterface):
    """
    Implementation of UICallbacksInterface that calls the JS frontend
    """

    def get_code(self) -> str:
        return get_code()

    def update_variables(self, variables: TransferVariables) -> None:

        
        # update_variables(variables)
        set1 = {
            "description": {
                "name": "set1",
                "depth": 0,
            },
            "type": "set",
            "value": [8, 6, 5, 7, 15, 94, 26, 31, 48, 52, 4, 7, 95, 23, 22, 20, 14],
        }

        linkedList1 = {
            "description": {
                "name": "linkedList1",
                "depth": 0,
            },
            "type": "linked_list",
            "value": [8, 6, 5, 7, 15, 94, 26, 31, 48, 52, 4, 7, 95, 23, 22, 20, 14],
        }
        print(set1, linkedList1)
        # update_variables([set1, linkedList1])
        # temporary to show it works
        self.show_message("Callback called: update_variables")

    def update_statistics(self, statistics: Statistics) -> None:
        update_statistics(statistics)

    def show_error(self, error: str) -> None:
        show_error(error)

    def show_message(self, message: str) -> None:
        show_message(message)

    def set_current_line(self, line_number: int) -> None:
        set_current_line(line_number)

