window.onload = function checkAuthentication () {
    if (sessionStorage.getItem('authenticated') === 'true') {
        location.href = "../fileviewer.html";
    }
}

function registerUser () {
    var data = new FormData(document.getElementById("registerForm"));
  
    fetch("../php/register.php", { method:"POST", "body":data })
    .then(res => res.json())
    .then(res => {
      if (res.success === true) {
        sessionStorage.setItem('authenticated', 'true');
        location.href = "../fileviewer.html";
      }
    });
    
    return false;
}