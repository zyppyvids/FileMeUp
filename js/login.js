window.onload = function checkAuthentication () {
    if (sessionStorage.getItem('authenticated') === 'true') {
        location.href = "../fileviewer.html";
    }
}

function loginUser () {
    var data = new FormData(document.getElementById("loginForm"));
  
    fetch("../php/login.php", { method:"POST", "body":data })
    .then(res => res.json())
    .then(res => {
      if (res.success === true) {
        sessionStorage.setItem('authenticated', 'true');
        location.href = "../fileviewer.html";
      }
    });
    
    return false;
}