window.onload = function onLoad() {
    fetchData();
    //updateFileManagerContent();
    // TODO: Fix
}

function updateFileManagerContent() {
    var fileTable = document.getElementById("file-table");
    var fileManager = document.querySelector(".file-manager");

    // Check if there are no files
    if (fileTable && fileTable.tBodies[0].rows.length === 0) {
        fileManager.innerHTML = "<h3>No files uploaded</h3>";
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
                let imgSrc = getImageForFileType(file_type);
                const tableRow = `<tr onclick="alert('kurami')"><td><img src="${imgSrc}" class="small-icons">${file.file_name}</td><td>${file_type}</td><td>${file.file_size}</td></tr>`;
                
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
            return '../../img/img.png';  // Path to PNG icon
        case 'pdf':
            return '../../img/pdf.png';  // Path to PDF icon
        case 'txt':
        case 'plain':
            return '../../img/txt.png';   // Path to TXT icon
        default:
            return'../../img/unknown.png';  // Path to unknown file type icon
    }
}
