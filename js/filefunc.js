function openFile(fileName) {
    sessionStorage.setItem('selectedFile', fileName);
    location.href = "../fileviewer.html";
}