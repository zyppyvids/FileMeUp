function toggleFileVisibility() {
    if (location.href.includes("shared.html")) {
        location.href = "../main.html";
    }
    else if (location.href.includes("main.html")) {
        location.href = "../shared.html";
    }
}
