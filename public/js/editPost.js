var updateBtn = document.getElementById("update-button");
var deleteBtn = document.getElementById("delete-button");

const updatePost = async (event) => {
  event.preventDefault();
  let element = event.target;
  console.log(element);

  const title = document.querySelector("#update-title").value.trim();
  const text = document.querySelector("#update-text").value.trim();
  const id = document.querySelector("#update-id").value.trim();
  console.log("Here!!!!!!!!", title, text, id);

  if (title && text) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        text: text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update post");
    }
  }
};

const deletePost = async (event) => {
  event.preventDefault();
  const id = document.querySelector("#update-id").value.trim();

  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post");
  }
};

updateBtn.addEventListener("click", updatePost());

deleteBtn.addEventListener("click", deletePost());
