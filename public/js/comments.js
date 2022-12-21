const commentBtn = document.getElementById("comment-button");

const saveComment = async () => {
  // event.preventDefault();

  const url = window.location.href;
  const commentText = document.querySelector("#comment-text").value.trim();
  const id = url.charAt(url.length - 1);
  console.log(commentText);

  if (commentText) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "POST",
      body: JSON.stringify({
        text: commentText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to update post");
    }
  }
};
commentBtn.onclick = function () {
  saveComment();
};
