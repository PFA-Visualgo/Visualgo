# import __init__
# from . import Controller, PyDebugger
# from . import PyscriptUICallbacks

from pyscript_ui_callbacks import PyscriptUICallbacks
# from . import Controller, PyDebugger

# if __name__ == "__main__":
#     controller = Controller(PyDebugger(), PyscriptUICallbacks())


# class ControllerInterface(ABC):
#     """
#     Interface for the Controller class.
#     """

#     # Execution control
#     @abstractmethod
#     def start(self) -> None:
#         """
#         Starts the execution of the code.
#         :return: None
#         """
#         pass

#     @abstractmethod
#     def pause_continue(self) -> None:
#         """
#         Pauses or continues the execution of the code.
#         :return: None
#         """
#         pass

#     @abstractmethod
#     def set_step_time(self, time: int) -> None:
#         """
#         Sets the time of the step to `time` in milliseconds.

#         :param time: int
#             The time to set for the step.
#         :raises ValueError:
#             If the specified time is less than or equal to 0.
#         :return: None
#         """
#         pass

#     @abstractmethod
#     def forward_step(self) -> None:
#         """
#         Executes the next line of the code.
#         :return: None
#         """
#         pass

#     @abstractmethod
#     def forward_next(self) -> None:
#         """
#         Executes the next line of the code without entering into the user function.
#         :return: None
#         """
#         pass

#     @abstractmethod
#     def backward_step(self) -> None:
#         """
#         Executes the previous line of the code.
#         :return: None
#         """
#         pass

#     @abstractmethod
#     def backward_next(self) -> None:
#         """
#         Executes the previous line of the code without entering into the user function.
#         :return: None
#         """
#         pass

#     # Checkpoints
#     @abstractmethod
#     def new_checkpoint(self, line_number: int) -> None:
#         """
#         Add a new checkpoint at the given `line_number`.
#         :param line_number: int
#         :return: None
#         """
#         pass

#     @abstractmethod
#     def del_checkpoint(self, line_number: int) -> None:
#         """
#         Delete the checkpoint at the given `line_number`.
#         :param line_number: int
#         :return: None
#         """
#         pass

#     # Breakpoints
#     @abstractmethod
#     def new_breakpoint(self, line_number: int) -> None:
#         """
#         Add a new breakpoint at the given `line_number`.
#         :param line_number: int
#         :return: None
#         """
#         pass

#     @abstractmethod
#     def del_breakpoint(self, line_number: int) -> None:
#         """
#         Delete the breakpoint at the given `line_number`.
#         :param line_number: int
#         :return: None
#         """
#         pass

#     # Tracking for drawings
#     @abstractmethod
#     def new_tracked_variable(self, variable: SymbolDescription) -> None:
#         """
#         Add a new tracked variable by the user with the given `variable`.
#         :param variable: SymboleDescription
#         :return: None
#         """
#         pass

#     @abstractmethod
#     def del_tracked_variable(self, variable: SymbolDescription) -> None:
#         """
#         Delete the tracked variable with the given `variable`.
#         :param variable: SymboleDescription
#         :return: None
#         """
#         pass

#     # Tracking for statistics
#     @abstractmethod
#     def new_tracked_function(self, function: SymbolDescription) -> None:
#         """
#         Add a new tracked function by the user with the given `function`.
#         :param function: SymboleDescription
#         :return: None
#         """
#         pass

#     @abstractmethod
#     def del_tracked_function(self, function: SymbolDescription) -> None:
#         """
#         Delete the tracked function with the given `function`.
#         :param function: SymboleDescription
#         :return: None
#         """
#         pass

#     @abstractmethod
#     def new_tracked_type(self, type_name: str) -> None:
#         """
#         Add a new tracked type by the user with the given `type_name`.
#         :param type_name: str
#         :return: None
#         """
#         pass

#     @abstractmethod
#     def del_tracked_type(self, type_name: str) -> None:
#         """
#         Delete the tracked type with the given `type_name`.
#         :param type_name: str
#         :return: None
#         """
#         pass

#     # Statistics
#     @abstractmethod
#     def get_csv(self) -> str:
#         """
#         Returns the evolution of the statistics at the checkpoints/breakpoints in a CSV format.
#         Format of the CSV to be determined...
#         :return: str
#         """
#         pass

#     @abstractmethod
#     def get_static_variables(self) -> StaticVariables:
#         """
#         Returns the variables defined in the code before the execution.
#         :return: Variables
#         """
#         pass


# Define the function called by the JavaScript code

def start(event):
    print("start")
    # controller.start()
