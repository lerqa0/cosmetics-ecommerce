const toggleShowPasswordButton = document.getElementById('toggle-show-password');
const passwordInput = document.getElementById('password');

const defaultIcon = './sources/eye.png';
const customIcon = './sources/eye-cutted.png';

toggleShowPasswordButton.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleShowPasswordButton.src = customIcon

        return;
    }

    if (passwordInput.type === 'text') {
        passwordInput.type = 'password';
        toggleShowPasswordButton.src = defaultIcon
    }
})

const toggleShowPasswordButtonConfirm = document.getElementById('toggle-show-password-confirm');
const passwordConfirmInput = document.getElementById('password-confirm');

toggleShowPasswordButtonConfirm.addEventListener('click', () => {
    if (passwordConfirmInput.type === 'password') {
        passwordConfirmInput.type = 'text';
        toggleShowPasswordButtonConfirm.src = customIcon

        return;
    }

    if (passwordConfirmInput.type === 'text') {
        passwordConfirmInput.type = 'password';
        toggleShowPasswordButtonConfirm .src = defaultIcon
    }
})
