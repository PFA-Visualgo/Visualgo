from typing import Callable


def set_message_handler(func: Callable[[object], None]):
	raise NotImplementedError()


def send_message(mes_id: str, data: object) -> None:
	raise NotImplementedError()
