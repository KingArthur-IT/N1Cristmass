//HEADER
document.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.header');
    if (scrollTop > 20 && !header.classList.contains('fixed')) 
        header.classList.add('fixed');
    if (scrollTop < 20 && header.classList.contains('fixed')) 
        header.classList.remove('fixed');
});

//TABS
const tabBtns = document.querySelectorAll('.modal__tab-btn');
tabBtns.forEach((el, index) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        //change tab active
        el.classList.add('active');
        const notActiveTabIndex = index === 0 ? 1 : 0;
        tabBtns[notActiveTabIndex].classList.remove('active');
        //change content display
        if (index === 0){
            document.querySelector('.modal__new-partners')?.classList.add('active');
            document.querySelector('.modal__current-partners')?.classList.remove('active');
        } else{
            document.querySelector('.modal__new-partners')?.classList.remove('active');
            document.querySelector('.modal__current-partners')?.classList.add('active');
        }
    })
});

//MODAL
const modal = document.querySelector('.modal');

document.querySelectorAll('.show-form').forEach((el) => {
    el.addEventListener('click', () => {
        if (modal){
            modal.classList.add('displayed');
            setTimeout(() => {
                modal.classList.add('visible');
            }, 300);
        }
    })
})

document.querySelector('.modal__close')?.addEventListener('click', () => {
    if (modal){
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.remove('displayed');
        }, 300);
    }
});