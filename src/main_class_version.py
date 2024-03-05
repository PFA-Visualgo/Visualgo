# from pathlib import Path
# import sys

# path_root = Path(__file__).parents[2]
# sys.path.append(str(path_root))
# print(sys.path)

# import pydebuger

import pdb

from pyscript import document
from js import editor, alert
from pyodide.ffi import create_proxy

def getScriptCode():
    text = editor.getValue();
    return text

def highlightLine(lineNumber):
  editor.dispatch({
    effects: highlightLinesEffect.of([executedLineDecoration.range(lineNumber)])
  })

class ControllerUIComponent:
    def __init__(self,):
        self.lineNumber = 0

    def selectFunctions(event):
        alert("TODO!")
        pass

    def selectVariables(event):
        alert("TODO!")
        pass

    def start(self):
        self.lineNumber += 1
        button = document.querySelector("#startButton")

        if button.innerText == "Start":
            button.innerText = "Restart"
        elif button.innerText == "Restart":
            button.innerText = "Start"

        pauseButton = document.querySelector("#pauseButton")
        pauseButton.innerText = "Pause"

        output_div = document.querySelector("#drawingArea")
        output_div.innerText = str(self.lineNumber)
        pass


    def pause(event):
        button = document.querySelector("#pauseButton")
        if button.innerText == "Pause":
            button.innerText = "Resume"
        elif button.innerText == "Resume":
            button.innerText = "Pause"
        pass

    def stepBackward(event):
        pass

    def nextBackward(event):
        pass

    def stepForward(event):
        res = getScriptCode()
        output_div = document.querySelector("#drawingArea")
        output_div.innerText = res
        # pydebuger.runLineOfCode("print('Hello World')")
        pass

    def nextForward(event):
        pass

if __name__ == "__main__":
    controllerUI = ControllerUIComponent()

    function_proxy = create_proxy(lambda _: controllerUI.start())
    # function_proxy = create_proxy(start)

    document.getElementById("startButton").addEventListener("click", function_proxy)

    pass