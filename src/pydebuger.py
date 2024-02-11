import bdb
from types import FrameType
from polyscript import xworker


class MyBdb(bdb.Bdb):

	def user_line(self, frame: FrameType) -> None:
		if self.stop_here(frame) and self.break_here(frame):
			print("USER LINE AT FRAME")
			# Encapsulate frame into a py object, so it can be serialized
			xworker.sync.update_frame(None)

# def runLineOfCode(line: str):
#     # pdb.runeval(expression, globals=None, locals=None)
#     res =  pdb.runeval(line)
#     return res
