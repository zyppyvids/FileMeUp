function logoutUser () {
    sessionStorage.setItem('authenticated', 'false');
    location.href = "../login.html";
}