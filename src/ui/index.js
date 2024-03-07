// Initialize CodeMirror
var editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
    mode: 'python', // Set the mode to Python
    lineNumbers: true, // Display line numbers
    scrollbarStyle: 'null', // Hide the scrollbars
    // indentUnit: 4, // Set the number of spaces for each indent
    position: 'absolute',
    extraKeys: {
        'Ctrl-Space': 'autocomplete' // Enable autocomplete on Ctrl + Space
    },
    hintOptions: {
        completeSingle: false // Show multiple suggestions on autocomplete
    }
});

// Apply your custom styles
editor.getWrapperElement().style.width = '38%';
editor.getWrapperElement().style.height = '100vh';
editor.getWrapperElement().style.float = 'left';
editor.getWrapperElement().style.boxSizing = 'border-box';

function importFile() {
    // Create an input element of type file
    var input = document.createElement('input');
    input.type = 'file';

    // Set accept attribute to only allow Python files
    input.accept = '.py';

    // Trigger the file input dialog
    input.click();

    // Event listener for when a file is selected
    input.addEventListener('change', function () {
        // Get the selected file
        var file = input.files[0];

        // Check if a file is selected and it has a .py extension
        if (file && file.name.endsWith('.py')) {
            // Read the content of the file
            var reader = new FileReader();
            reader.onload = function (e) {
                // Set the value of the CodeMirror editor
                editor.setValue(e.target.result);
            };

            // Read the file as text
            reader.readAsText(file);
        } else {
            // Display an alert if the selected file is not a .py file
            alert('Please select a valid Python (.py) file.');
        }
    });
}

function saveFile() {
    // Get the content from the CodeMirror editor
    var content = editor.getValue();
    if (content == '') {
        alert('Please enter some code to save.');
        return;
    }

    // Create a Blob with the content and set the MIME type to text/plain
    var blob = new Blob([content], { type: 'text/plain' });

    // Create an anchor element
    var a = document.createElement('a');

    // Set the href attribute to a Blob URL
    a.href = URL.createObjectURL(blob);

    // Set the download attribute with the desired file name and extension
    a.download = 'visualgo.py';

    // Append the anchor element to the body
    document.body.appendChild(a);

    // Programmatically click the anchor element to trigger the download
    a.click();

    // Remove the anchor element from the body
    document.body.removeChild(a);
}

// TODO: Unit tests
function validateNumberInput(value) {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');

    // Check if the numericValue is a valid number
    const parsedValue = parseInt(numericValue, 10);
    if (isNaN(parsedValue)) {
        // If not a valid number, return an empty string or any other default value
        return '';
    }

    // Check against a upper limit
    const maxValue = 10000;
    return Math.min(parsedValue, maxValue).toString();
}

function checkTimeStepValue(input) {
    input.value = validateNumberInput(input.value);
}