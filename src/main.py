# from pathlib import Path
# import sys

# path_root = Path(__file__).parents[2]
# print(path_root)
# sys.path.append(str(path_root))
# print(sys.path)

# import pydebuger

# TODO - import local module

import numpy as np
import pdb                                  # by default in pyscript
from pyscript import document               # by default in pyscript
from js import editor, alert                # by default in pyscript
from pyodide.ffi import create_proxy        # by default in pyscript
# for redirecting stdout of exec
from contextlib import redirect_stdout      # by default in pyscript
import io                                   # by default in pyscript
import asyncio                              # by default in pyscript
from enum import Enum

def countTabsAtBeginning(line):
    tabCount = 0
    for char in line:
        if char == '\t':
        # if char == '    ':
            tabCount += 1
        else:
            break  # Stop counting if a non-tab character is encountered
    return tabCount

def combineCodeLines(code_lines):
    lines = []
    currentBlock = []
    inBlock = False
    firstLine = False
    tabCount = 0
    blockTabCount = 0

    for line in code_lines:
        # Check if the line starts a new block (e.g., 'for', 'if', etc.)
        if line.strip().endswith(':')  :
            blockTabCount = countTabsAtBeginning(line)
            inBlock = True
            firstLine = True
            if firstLine :
                firstLine = False
                currentBlock.append(line)
            else :
                currentBlock.append(line)
            continue
        elif inBlock:
            tabCount = countTabsAtBeginning(line)
            if tabCount > blockTabCount:
                currentBlock.append(line)
                continue
            else:
                inBlock = False
                lines.append('\n'.join(currentBlock))
                currentBlock = []

        inBlock = False
        if currentBlock:
            lines.append('\n'.join(currentBlock))
            currentBlock = []
        lines.append(line)

    if currentBlock:
        lines.append('\n'.join(currentBlock))

    return lines

def getScriptCode():
    text = editor.getValue()
    return  combineCodeLines(text.splitlines())

def highlightLine(lineNumber):
    editor.dispatch({effects: highlightLinesEffect.of([executedLineDecoration.range(lineNumber)])})

def getStepTime():
    stepInputTime = document.querySelector("#stepInput").value
    if (stepInputTime == ""):
        stepInputTime = 1000 # default value
    return int(stepInputTime)

class ExecutionState(Enum):
    NOT_INITIALIZED = 0
    RUNNING = 1
    PAUSED = 2
    FINISHED = 3

# TODO - don't use python global variables (use classes instead)
_globalsVars = {}
_localsVars = {}

def PyDebbuger_Initialize():    # represents the class PyDebbuger and the method Initialize
    global _scriptCode, _globalsVars, _localsVars
    _globalsVars = {}
    _localsVars = {}
    pass

def PyDebbuger_NextForward(line): # represents the class PyDebbuger and the method NextForward
    global _globalsVars, _localsVars
    with io.StringIO() as buf, redirect_stdout(buf):
        exec(line, _globalsVars, _localsVars)
    return _localsVars

_scriptCode = getScriptCode()
_currentLine = 0
_task = None
_runState = ExecutionState.NOT_INITIALIZED

def selectFunctions(event):
    alert("TODO!")
    pass

def selectVariables(event):
    alert("TODO!")
    pass

def initialiseWindow():
    global _currentLine, _scriptCode, _runState, _task

    # update the state
    PyDebbuger_Initialize()
    _scriptCode = getScriptCode()
    _runState = ExecutionState.RUNNING
    _currentLine = 0
    _task = None

    # call debugger
    print(_scriptCode)
    if len(_scriptCode) == 0:
        alert("No code to run!")
        return True

    code = _scriptCode[_currentLine] # TODO - use lines instead of code, it's debugger's job to use the correct lines
    print("executing :", code)
    varsDebugger = PyDebbuger_NextForward(code)
    _currentLine += 1

    # update controller UI
    button = document.querySelector("#startButton")
    if _runState == ExecutionState.RUNNING:
        button.innerText = "Restart"
    else:
        button.innerText = "Start"
    pauseButton = document.querySelector("#pauseButton")
    pauseButton.innerText = "Pause"
    output_div = document.querySelector("#drawingArea")
    # output_div.innerText = str(_globalsVars) + "\n" + str(_localsVars)
    output_div.innerText = str(varsDebugger)
    return False

async def waitAndRun(fun):
    await asyncio.sleep(getStepTime() / 1000)
    await fun()

async def start(event):
    global _task
    if _task:
        _task.cancel()

    if initialiseWindow() :
        return True

    # set the loop
    _task = asyncio.create_task(waitAndRun(nextForwardLoop))

    pass

async def pause(event):
    global _runState, _task
    button = document.querySelector("#pauseButton")
    print(_task == None)
    if _runState == ExecutionState.RUNNING:
        _runState = ExecutionState.PAUSED
        button.innerText = "Resume"
        if _task:
            _task.cancel()
    elif _runState == ExecutionState.PAUSED:
        _runState = ExecutionState.RUNNING
        button.innerText = "Pause"
        _task = asyncio.create_task(waitAndRun(nextForwardLoop))

    pass

def stepBackward(event):
    alert("Try next forward instead!")
    pass

def nextBackward(event):
    alert("Try next forward instead!")
    pass

def stepForward(event):
    alert("Try next forward instead!")
    pass

def nextForward(event):
    global _currentLine, _scriptCode, _runState

    if _runState == ExecutionState.NOT_INITIALIZED:
        initialiseWindow()
        return True

    if _currentLine >= len(_scriptCode):
        # alert("End of script!")
        return False

    # call debugger
    print("executing :", _scriptCode[_currentLine])
    varsDebugger = PyDebbuger_NextForward(_scriptCode[_currentLine])
    _currentLine += 1

    # update controller UI
    output_div = document.querySelector("#drawingArea")
    output_div.innerText = str(varsDebugger)
    return True


async def nextForwardLoop():
    global _runState, _task
    if _task:
        _task.cancel()
    notOver = nextForward(None)
    if _runState == ExecutionState.RUNNING and notOver:
        _task = asyncio.create_task(waitAndRun(nextForwardLoop))


