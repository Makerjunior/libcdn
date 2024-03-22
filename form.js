function showAlert(form, message) {
    var existingAlert = form.parentElement.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    var alertElement = document.createElement("div");
    alertElement.className = "alert";
    alertElement.textContent = message;

    form.insertAdjacentElement('afterend', alertElement);

    setTimeout(function() {
        alertElement.remove();
    }, 3000);
}

function validateForm(form) {
    var email = form.querySelector('input[type="email"]').value;
    var password = form.querySelector('input[type="password"]').value;

    if (email == "") {
        showAlert(form, "Por favor, insira seu endereço de email.");
        return false;
    }

    if (password == "") {
        showAlert(form, "Por favor, insira sua senha.");
        return false;
    }

    if (form.getAttribute('action') === "/register" && password.length < 8) {
        showAlert(form, "A senha deve ter pelo menos 8 caracteres.");
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert(form, "Por favor, insira um endereço de email válido.");
        return false;
    }

    return true;
}

document.querySelectorAll("form").forEach(function(form) {
    form.addEventListener("submit", function(event) {
        if (!validateForm(form)) {
            event.preventDefault();
        }
    });
});

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    h1 {
        color: #333;
    }

    form {
        width: 300px;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    input[type="email"],
    input[type="password"] {
        width: calc(100% - 20px);
        padding: 10px;
        margin: 8px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    button[type="submit"],
    button[type="button"] {
        width: 100%;
        background-color: #4caf50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    button[type="submit"]:hover,
    button[type="button"]:hover {
        background-color: #45a049;
    }

    a {
        color: #4caf50;
        text-decoration: none;
        margin-top: 10px;
    }

    a:hover {
        text-decoration: underline;
    }

    label {
        display: block;
        text-align: left;
        color: #333;
        margin-bottom: 2px;
    }

    .alert {
        position: fixed;
        border-radius: 4px;
        height: 50%;
        width: 50%;
        font-size: 30px;
        z-index: 9999;
        color: #ffffff;
        background-color: #f44336;
    }
`;
document.getElementsByTagName('head')[0].appendChild(style);
