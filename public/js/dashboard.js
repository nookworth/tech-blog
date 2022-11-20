var postModal = document.getElementById("post-modal");
var updateModal = document.getElementById("update-modal");
var addBtn = document.getElementById("add-post");
var updateBtn = document.getElementById("update-post");
var span = document.getElementsByClassName("close")[0];

const savePost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const text = document.querySelector("#post-text").value.trim();

  if (title && text) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

const updatePost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#update-title").value.trim();
  const text = document.querySelector("#update-text").value.trim();

  if (title && text) {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        text,
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
  } else if (title && !text) {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
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
  } else if (text && !title) {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        text,
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

const closeModal = () => {
  postModal.style.display = "none";
  updateModal.style.display = "none";
};

addBtn.onclick = function () {
  postModal.style.display = "block";
};

updateBtn.onclick = function () {
  updateModal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == postModal) {
    postModal.style.display = "none";
  } else if (event.target == updateModal) {
    updateModal.style.display = "none";
  }
};

//Handlers for buttons inside the modals
document.querySelector(".close").addEventListener("click", savePost);
document.querySelector(".close").addEventListener("click", closeModal);
document.querySelector("#save-update").addEventListener("click", updatePost);
document.querySelector("#save-update").addEventListener("click", closeModal);
