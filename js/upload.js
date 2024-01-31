// Function to handle file selection and submission
function selectFile() {
    return new Promise((resolve, reject) => {
        const fileInput = document.getElementById("fileToUpload");
        fileInput.addEventListener("change", function () {
            resolve(fileInput.files[0]);
        });

        // Trigger the file input click event
        fileInput.click();
    });
}

/// Attach the function to the "Upload File" button
document.getElementById("upload-btn").addEventListener("click", async function () {
    try {
        const selectedFile = await selectFile();
        // Perform additional logic with the selectedFile if needed
        console.log("Selected File:", selectedFile);

        uploadFile();
    } catch (error) {
        console.error("Error selecting file:", error);
    }
});

function uploadFile () {
    var data = new FormData();
    data.append('fileToUpload', document.getElementById("fileToUpload").files[0])
    console.log(document.getElementById("fileToUpload").files[0]);
    
    fetch("../php/upload.php", { method:"POST", "body":data })
    .then(() => {
        location.reload();
    });
    
    return false;
}