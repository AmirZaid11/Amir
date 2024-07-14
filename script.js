function openWhatsApp() {
    window.open('https://wa.me/254715264486', '_blank');
}

function zoomImage(img) {
    img.classList.toggle('zoomed');
    var description = img.nextElementSibling;
    description.classList.toggle('show');
}
