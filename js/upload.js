// Function to handle file selection and submission
function selectFile() {
    return new Promise((resolve, reject) => {
        const fileInput = document.getElementById("fileToUpload");
        fileInput.addEventListener("change", function () {
            resolve(fileInput.files);
        });

        // Trigger the file input click event
        fileInput.click();
    });
}

/// Attach the function to the "Upload File" button
document.getElementById("upload-btn").addEventListener("click", async function () {
    try {
        const selectedFiles = await selectFile();
        // Perform additional logic with the selectedFile if needed
        console.log("Selected File:", selectedFiles);

        uploadFiles(selectedFiles);
    } catch (error) {
        showSnackbarWithText("Upload failed. Try again later...")
    }
});

function uploadFiles (files) {
    for (let index = 0; index < files.length; index++) {
        var data = new FormData();
        data.append('fileToUpload', files[index])
        
        fetch("../php/upload.php", { method:"POST", "body":data }).then(() => {
            if(index == files.length - 1) {
                refreshPage();
            }
        });
    }
    
    return false;
}