window.onload = function checkAuthentication () {
    if (sessionStorage.getItem('authenticated') !== 'true') {
        location.href = "login.html";
    }
}

const fileContainer = document.getElementById('file-container');

const fetchFile = () => {
    const selectedFile = sessionStorage.getItem('selectedFile');
    const ownerID = sessionStorage.getItem('userId')
    const fileType = getFileType(selectedFile)

    const source = selectedFile.replace(/^[./]+/, '');;
    // Play/display the file
    if (fileType === 'video') {
        const fileElement = document.createElement('video');
        fileElement.src = source;
        fileElement.controls = true;
        fileElement.style.maxWidth = '90%';
        fileElement.style.maxHeight = '90%';
        fileElement.classList.add('center')
        fileContainer.appendChild(fileElement);
    } else if (fileType === 'image') {
        const imageElement = document.createElement('img');
        imageElement.src = source;
        imageElement.style.maxWidth = '80%';
        imageElement.style.maxHeight = '75%';
        imageElement.classList.add('center')
        fileContainer.appendChild(imageElement);
    } else if (fileType === 'other') {
        const iframeElement = document.createElement('iframe');
        iframeElement.src = source;
        iframeElement.style.width = '90%';
        iframeElement.style.height = '90%';
        iframeElement.classList.add('center')
        fileContainer.appendChild(iframeElement);
    }
};

// Function to determine file type based on file extension
const getFileType = (fileName) => {
  const fileExtension = fileName.split('.').pop().toLowerCase();
  if (fileExtension === 'mp4' || fileExtension === 'webm' || fileExtension === 'ogg') {
    return 'video';
  } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
    return 'image';
  } else {
    return 'other';
  }
};

fetchFile();
