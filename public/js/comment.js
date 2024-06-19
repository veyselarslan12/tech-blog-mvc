const newCommentForm = document.getElementById("newCommentForm");

newCommentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const comment_text = document.getElementById("commentText").value;
  const post_id = window.location.pathname.split("/").pop();

  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment_text, post_id }),
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to add comment");
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-comment');
  
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const commentId = event.target.getAttribute('data-id');
  
        if (commentId) {
          try {
            const response = await fetch(`/api/comments/${commentId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });
  
            if (response.ok) {
              document.location.reload();
            } else {
              alert('Failed to delete comment.');
            }
          } catch (error) {
            alert('Failed to delete comment.');
          }
        }
      });
    });
  });
  