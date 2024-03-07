from pyscript import sync
import pickle
from typing import Union


def send_message(mes_id, data):
    sync.send_message(pickle.dumps((mes_id, data)))


def wait_for_main_message() -> Union[str, object]:
    print("Waiting for main message...")
    return pickle.loads(sync.wait_for_main_message().to_py())
