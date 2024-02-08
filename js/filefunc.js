function openFile(fileName) {
    sessionStorage.setItem('selectedFile', fileName);
    location.href = "./fileviewer.html";
}

function checkboxFile(fileName) {
    var filesValue = sessionStorage.getItem('files');
    if(filesValue) {
        files = filesValue.split(',');
        
        if (files.includes(fileName)) {
            files = files.filter(file => file != fileName);
        } else {
            files.push(fileName);
        }
    
        var newFilesValue = files.join(',');
        sessionStorage.setItem('files', newFilesValue);
    } else {
        sessionStorage.setItem('files', fileName);
    }
}

function downloadCheckboxFiles() {
    var filesValue = sessionStorage.getItem('files');
    if (filesValue) {
        var files = filesValue.split(',');

        // Create a new instance of JSZip
        var zip = new JSZip();

        // Add each file to the zip archive
        files.forEach((filePath, index) => {
            fetch(filePath)
                .then(response => response.blob())
                .then(blob => {
                    var fileName = filePath.split('/').at(-1);
                    // Add file to the zip archive with a unique name
                    zip.file(`${fileName}`, blob);

                    // Check if it's the last file before initiating the download
                    if (index === files.length - 1) {
                        // Generate the zip file
                        zip.generateAsync({ type: "blob" })
                            .then(function (content) {
                                // Create a link to download the zip file
                                var link = document.createElement('a');
                                link.href = URL.createObjectURL(content);
                                link.download = "download.zip";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            });
                    }
                });
        });
    }
}

function deleteCheckboxFiles() {
    var filesValue = sessionStorage.getItem('files');
    if (filesValue) {
        if (confirm("Are you sure you want to delete all selected files?")) {
            var files = filesValue.split(',');

            files.forEach((filePath, index) => {
                deleteFile(filePath);
                
                if(index == files.length - 1) {
                    refreshPage();
                }
            });
        }
    }
}

function deleteFile(filePath) {
    var file_name = filePath.split('/').pop();

    fetch('./php/delete.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: file_name }),
    })
    .then(response => {
        if (response.ok) {
            console.log('File deleted successfully.');
        } else {
            showSnackbarWithText("Failed to delete the file...");
        }
    })
    .then(response => console.log(JSON.stringify(response)))
    .catch(error => {
        showSnackbarWithText("Failed to delete the file...");
    });
}
