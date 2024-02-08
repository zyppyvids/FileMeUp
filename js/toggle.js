function toggleFileVisibility() {
    visibilityMode = sessionStorage.getItem('visibilityMode');
    visibilityMode = visibilityMode === '0' ? '1' : '0';
    sessionStorage.setItem('visibilityMode', visibilityMode)

    refreshPage();
}
