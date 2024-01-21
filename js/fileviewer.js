window.onload = function checkAuthentication () {
    if (sessionStorage.getItem('authenticated') !== 'true') {
        location.href = "../login.html";
    }
}

const fileContainer = document.getElementById('file-container');

const fetchFile = () => {
  // Connect to database
  const connection = new XMLHttpRequest();
  connection.open('GET', '../php/fileviewer.php');
  connection.onload = () => {
    if (connection.status === 200) {
      // Get the file data
      const fileContent = connection.responseText;

      // Determine file type based on file extension
      const fileType = getFileType(fileContent);

      // Play/display the file
      if (fileType === 'video') {
        const fileElement = document.createElement('video');
        fileElement.src = fileContent;
        fileElement.controls = true;
        fileContainer.appendChild(fileElement);
      } else if (fileType === 'pdf') {
        // Handle PDF display (you may use PDF.js or embed a PDF viewer)
        // Example: Embedding PDF.js viewer
        const pdfElement = document.createElement('iframe');
        pdfElement.src = 'https://mozilla.github.io/pdf.js/web/viewer.html?file=' + encodeURIComponent(fileContent);
        pdfElement.style.width = '100%';
        pdfElement.style.height = '100%';
        fileContainer.appendChild(pdfElement);
      } else if (fileType === 'image') {
        const imageElement = document.createElement('img');
        imageElement.src = fileContent;
        fileContainer.appendChild(imageElement);
      } else {
        // Handle other file types as needed (e.g., docx)
        alert('Unsupported file type');
      }
    } else {
      alert('Error fetching file');
    }
  };
  connection.send();
};

// Function to determine file type based on file extension
const getFileType = (fileContent) => {
  const fileExtension = fileContent.split('.').pop().toLowerCase();
  if (fileExtension === 'mp4' || fileExtension === 'webm' || fileExtension === 'ogg') {
    return 'video';
  } else if (fileExtension === 'pdf') {
    return 'pdf';
  } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
    return 'image';
  } else {
    return 'other';
  }
};

fetchFile();
