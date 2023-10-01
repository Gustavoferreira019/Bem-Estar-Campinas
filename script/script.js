function menuShow() {
    if (mmobile.style.display == 'block') {
        mmobile.style.display = 'none';
    } else {
        mmobile.style.display = 'block'
    }
}

const toggleButton = document.getElementById('icone');
let isOpen = false;

toggleButton.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
        toggleButton.innerHTML = '&#10006';
    } else {
        toggleButton.innerHTML = '&#9776;'
    }
}
)