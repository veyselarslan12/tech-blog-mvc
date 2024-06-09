const newPost = document.getElementById('newPost')
const newPostForm = document.getElementById('newPostForm')
const postTitle = document.getElementById('postTitle').value
const postContent = document.getElementById('postContent').value

newPost.addEventListener('click', () => {
    newPostForm.style.display = 'block'
})

newPostForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (postTitle && postContent) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postTitle, postContent })
        })

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Failed to create post.')
        }
    }
})