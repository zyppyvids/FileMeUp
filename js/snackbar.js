function showSnackbarWithText(text) {
    var snackbarElement = document.getElementById("snackbar");
    
    snackbarElement.textContent = text;
    snackbarElement.className = "show";
  
    setTimeout(function(){ snackbarElement.className = snackbarElement.className.replace("show", ""); }, 3000);
  }