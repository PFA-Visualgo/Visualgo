
//Show dropdown file menu on click
document.addEventListener('DOMContentLoaded', function () {
    var fileDropdown = document.getElementById('file-dropdown');
    var fileBtn = document.getElementById('file-button');

    fileBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent this click event from propagating to the document click listener
        fileDropdown.classList.toggle('show'); // Toggle the visibility of dropdown content
        document.getElementById('select-dropdown').classList.remove('show');
    });

    document.addEventListener('click', function (event) {
        if (!fileDropdown.contains(event.target)) {
            fileDropdown.classList.remove('show'); // Hide dropdown content if click is outside of dropdown
        }
    });
});

//Show dropdown file menu on click
document.addEventListener('DOMContentLoaded', function () {
    var selectDropdown = document.getElementById('select-dropdown');
    var selectBtn = document.getElementById('select-button');

    selectBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent this click event from propagating to the document click listener
        selectDropdown.classList.toggle('show'); // Toggle the visibility of dropdown content
        document.getElementById('file-dropdown').classList.remove('show'); // Hide dropdown content if click is outside of dropdown
    });

    document.addEventListener('click', function (event) {
        if (!selectDropdown.contains(event.target)) {
            selectDropdown.classList.remove('show'); // Hide dropdown content if click is outside of dropdown
        }
    });
});
//Open a file
document.getElementById("file-open-button").addEventListener("click", function () {
    var input = document.createElement('input');
    input.type = 'file';
    //input.webkitdirectory = true; // Allow choosing directory
    input.accept = '.py';
    input.addEventListener('change', function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            document.getElementById("code-editor").value = reader.result;
        };
        reader.readAsText(file);
    });
    input.click();
});

// Download code as code.py
document.getElementById("file-download-button").addEventListener('click', function () {
    var content = "";//codeEditor.value;
    var blob = new Blob([content], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'code.py'; // Default filename
    a.click();
    window.URL.revokeObjectURL(url);
});

//TODO export statistics as csv