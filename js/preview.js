function attachPreviewEvent(cell) {
    cell.addEventListener('mouseenter', function() {
        let img = this.querySelector('.preview-img');
        if (!img) {
            img = document.createElement('img');
            img.src = this.getAttribute('data-image-src');
            img.classList.add('preview-img');
            this.appendChild(img);
        }
        img.style.display = 'block'; // Show the preview
    });

    cell.addEventListener('mouseleave', function() {
        const img = this.querySelector('.preview-img');
        if (img) {
            img.style.display = 'none'; // Hide the preview
        }
    });
}

export default attachPreviewEvent;
