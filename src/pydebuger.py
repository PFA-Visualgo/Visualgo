import bdb
from types import FrameType

class MyBdb(bdb.Bdb):
    def user_line(self, frame: FrameType) -> None:
        print("USER LINE AT FRAME")
        print(frame)

# def runLineOfCode(line: str):
#     # pdb.runeval(expression, globals=None, locals=None)
#     res =  pdb.runeval(line)
#     return res
