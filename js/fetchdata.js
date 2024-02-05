window.onload = function onLoad() {
    sessionStorage.setItem('files', "");

    checkAuthentication();
    fetchAndSetTableData()
    .then(() => setDownloadButtons())
    .then(() => setDeleteButtons())
    .then(() => updateFileManagerContent());
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
    connection.open('GET', '../php/fetch_data.php');
    connection.send();

    return new Promise((resolve, reject) => {
        connection.onload = () => {
            if (connection.status === 200) {
                const data = JSON.parse(connection.responseText);
                const tbody = document.getElementById("file-table").querySelector("tbody");

                data.forEach(file => {
                    let file_type = file.file_type.split("/")[1];
                    let imgSrc = getImageForFileType(file_type);
                    const isImage = file_type === 'png' || file_type === 'jpeg';
                    const filePreviewCell = isImage ? `class="file-preview" data-image-src="${file.file_path}"` : '';
                    
                    const tableRow = `
                    <tr>
                        <td>
                            <input type="checkbox" onclick="checkboxFile('${file.file_path}')">
                        </td>
                        <td>
                            <img src="${imgSrc}" class="small-icons">
                        </td>
                        <td ${filePreviewCell} onclick="openFile('${file.file_name}')">
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
                            <button class="delete-btn" data-file="${file.file_path}">
                                <span class="material-symbols-outlined">delete</span>
                            </button>
                        </td>
                    </tr>`;

                    tbody.insertAdjacentHTML('beforeend', tableRow);
                    if (isImage) {
                        const lastRow = tbody.lastElementChild;
                        const previewCell = lastRow.querySelector('.file-preview');
                        attachPreviewEvent(previewCell);
                    }
                });

                resolve(true);
            } else {
                showSnackbarWithText("Error fetching files...");
                reject(new Error('Error fetching files'));
            }
        };
    });
}

function getImageForFileType(fileType) {
    switch(fileType) {
        case 'png':
        case 'jpeg':
            return '../../img/img.png';
        case 'pdf':
            return '../../img/pdf.png';
        case 'txt':
        case 'plain':
            return '../../img/txt.png';
        default:
            return'../../img/unknown.png';
    }
}

function setDownloadButtons() {
    var downloadButtons = document.querySelectorAll('.download-btn');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            var filePath = this.getAttribute('data-file');
            var link = document.createElement('a');
            link.href = filePath;
            link.download = filePath.split('/').pop(); // Set the download attribute to the file name
            console.log(link.download)
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
