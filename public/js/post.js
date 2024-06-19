const newPost = document.getElementById("newPost");
const newPostForm = document.getElementById("newPostForm");

newPost.addEventListener("click", () => {
  newPostForm.style.display = "block";
});

newPostForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const postTitle = document.getElementById("postTitle").value;
  const postContent = document.getElementById("postContent").value;

  if (postTitle && postContent) {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: postTitle, content: postContent }),
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        throw new Error("Failed to create post.");
      }
    } catch (error) {
      alert(error.message);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-post");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const postId = event.target.getAttribute("data-id");

      if (postId) {
        try {
          const response = await fetch(`/api/posts/${postId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            document.location.reload();
          } else {
            alert("Failed to delete post.");
          }
        } catch (error) {
          alert("Failed to delete post.");
        }
      }
    });
  });
});
