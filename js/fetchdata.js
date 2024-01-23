window.onload = function onLoad() {
    checkAuthentication();
    fetchData();

}

function updateFileManagerContent() {
    var fileTable = document.getElementById("file-table");
    var fileManager = document.querySelector(".file-manager");

    // Check if there are no files
    if (fileTable && fileTable.tBodies[0].rows.length === 0) {
        fileManager.innerHTML = "<h3>No files uploaded</h3>";
    }
}

function checkAuthentication() {
    if (sessionStorage.getItem('authenticated') !== 'true') {
        location.href = "../login.html";
    }
}

function fetchData() {
    const connection = new XMLHttpRequest();
    connection.open('GET', '../php/fetch_data.php');
    connection.send();
    connection.onload = () => {
        if (connection.status === 200) {
            data = JSON.parse(connection.responseText);
            data.forEach(file => {
                let file_type = file.file_type.split("/")[1]
                let imgSrc = getImageForFileType(file_type)
                const tableRow = `<tr onclick="openFile('${file.file_name}')"><td><img src="${imgSrc}" class="small-icons">${file.file_name}</td><td>${file_type}</td><td>${file.size}</td><td><button class="download-btn" data-file="uploads/${file.file_path}">Download</button></td></tr>`;
                
                document.getElementById("file-table").querySelector("tbody").innerHTML += tableRow;
            });
        } else {
            alert('Error fetching files');
        }
    };
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
