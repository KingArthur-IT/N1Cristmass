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

//MOBILE MENU
const mobileMenu = document.querySelector('.mobile-menu');

document.querySelector('.header__burger').addEventListener('click', () => {
    mobileMenu?.classList.add('opened');
});

document.querySelector('.mobile-menu__close').addEventListener('click', () => {
    mobileMenu?.classList.remove('opened');
});

document.querySelectorAll('.mobile-menu__item').forEach(el => {
    el.addEventListener('click', () => {
        mobileMenu?.classList.remove('opened');
    })
});

//MODAL
const modal = document.querySelector('.modal');
const modalForm = document.querySelector('.modal__hero');
const modalThanks = document.querySelector('.modal__thanks');

document.querySelectorAll('.show-form').forEach((el) => {
    el.addEventListener('click', () => {
        mobileMenu?.classList.remove('opened');
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

document.querySelectorAll('input').forEach(input => {
    input?.addEventListener('input', function() {
        this.classList.remove('error');
    });
});

['new', 'current'].forEach(el => {
    document.getElementById(`${el}-partners-send`).addEventListener('click', (e) => {
        e.preventDefault();

        // get values
        const companyName = document.getElementById(`${el}-company-name`)?.value.trim();
        const phone = document.getElementById(`${el}-phone`)?.value.trim();
        const email = document.getElementById(`${el}-email`)?.value.trim();
        const message = document.getElementById(`${el}-message`)?.value.trim();

        let error = false;
        if (!companyName) {
            document.getElementById(`${el}-company-name`).classList.add('error');
            error = true;
        }
        if (el == 'new' && !phone) {
            document.getElementById(`${el}-phone`).classList.add('error');
            error = true;
        }
        if (!email) {
            document.getElementById(`${el}-email`).classList.add('error');
            error = true;
        }

        if (error) return;

        //send
        var xhr = new XMLHttpRequest();

        var json = JSON.stringify({
            companyName,
            phone,
            email,
            message,
            type: el,
        });
        console.log(json);

        xhr.open("POST", '/include/send_form_christmas.php');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.send(json);

        xhr.onload = () => {
            console.log(xhr);
            if (xhr.responseText == 'success') {
                //clear
                document.getElementById(`${el}-company-name`).value = '';
                if (el == 'new')
                    document.getElementById(`${el}-phone`).value = '';
                document.getElementById(`${el}-email`).value = '';
                document.getElementById(`${el}-message`).value = '';

                //show thanks
                modalForm.classList.add('d-none');
                modalThanks.classList.remove('d-none');
            }
        }
    })    
});

document.querySelector('.modal__thanks-btn').addEventListener('click', () => {
    closeModal();
    setTimeout(() => {
        modalForm.classList.remove('d-none');
        modalThanks.classList.add('d-none');
    }, 300);
})