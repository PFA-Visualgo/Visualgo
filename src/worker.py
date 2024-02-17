import js
import micropip
import pyodide
from polyscript import xworker

document = xworker.window.document


async def micropip_install(packages):
	print("prepare to micropip install", packages)
	document.getElementById("mode").innerText = "installing packages in worker via micropip"
	try:
		print("installing ", packages, " in worker via micropip")
		await micropip.install(packages)
		print("installed all packages in worker")
	except Exception as e:
		print(e)
		document.getElementById("mode").innerText = str(e)


async def run_async(code):
	js.document = xworker.window.document

	try:
		return await pyodide.code.eval_code_async(code)
	except Exception as e:
		print(e)
		document.getElementById("mode").innerText = str(e)


xworker.sync.runAsync = run_async
xworker.sync.micropipInstall = micropip_install
xworker.sync.onWorkerReady()
