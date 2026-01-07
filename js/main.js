const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('gloDelivery');

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');

    if (!modalAuth.classList.contains('is-open')) {
        loginInput.style.borderColor = '';
    }
}

function logOut() {
    login = null;
    localStorage.removeItem('gloDelivery');

    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';

    buttonOut.removeEventListener('click', logOut);

    checkAuth();
}

function logIn(event) {
    event.preventDefault();

    if (loginInput.value.trim()) {
        loginInput.style.borderColor = '';

        login = loginInput.value;
        localStorage.setItem('gloDelivery', login);

        toggleModalAuth();

        buttonAuth.removeEventListener('click', toggleModalAuth);
        closeAuth.removeEventListener('click', toggleModalAuth);
        logInForm.removeEventListener('submit', logIn);

        logInForm.reset();
        checkAuth();
    } else {
        loginInput.style.borderColor = '#ff0000';
        alert('Будь ласка, введіть логін');
    }
}

function authorized() {
    console.log('Авторизовано');

    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'flex';

    buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
    console.log('Не авторизовано');

    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

function toggleModal() {
    modal.classList.toggle("is-open");
}
cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

checkAuth();
