import pickle
from typing import Callable

from pyscript import window, document
from pyodide.ffi import to_js
import pyodide_js

pyodide_js.setDebug(True)

el = document.getElementById("worker")
if el is None:
	raise Exception("No worker found")


def __default_handler(mes_id, mes_data):
	pass


Promise = window.Promise
deferred = Promise.withResolvers()
message_handler = __default_handler


def __wait_for_main_message():
	return deferred.promise


def __receive_message(data):
	mes_id, mes_data = pickle.loads(data.to_py())
	message_handler(mes_id, mes_data)


el.xworker.sync.wait_for_main_message = __wait_for_main_message
el.xworker.sync.send_message = __receive_message


def set_message_handler(func: Callable[[str, object], None]):
	global message_handler
	message_handler = func


def send_message(mes_id: str, data: object) -> None:
	global deferred
	print("Sending message", mes_id)
	deferred.resolve(to_js(pickle.dumps((mes_id, data))))
	deferred = Promise.withResolvers()
