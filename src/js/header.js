document.querySelectorAll('.header__nav .nav__link').forEach(element => {
    element.onclick = function() {
        document.querySelector('.header__nav .nav__link.active').classList.remove('active');
        this.classList.add('active');
    }   
});