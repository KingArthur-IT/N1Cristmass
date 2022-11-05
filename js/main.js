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
const modalForm = document.querySelector('.modal__hero');
const modalThanks = document.querySelector('.modal__thanks');

document.querySelectorAll('.show-form').forEach((el) => {
    el.addEventListener('click', () => {
        if (modal){
            modal.classList.add('displayed');
            setTimeout(() => {
                modal.classList.add('visible');
            }, 300);
        }
    })
});

const closeModal = () => {
    if (modal){
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.remove('displayed');
        }, 300);
    }
};

document.querySelector('.modal__close')?.addEventListener('click', () => {
    closeModal();
});

['new', 'current'].forEach(el => {
    document.getElementById(`${el}-partners-send`).addEventListener('click', (e) => {
        e.preventDefault();

        const companyName = document.getElementById(`${el}-company-name`)?.value;
        const phone = document.getElementById(`${el}-phone`)?.value;
        const email = document.getElementById(`${el}-email`)?.value;
        const message = document.getElementById(`${el}-message`)?.value;

        modalForm.classList.add('d-none');
        modalThanks.classList.remove('d-none');
    })    
});

document.querySelector('.modal__thanks-btn').addEventListener('click', () => {
    closeModal();
    setTimeout(() => {
        modalForm.classList.remove('d-none');
        modalThanks.classList.add('d-none');
    }, 300);
})