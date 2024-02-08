window.onload = function checkAuthentication () {
    if (sessionStorage.getItem('authenticated') === 'true') {
        location.href = "main.html";
    }
}

function loginUser () {
    var data = new FormData(document.getElementById("loginForm"));
    var password = data.get("password");

    if(validatePassword(password)) {
      fetch("../php/login.php", { method:"POST", "body":data })
      .then(res => res.json())
      .then(res => {
        if (res.success === true) {
          sessionStorage.setItem('authenticated', 'true');
          sessionStorage.setItem('userId', res.id);
          sessionStorage.setItem('visibilityMode', 0);
          sessionStorage.setItem('username', res.username);
          location.href = "../main.html";
        } else {
          showSnackbarWithText("Login failed. Try again later...")
        }
      });
    } else {
      var errorElement = document.getElementById("error");
      errorElement.style.visibility = "visible"
    }
    
    return false;
}