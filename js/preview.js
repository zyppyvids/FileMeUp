function attachPreviewEvent(cell) {
    cell.addEventListener('mouseenter', function(e) {
        let img = this.querySelector('.preview-img');
        if (!img) {
            img = document.createElement('img');
            img.src = this.getAttribute('data-image-src');
            img.classList.add('preview-img');
            this.appendChild(img);
        }
        img.style.display = 'block'; // Show the preview

        const tableRect = this.closest('table').getBoundingClientRect();
        const tableMidPoint = tableRect.height / 2;
        const mouseY = e.clientY;
        console.log(tableRect)
        console.log(mouseY)
        img.style.bottom = '';
        img.style.top = '';

        if (mouseY < tableMidPoint) {
            img.style.top = '100%'; // Position the preview right below the cell
        } else {
            img.style.bottom = '100%'; // Position the preview above the cell
        }
    });

    cell.addEventListener('mouseleave', function() {
        const img = this.querySelector('.preview-img');
        if (img) {
            img.style.display = 'none'; // Hide the preview
        }
    });
}
