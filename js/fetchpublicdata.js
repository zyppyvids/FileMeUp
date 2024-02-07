window.onload = function onLoad() {
    checkAuthentication();
    fetchAndSetTableData().then(() => setDownloadButtons()).then(() => updateFileManagerContent());
}

function updateFileManagerContent() {
    var fileTable = document.getElementById("file-table");
    var fileManager = document.querySelector(".file-manager");

    // Check if there are no files
    if (fileTable && fileTable.tBodies[0].rows.length <= 1) {
        fileTable.remove();
        fileManager.innerHTML = "<h1 class=\"center\">No available files</h1>";
    }
}

function checkAuthentication() {
    if (sessionStorage.getItem('authenticated') !== 'true') {
        location.href = "../login.html";
    }
}

function fetchAndSetTableData() {
    const connection = new XMLHttpRequest();
    connection.open('GET', '../php/fetch_public_data.php');
    //connection.open('GET', '../php/fetch_data.php');
    connection.send();

    return new Promise((resolve, reject) => {
        connection.onload = () => {
            if (connection.status === 200) {
                const data = JSON.parse(connection.responseText);
                const tbody = document.getElementById("file-table").querySelector("tbody");

                data.forEach(file => {
                    let file_type = file.file_type.split("/")[1];
                    let imgSrc = getImageForFileType(file_type);
                    const tableRow = `<tr><td><img src="${imgSrc}" class="small-icons"></td><td onclick="openFile('${file.file_name}')">${file.file_name}</td><td>${file_type}</td><td>${file.size}</td><td><button class="download-btn" data-file="${file.file_path}"><span class="material-symbols-outlined">download</span></button></td></tr>`;

                    tbody.innerHTML += tableRow;
                });

                resolve(true);
            } else {
                alert('Error fetching files');
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
