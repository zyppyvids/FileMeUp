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

function fetchData() {
    fetch('http://localhost:3000/src/fetch_data.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(file => {
                let file_type = file.file_type.split("/")[1]
                let imgSrc = getImageForFileType(file_type);
                const tableRow = `<tr><td><img src="${imgSrc}" class="small-icons">${file.file_name}</td><td>${file_type}</td><td>${file.file_size}</td></tr>`;
                
                document.getElementById("file-table").querySelector("tbody").innerHTML += tableRow;
            });
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', fetchData);
