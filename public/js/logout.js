const logOut = document.getElementById('logout')

logOut.addEventListener('click', async() => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        }
    })

    if (response.ok) {
        location.replace('/')
    } else {
        alert('Failed to log out.')
    }
})