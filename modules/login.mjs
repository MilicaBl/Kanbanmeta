export function loginPage() {

    const usernames = ['max', 'villiam', 'adam', 'milicia', 'janne'];
    const passwords = ['1234', '1234', '1234', '1234', '1234'];

    const root = document.getElementById('root');
    root.innerHTML = '';

    const loginContainer = document.createElement('div');
    loginContainer.id = 'login-container';

    const header = document.createElement('h1');
    header.textContent = 'Trello v2';

    const form = document.createElement('form');

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Användarnamn';
    usernameInput.id = 'username';
    usernameInput.required = true;

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Lösenord';
    passwordInput.id = 'password';
    passwordInput.required = true;

    const loginButton = document.createElement('button');
    loginButton.type = 'submit';
    loginButton.textContent = 'Logga in';

    form.appendChild(usernameInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));
    form.appendChild(passwordInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));
    form.appendChild(loginButton);

    loginContainer.appendChild(header);
    loginContainer.appendChild(form);

    root.appendChild(loginContainer);

    
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const userIndex = usernames.indexOf(username);

        if (userIndex !== -1 && passwords[userIndex] === password) {

            localStorage.setItem('inLoggad', 'true');

            let p = document.createElement('p');
            p.textContent = 'Du är nu inloggad';
            loginContainer.appendChild(p);

        } else {

            let p = document.createElement('p');
            p.textContent = 'Fel användarnamn eller lösenord';
            loginContainer.appendChild(p);

        }
    });
}

