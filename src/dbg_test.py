import pydebuger
from comm_api import from_worker

FILE_NAME = "__visualgo__test.py"


def main():
	debug = pydebuger.MyBdb()
	source = """from mylib import Counter

x = Counter()

x.increment()
x.increment()
x.increment()"""
	CANONIC_FILE_NAME = debug.canonic(FILE_NAME)
	with open(CANONIC_FILE_NAME, "w") as f:
		f.write(source)
		f.flush()
		cmd = compile(source, CANONIC_FILE_NAME, "exec")
		debug.set_break(CANONIC_FILE_NAME, 7)
		from_worker.send_message(None, None)
		from_worker.wait_for_main_message()
		debug.run(cmd, {"__file__": CANONIC_FILE_NAME, "__name__": "__main__"})


if __name__ == "__main__":
	main()
