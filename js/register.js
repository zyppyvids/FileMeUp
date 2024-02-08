window.onload = function checkAuthentication () {
    if (sessionStorage.getItem('authenticated') === 'true') {
        location.href = "../main.html";
    }
}

function registerUser () {
    var data = new FormData(document.getElementById("registerForm"));
    var password = data.get("password");

    if(validatePassword(password)) {
      fetch("../php/register.php", { method:"POST", "body":data })
      .then(res => res.json())
      .then(res => {
        if (res.success === true) {
          sessionStorage.setItem('authenticated', 'true');
          sessionStorage.setItem('userId', res.id);
          sessionStorage.setItem('visibilityMode', 0);
          location.href = "../main.html";
        } else {
          showSnackbarWithText("Registration failed. Try again later...")
        }
      });
    } else {
      var errorElement = document.getElementById("error");
      errorElement.style.visibility = "visible"
    }

    return false;
}