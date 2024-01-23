var downloadButtons = document.querySelectorAll('.download-btn');
console.log(downloadButtons)
downloadButtons.forEach(function(button) {
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
