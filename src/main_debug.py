from js import Promise, document
from polyscript import XWorker

deferred = Promise.withResolvers()


def handle_continue(event):
	global deferred
	button = document.getElementById("incr")
	button.disabled = True
	deferred.resolve()
	deferred = Promise.withResolvers()


# allows the worker to ask something as placeholder
# resolves the returning on micropython-click event
# non-blocking this thread, keeping the worker in idle
# until such promise is not resolved
def handle_frame(frame):
	button = document.getElementById("incr")
	button.disabled = False
	print("NEW FRAME")
	print(frame)
	return deferred.promise


def main():
	w = XWorker('./debug_worker.py', config="./pyscript.json")

	# provide a synchronous input callback
	# to the polyscript's xworker utility
	w.sync.update_frame = handle_frame


if __name__ == "__main__":
	main()
