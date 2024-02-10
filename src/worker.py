from polyscript import xworker

cpt = 0

while True:
	xworker.sync.count(cpt)
	cpt += 1