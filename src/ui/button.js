
// Show dropdown file menu on click
document.addEventListener('DOMContentLoaded', function () {
    // Get the fileDropdown and fileButton element
    var fileDropdown = document.getElementById('fileDropdown');
    var fileButton = document.getElementById('fileButton');


    fileButton.addEventListener('click', function (event) {
        // Prevent this click event from propagating to the document click listener
        event.stopPropagation();
        // Toggle the visibility of dropdown content
        fileDropdown.classList.toggle('show');
        // Hide the elements of selectDropdown TODO genralise this behaviour
        document.getElementById('selectDropdown').classList.remove('show');
    });

    // Hide dropdown content if click is outside of dropdown
    document.addEventListener('click', function (event) {
        if (!fileDropdown.contains(event.target)) {
            fileDropdown.classList.remove('show');
        }
    });
});

//Show dropdown select menu on click
document.addEventListener('DOMContentLoaded', function () {
    var selectDropdown = document.getElementById('selectDropdown');
    var selectButton = document.getElementById('selectButton');

    selectButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent this click event from propagating to the document click listener
        selectDropdown.classList.toggle('show'); // Toggle the visibility of dropdown content
        document.getElementById('fileDropdown').classList.remove('show'); // Hide dropdown content if click is outside of dropdown
    });

    // Hide dropdown content if click is outside of dropdown
    document.addEventListener('click', function (event) {
        if (!selectDropdown.contains(event.target)) {
            selectDropdown.classList.remove('show');
        }
    });
});


// Open a file onclick
document.getElementById("fileOpenButton").addEventListener("click", function () {

    // Create an input element of type file
    var input = document.createElement('input');
    input.type = 'file';

    // Set accept attribute to only allow Python files
    input.accept = '.py';

    // Event listener for when a file is selected
    input.addEventListener('change', function (event) {
        // Get the selected file
        var file = event.target.files[0];

        var reader = new FileReader();
        reader.onload = function () {
            editor.value = reader.result;
        };
        reader.readAsText(file);
    });

    // Trigger the file input dialog
    input.click();
});

// Download code as code.py
document.getElementById("fileDownloadButton").addEventListener('click', function () {
    var content = "";//editor.value;
    var blob = new Blob([content], { type: 'text/plain' });

    // Create a download link and click on it
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'code.py'; // Default filename
    a.click();

    // Remove the download link
    window.URL.revokeObjectURL(url);
});

//TODO export statistics as csv