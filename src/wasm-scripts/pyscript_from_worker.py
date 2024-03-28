from typing import Any

from pyscript import sync
import pickle
from visualgo.logic.debugger.__private.comm_api.from_worker import FromWorker
from visualgo.logic.debugger.__private.comm_api import from_worker


class PyScriptFromWorker(FromWorker):

    def send_message(self, mes_id: str, data: Any):
        sync.send_message(pickle.dumps((mes_id, data)))

    def wait_for_main_message(self) -> (str, Any):
        return pickle.loads(sync.wait_for_main_message().to_py())


# def send_message(mes_id, data):
# 	sync.send_message(pickle.dumps((mes_id, data)))
#
#
# def wait_for_main_message() -> (str, object):
# 	print("Waiting for main message...")
# 	return pickle.loads(sync.wait_for_main_message().to_py())
def set_implementation():
    from_worker.set_implementation(PyScriptFromWorker())
