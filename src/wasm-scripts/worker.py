from visualgo.logic.debugger.__private.comm_api import to_worker, from_worker
from visualgo.logic.debugger.__private.comm_impl.python_to_worker import PythonToWorker


def task():
    cpt = 0
    while True:
        print("THREAD:", "sending cpt")
        from_worker.get_implementation().send_message("CPT", cpt)
        print("THREAD:", "waiting for main")
        mes_id, mes_data = from_worker.get_implementation().wait_for_main_message()
        print("THREAD:", mes_id, mes_data)
        cpt += 1


def handler(mes_id, mes_data):
    print("MAIN:", (mes_id, mes_data))


if __name__ == "__main__":
    to_worker.set_implementation(PythonToWorker(task, handler))
    while True:
        input("ENTER to incr counter")
        to_worker.get_implementation().send_message("INCR", None)