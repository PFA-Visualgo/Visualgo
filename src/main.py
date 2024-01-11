# from pathlib import Path
# import sys

# path_root = Path(__file__).parents[2]
# sys.path.append(str(path_root))
# print(sys.path)

# import pydebuger

from pyscript import document
from js import editor

def getScriptCode():
    text = editor.getValue();
    return text

def selectFunctions(event):
    pass

def selectVariables(event):
    pass

def start(event):
    button = document.querySelector("#restartButton")
    if button.innerText == "Start":
        button.innerText = "Restart"
    elif button.innerText == "Restart":
        button.innerText = "Start"
    pauseButton = document.querySelector("#pauseButton")
    pauseButton.innerText = "Pause"

    output_div = document.querySelector("#drawingArea")
    output_div.innerText = "Start"
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

def nextStepBackward(event):
    pass

def stepForward(event):
    res = getScriptCode()
    output_div = document.querySelector("#drawingArea")
    output_div.innerText = res
     # pydebuger.runLineOfCode("print('Hello World')")
    pass

def nextStepForward(event):
    pass


