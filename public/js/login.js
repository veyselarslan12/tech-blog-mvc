const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = loginForm.querySelector('#username').value
    const password = loginForm.querySelector('#password').value

    if (username && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                throw new Error('Failed to log in.');
            }
        } catch (error) {
            alert(error.message);
        }
    }
});

signupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = signupForm.querySelector('#username').value
    const password = signupForm.querySelector('#password').value

    if (username && password) {
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                throw new Error('Failed to sign up.');
            }
        } catch (error) {
            alert(error.message);
        }
    }
});
