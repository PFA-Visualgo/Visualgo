import pdb

def runLineOfCode(line: str):
    # pdb.runeval(expression, globals=None, locals=None)
    res =  pdb.runeval(line)
    return res
