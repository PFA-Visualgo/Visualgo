import pickle
from typing import Callable, Any
from visualgo.logic.debugger.__private.comm_api.to_worker import ToWorker
from visualgo.logic.debugger.__private.comm_api import to_worker

from pyscript import window, document
from pyodide.ffi import to_js
import pyodide_js
pyodide_js.setDebug(True)
Promise = window.Promise


def _default_handler(mes_id, mes_data):
    pass


class PyScriptToWorker(ToWorker):

    def __init__(self):
        self.message_handler = _default_handler
        el = document.getElementById("worker")
        if el is None:
            raise Exception("No worker found")
        self.worker = el.xworker
        self.deferred = Promise.withResolvers()
        self.worker.sync.wait_for_main_message = lambda: self.deferred.promise
        self.worker.sync.send_message = lambda data: self.message_handler(*pickle.loads(data.to_py()))

    def set_message_handler(self, message_handler: Callable[[str, Any], None]):
        self.message_handler = message_handler

    def send_message(self, mes_id: str, mes_data: Any):
        self.deferred.resolve(to_js(pickle.dumps((mes_id, mes_data))))
        self.deferred = Promise.withResolvers()

    def start_worker(self):
        raise NotImplementedError("Cannot be implemented")

    def interrupt_worker(self):
        self.worker.terminate()


def set_implementation():
    to_worker.set_implementation(PyScriptToWorker())