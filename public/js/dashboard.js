var addModal = document.getElementById("add-modal");
var updateModal = document.getElementById("update-modal");
var addBtn = document.getElementById("add-post");
var updateBtns = document.getElementsByClassName("update-post");
var span = document.getElementsByClassName("close")[0];

console.log(addBtn);

const savePost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const text = document.querySelector("#post-text").value.trim();

  if (title && text) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
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
  addModal.style.display = "none";
  updateModal.style.display = "none";
};

addBtn.onclick = function () {
  addModal.style.display = "block";
};

for (let i = 0; i < updateBtns.length; i++) {
  updateBtns[i].setAttribute("id", `update-post-${i}`);
  console.log(updateBtns[i]);
}

window.onclick = function (event) {
  if (event.target == addModal) {
    addModal.style.display = "none";
  }
};

//Handlers for buttons inside the modals
document.querySelector("#add-button").addEventListener("click", savePost);
document.querySelector("#add-button").addEventListener("click", closeModal);
document.querySelector("#update-button").addEventListener("click", updatePost);
document.querySelector("#update-button").addEventListener("click", closeModal);
