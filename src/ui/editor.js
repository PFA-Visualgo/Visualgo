
let indices, code, highlightedCode, suggestionsDiv, breakpointContainer;

let suggestions = [];

let currentWordSize;
let currentWord;

let selectedSuggestionIndex = 0;

function initEditor() {
    indices = document.getElementById("indices");
    code = document.getElementById("code");
    highlightedCode = document.getElementById("highlightedCode");
    suggestionsDiv = document.getElementById("suggestions");
    breakpointContainer = document.getElementById("breakpointContainer");

    code.innerHTML = '<div>print("Hello World")</div><div>print("GoodBye")</div>';
    indices.value = "";
    lastTextValue = [];
    currentTextValue = [];

    updateCode();
    // Add event listener for the Tab key press event
    code.addEventListener("input", updateCode);
    code.addEventListener("scroll", updateScroll);
    code.addEventListener("keydown", handleTabKey);
    code.addEventListener("keydown", handleArrowKeys);
    window.addEventListener("click", hideSuggestions)
}

function updateCode() {
    currentTextValue = code.innerHTML.replaceAll("<br></div>", "</div>").replaceAll("<br>", "<div>").replaceAll("</div>", "").split("<div>");
    // console.log(currentTextValue);
    if (currentTextValue.length != lastTextValue.length) {
        updateIndices(currentTextValue.length - 1);
    }
    suggestCompletions();
    updateColor();
    lastTextValue = currentTextValue;
}

/**
 * Change the line numbers on the right
 */
function updateIndices(len) {
    ind = "   1\n";
    for (let i = 1; i < len; i++) {
        ind += "   " + (i + 1).toString() + "\n";
    }
    indices.textContent = ind;

    let breakpointStates = [];
    for (let b of breakpointContainer.children) {
        breakpointStates.push(b.classList[1]);
    }
    breakpointContainer.innerHTML = "";
    for (let i = 1; i < len + 1; i++) {
        createBreakpoints(i);
        if (i < breakpointStates.length) {
            let breakpoint = document.getElementById("breakpoint" + i);
            breakpoint.classList.remove("grey");
            breakpoint.classList.add(breakpointStates[i - 1]);
        }
    }
}

/**
 * Update syntax coloration
 */
function updateColor() {
    codeText = code.innerHTML;
    codeText = codeText.replace(/"([^"\\]|\\.)*"/g, '<span style="color: orange">$&</span>'); // Highlight strings

    // Python keyword coloration
    let regex = new RegExp(`\\b(?:${getKeywords().join('|')})\\b`, 'g');
    codeText = codeText.replace(regex, '<span style="color: blue">$&</span>'); // Highlight keywords

    // Function coloration
    // regex = new RegExp('def\s+(\w+)\s*\(', 'g');
    // console.log(regex.exec(codeText));
    // codeText = codeText.replace(regex, '<span style="color: green">$&</span>'); // Highlight keywords

    highlightedCode.innerHTML = '<pre style="margin: 0;">' + codeText + '</pre>';
}

/**
 * Scroll every divs based on the main one
 */
function updateScroll() {
    indices.scrollTop = code.scrollTop;
    highlightedCode.scrollTop = code.scrollTop;
}

/**
 * Search for suggestions based on the last word
 */
function suggestCompletions() {

    // Get the current cursor position
    const selection = window.getSelection();
    let range;
    try {
        range = selection.getRangeAt(0);
    }
    catch {
        return;
    }
    const currentPosition = range.endOffset;

    let newRange = document.createRange();
    const startOffset = 0;
    const endOffset = currentPosition;
    const parentNode = range.startContainer; // Get the parent node of the current cursor position
    newRange.setStart(parentNode, startOffset);
    newRange.setEnd(parentNode, endOffset);


    currentWord = newRange.toString().split(" ").slice(-1)[0];
    currentWord = currentWord.split("\t").slice(-1)[0];
    // console.log(currentWord);
    if (currentWord != "") {
        suggestions = getKeywords().filter(w => w.startsWith(currentWord));
        currentWordSize = currentWord.length;
        showSuggestions()
    } else {
        hideSuggestions();
        suggestions = [];
    }
}

/**
 * Shows the suggestion panel
 */
function showSuggestions() {

    suggestionsDiv.innerHTML = suggestions.map(suggestion => {
        const firstLetter = suggestion.slice(0, currentWordSize); // Get the first letter of the suggestion
        const remainingLetters = suggestion.slice(currentWordSize); // Get the remaining letters of the suggestion
        return `<div><span style="color: blue;">${firstLetter}</span>${remainingLetters}</div>`;
    }).join('');
    suggestionsDiv.style.display = suggestions.length > 0 ? 'block' : 'none';

    // Position suggestions relative to cursor
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (rect.bottom == 0) {
        suggestionsDiv.style.display = "none";
    }
    suggestionsDiv.style.top = rect.bottom + 'px';
    suggestionsDiv.style.left = rect.left + 'px';
    selectedSuggestionIndex = 0;
    updateSuggestions(suggestions.length);
}

/**
 * Change which suggestion is highlighted
 */
function updateSuggestions(numSuggestions) {
    for (let i = 0; i < numSuggestions; i++) {
        if (i == selectedSuggestionIndex) {
            suggestionsDiv.children[i].style.backgroundColor = "#DDDDFF";
        }
        else {
            suggestionsDiv.children[i].style.backgroundColor = "white";
        }
    }
}

/**
 * Changing suggestion handler
 */
function handleArrowKeys(event) {
    if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && (suggestionsDiv.style.display != "none")) {
        event.preventDefault(); // Prevent default scrolling behavior

        const numSuggestions = suggestions.length;

        if (numSuggestions === 0) return;
        if (event.key === 'ArrowUp') {
            selectedSuggestionIndex = (selectedSuggestionIndex - 1 + numSuggestions) % numSuggestions;
        } else {
            selectedSuggestionIndex = (selectedSuggestionIndex + 1) % numSuggestions;
        }

        updateSuggestions(numSuggestions);

    }
}

/**
 * Autocompletion handler
 */
function handleTabKey(event) {
    if (event.key === 'Tab') {
        event.preventDefault(); // Prevent the default tab behavior

        let selectedSuggestion;
        if (suggestions.length === 0 || selectedSuggestionIndex === -1) {
            selectedSuggestion = "\t";
        }
        else {
            selectedSuggestion = suggestionsDiv.children[selectedSuggestionIndex].textContent;
        }

        // Get the current cursor position
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const currentPosition = range.endOffset;

        // Unselect all text
        selection.removeAllRanges();

        // Create a new range for selecting the last characters before the current cursor position
        let newRange = document.createRange();

        let startOffset;
        if (selectedSuggestion != "\t") {
            startOffset = Math.max(currentPosition - currentWordSize, 0); // Ensure start offset is non-negative
        } else {
            startOffset = currentPosition; // Ensure start offset is non-negative
        }
        const endOffset = currentPosition;
        const parentNode = range.startContainer; // Get the parent node of the current cursor position
        newRange.setStart(parentNode, startOffset);
        newRange.setEnd(parentNode, endOffset);
        newRange.deleteContents();

        // // Insert the selected suggestion at the cursor position
        const textNode = document.createTextNode(selectedSuggestion);
        newRange.insertNode(textNode);
        selection.addRange(newRange);
        selection.removeAllRanges();

        // // Move the cursor to the end of the inserted text
        newRange = document.createRange();
        newRange.setStartAfter(textNode);
        newRange.collapse(true);
        selection.addRange(newRange);

        // Hide suggestions
        suggestionsDiv.style.display = 'none';
        suggestions = [];
        updateCode();
    }
}

function hideSuggestions() {
    suggestionsDiv.style.display = 'none';
}


function createBreakpoints(index) {
    var breakpoint = document.createElement("button");
    breakpoint.className = "breakpoint grey";
    breakpoint.id = "breakpoint" + index;
    breakpoint.addEventListener("click", function () {
        handleBreakpointClick(this.id);
    });
    breakpointContainer.appendChild(breakpoint);
}

function handleBreakpointClick(breakpointId) {
    let breakpoint = document.getElementById(breakpointId)
    let state = breakpoint.classList[1];

    switch (state) {
        case "grey":
            breakpoint.classList.remove("grey");
            breakpoint.classList.add("green");
            state = "green"
            function1();
            break;
        case "green":
            breakpoint.classList.remove("green");
            breakpoint.classList.add("red");
            state = "red"
            function2();
            break;
        case "red":
            breakpoint.classList.remove("red");
            breakpoint.classList.add("grey");
            state = "grey"
            function3();
            break;
        default:
            break;
    }
}
function function1() {
    console.log("Function 1 called");
    // Your function1 implementation here
}

function function2() {
    console.log("Function 2 called");
    // Your function2 implementation here
}
function function3() {
    console.log("Function 3 called");
    // Your function3 implementation here
}


function getEditorCode() {
    currentTextValue.shift();
    return currentTextValue.join("\n");
}

/** Return every Python keywords
 * 
 * @returns 
 */
function getKeywords() {
    return [
        // This section is the result of running
        // `import keyword; for k in sorted(keyword.kwlist + keyword.softkwlist): print("  '" + k + "',")`
        // in a Python REPL,
        // though note that the output from Python 3 is not a strict superset of the
        // output from Python 2.
        "False",
        // promoted to keyword.kwlist in Python 3
        "None",
        // promoted to keyword.kwlist in Python 3
        "True",
        // promoted to keyword.kwlist in Python 3
        "_",
        // new in Python 3.10
        "and",
        "as",
        "assert",
        "async",
        // new in Python 3
        "await",
        // new in Python 3
        "break",
        "case",
        // new in Python 3.10
        "class",
        "continue",
        "def",
        "del",
        "elif",
        "else",
        "except",
        "exec",
        // Python 2, but not 3.
        "finally",
        "for",
        "from",
        "global",
        "if",
        "import",
        "in",
        "is",
        "lambda",
        "match",
        // new in Python 3.10
        "nonlocal",
        // new in Python 3
        "not",
        "or",
        "pass",
        "print",
        // Python 2, but not 3.
        "raise",
        "return",
        "try",
        "type",
        // new in Python 3.12
        "while",
        "with",
        "yield",
        "int",
        "float",
        "long",
        "complex",
        "hex",
        "abs",
        "all",
        "any",
        "apply",
        "basestring",
        "bin",
        "bool",
        "buffer",
        "bytearray",
        "callable",
        "chr",
        "classmethod",
        "cmp",
        "coerce",
        "compile",
        "complex",
        "delattr",
        "dict",
        "dir",
        "divmod",
        "enumerate",
        "eval",
        "execfile",
        "file",
        "filter",
        "format",
        "frozenset",
        "getattr",
        "globals",
        "hasattr",
        "hash",
        "help",
        "id",
        "input",
        "intern",
        "isinstance",
        "issubclass",
        "iter",
        "len",
        "locals",
        "list",
        "map",
        "max",
        "memoryview",
        "min",
        "next",
        "object",
        "oct",
        "open",
        "ord",
        "pow",
        "print",
        "property",
        "reversed",
        "range",
        "raw_input",
        "reduce",
        "reload",
        "repr",
        "reversed",
        "round",
        "self",
        "set",
        "setattr",
        "slice",
        "sorted",
        "staticmethod",
        "str",
        "sum",
        "super",
        "tuple",
        "type",
        "unichr",
        "unicode",
        "vars",
        "xrange",
        "zip",
        "__dict__",
        "__methods__",
        "__members__",
        "__class__",
        "__bases__",
        "__name__",
        "__mro__",
        "__subclasses__",
        "__init__",
        "__import__"
    ];
}
