from visualgo.logic import UICallbacksInterface, TransferVariables, Statistics

from js import update_variables, update_statistics, show_error, get_code


class PyscriptUICallbacks(UICallbacksInterface):
    """
    Implementation of UICallbacksInterface that calls the JS frontend
    """

    def get_code(self) -> str:
        return get_code()

    def update_variables(self, variables: TransferVariables) -> None:
        update_variables(variables)
        # temporary to show it works
        self.show_error("Callback called: update_variables")
        pass

    def update_statistics(self, statistics: Statistics) -> None:
        update_statistics(statistics)
        pass

    def show_error(self, error) -> None:
        show_error(error)
        pass
