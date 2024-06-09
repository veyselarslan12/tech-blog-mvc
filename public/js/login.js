const loginForm = document.getElementById('loginForm')
const signupForm = document.getElementById('signupForm')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if ( username && password ) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
    }

    if (response.ok) {
        location.replace('/')
    } else {
        alert('Failed to log in.')
    }
})

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if ( username && password ) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
    }

    if (response.ok) {
        location.replace('/')
    } else {
        alert('Failed to sign up.')
    }
})
