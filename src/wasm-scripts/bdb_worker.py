import pyscript_from_worker
from visualgo.logic.debugger.__private.bdb_layer import _run_bdb_task


if __name__ == "__main__":
    pyscript_from_worker.set_implementation()
    _run_bdb_task()