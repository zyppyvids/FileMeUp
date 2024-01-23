window.onload = function checkAuthentication () {
    if (sessionStorage.getItem('authenticated') === 'true') {
        location.href = "../main.html";
    }
}

function registerUser () {
    var data = new FormData(document.getElementById("registerForm"));
  
    fetch("../php/register.php", { method:"POST", "body":data })
    .then(res => res.json())
    .then(res => {
      if (res.success === true) {
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('userId', res.id);
        location.href = "../main.html";
      }
    });
    
    return false;
}