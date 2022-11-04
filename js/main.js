document.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.header');
    if (scrollTop > 20 && !header.classList.contains('fixed')) 
        header.classList.add('fixed');
    if (scrollTop < 20 && header.classList.contains('fixed')) 
        header.classList.remove('fixed');
})