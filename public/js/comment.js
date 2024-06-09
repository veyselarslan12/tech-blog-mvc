const newCommentForm = document.getElementById('newCommentForm')
const comment_text = document.getElementById('commentText').value
const post_id = window.location.pathname.split('/').pop()

newCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (comment_text) {
        const reponse = await fetch('/api/comments', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ comment_text, post_id })
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to add comment')
        }
    }
})

