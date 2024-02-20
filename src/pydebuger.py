import bdb
from types import FrameType
from comm_api import from_worker


class MyBdb(bdb.Bdb):

	def user_line(self, frame: FrameType) -> None:
		if self.stop_here(frame) and self.break_here(frame):
			print("USER LINE AT FRAME")
			import sys
			# Encapsulate frame into a py object, so it can be serialized
			from_worker.send_message("FRAME", frame.f_globals.get("x"))
			from_worker.wait_for_main_message()

# def runLineOfCode(line: str):
#     # pdb.runeval(expression, globals=None, locals=None)
#     res =  pdb.runeval(line)
#     return res
