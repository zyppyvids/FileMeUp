window.onload = function onLoad() {
    sessionStorage.setItem('files', "");
    var visibilityMode = sessionStorage.getItem('visibilityMode');
    loadVisibility(visibilityMode);
    checkAuthentication();
    // Pass visibilityMode from the window object
    fetchAndSetTableData(visibilityMode).then(() => {
        setDownloadButtons();
        if (visibilityMode === '0') {
            setDeleteButtons();
            setPublicButtons();
            setPrivateButtons();
        }
        updateFileManagerContent();
    }).catch(error => {
        console.error(error);
        updateFileManagerContent(); // Handle error by updating file manager content
    });
}

function loadVisibility(visibilityMode) {
    buttonBody = document.getElementById('toggle-visibility-btn');
    deleteAllBody = document.getElementsByClassName('delete-all');
    if(visibilityMode === '0') {
        buttonBody.innerHTML = 'Shared files';
        deleteAllBody[0].style.display = 'initial';
    } else  {
        buttonBody.innerHTML = 'Private files';
        deleteAllBody[0].style.display = 'none';
    }
}

function updateFileManagerContent() {
    var fileTable = document.getElementById("file-table");
    var fileManager = document.querySelector(".file-manager");

    // Check if there are no files
    if (fileTable && fileTable.tBodies[0].rows.length <= 1) {
        fileTable.remove();
        fileManager.innerHTML = "<h1 class=\"center\">No files uploaded</h1>";
    }
}

function checkAuthentication() {
    if (sessionStorage.getItem('authenticated') !== 'true') {
        location.href = "../login.html";
    }
}

function fetchAndSetTableData() {
    const connection = new XMLHttpRequest();
    var visibilityMode = sessionStorage.getItem('visibilityMode');
    var url;
    if (visibilityMode === '1') {
        url = '../php/fetch_data.php?isPrivate=1'; // Include isPrivate parameter in the URL
    } else {
        url = '../php/fetch_data.php?isPrivate=0'; // Include isPrivate parameter in the URL
    }
    connection.open('GET', url);
    connection.send();

    return new Promise((resolve, reject) => {
        connection.onload = () => {
            if (connection.status === 200) {
                const data = JSON.parse(connection.responseText);
                const tbody = document.getElementById("file-table").querySelector("tbody");

                Promise.all(data.map(file => {
                    let file_type = file.file_type.split("/")[1];
                    let imgSrc = getImageForFileType(file_type);
                    const isImage = file_type === 'png' || file_type === 'jpeg';
                    const filePreviewCell = isImage ? `class="file-preview" data-image-src="${file.file_path}"` : '';
                    const deleteButton = visibilityMode === '0' ? 
                    `
                    <button class="delete-btn" data-file="${file.file_path}">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                    ` : ''
                    var tableRow = `
                    <tr>
                        <td>
                            <input type="checkbox" onclick="checkboxFile('${file.file_path}')">
                        </td>
                        <td>
                            <img src="${imgSrc}" class="small-icons">
                        </td>
                        <td ${filePreviewCell} onclick="openFile('${file.file_path}')" style="position: relative">
                            ${file.file_name}
                        </td>
                        <td>
                            ${file_type}
                        </td>
                        <td>
                            ${file.size}
                        </td>
                        <td>
                            <button class="download-btn" data-file="${file.file_path}">
                                <span class="material-symbols-outlined">download</span>
                            </button>
                        </td>
                        <td>
                            ${deleteButton}
                        </td>
                        <td>`;

                    return getFileVisibility(file.file_path, visibilityMode)
                    .then(data => {
                        if (visibilityMode === '0') {
                            var isPrivate = data.is_private;
                            if (isPrivate === 1) {
                                tableRow = tableRow.concat(
                                    `
                                    <td>
                                    <button class="public-btn" data-file="${file.file_path}">
                                                    <span class="material-symbols-outlined">public</span>
                                                </button>
                                    </td>
                                    `
                                );
                            } else {
                                tableRow = tableRow.concat(
                                    `
                                    <td>
                                    <button class="private-btn" data-file="${file.file_path}">
                                                    <span class="material-symbols-outlined">🔒</span>
                                                </button>
                                    </td>
                                    `)
                            }
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        showSnackbarWithText("Failed to fetch file status...");
                    })
                    .then(() => tableRow += '</td></tr>')
                    .then(tableRow => {
                        tbody.insertAdjacentHTML('beforeend', tableRow);
                        if (isImage) {
                            const lastRow = tbody.lastElementChild;
                            const previewCell = lastRow.querySelector('.file-preview');
                            attachPreviewEvent(previewCell);
                        }
                    });
                }))
                .then(() => resolve(true))
                .catch(error => {
                    console.error(error);
                    showSnackbarWithText("Error fetching files...");
                    reject(new Error('Error fetching files'));
                });
            } else {
                showSnackbarWithText("Error fetching files...");
                reject(new Error('Error fetching files'));
            }
        };
    });
}



function getImageForFileType(fileType) {
    switch (fileType) {
        case 'png':
        case 'jpeg':
            return '../../img/img.png';
        case 'pdf':
            return '../../img/pdf.png';
        case 'txt':
        case 'plain':
            return '../../img/txt.png';
        default:
            return '../../img/unknown.png';
    }
}

function setDownloadButtons() {
    var downloadButtons = document.querySelectorAll('.download-btn');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            var filePath = this.getAttribute('data-file');
            var link = document.createElement('a');
            link.href = filePath;
            link.download = filePath.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
}

function setDeleteButtons() {
    var deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            var filePath = this.getAttribute('data-file');
            if (confirm("Are you sure you want to delete this file?")) {
                deleteFile(filePath);
                refreshPage();
            }
        });
    });
}

function setPublicButtons() {
    var publicButtons = document.querySelectorAll('.public-btn');
    publicButtons.forEach(button => {
        button.addEventListener('click', function() {
            var filePath = this.getAttribute('data-file');
            var visibility = 0;
            changeFileVisibility(filePath, visibility);
            refreshPage();
        });
    });
}

function setPrivateButtons() {
    var publicButtons = document.querySelectorAll('.private-btn');
    publicButtons.forEach(button => {
        button.addEventListener('click', function() {
            var filePath = this.getAttribute('data-file');
            var visibility = 1;
            changeFileVisibility(filePath, visibility);
            refreshPage();
        });
    });
}

function changeFileVisibility(filePath, visibility) {
    var file_name = filePath.split('/').pop();

    fetch('../php/update_visibility.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            file: file_name,
            visibility: visibility
        }),
    })
    .then(response => {
        if (response.ok) {
            console.log('File updated successfully.');
        } else {
            showSnackbarWithText("Failed to update the file...");
        }
    })
    .catch(error => {
        showSnackbarWithText("Failed to update the file...");
    });
}

function getFileVisibility(filePath, visibilityMode) {
    var file_name = filePath.split('/').pop();

    return fetch('../php/get_file_visibility.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file: file_name
            }),
        })
        .then(response => {
            if (response.ok) {
                
                return visibilityMode === '0' ? response.json() : "";
            } else {
                throw new Error('Failed to get the file');
            }
        })
        .catch(error => {
            console.error(error);
            throw new Error('Failed to get the file');
        });
}