import pydebuger
from polyscript import xworker

def main():
	debug = pydebuger.MyBdb()
	source = """x = 0


def main():
	global x
	x = 1
	x = 2
	return x


if __name__ == "__main__":
	print(main())

"""
	with open(debug.canonic("test.py"), "w") as f:
		f.write(source)
		f.flush()
		cmd = compile(source, debug.canonic("test.py"), "exec")
		print(list(cmd.co_lines()))
		debug.set_break(debug.canonic("test.py"), 1)
		debug.run(cmd, {"__file__": debug.canonic("test.py"), "__name__": "__main__"})
		print("HELLO")


if __name__ == "__main__":
	main()
