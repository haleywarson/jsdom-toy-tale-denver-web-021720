const toyURL = "http://localhost:3000/toys/"
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys()
});
// -----------
function fetchToys() {
  fetch(toyURL)
  .then(response => response.json())
  .then (toys => toys.forEach(toy => renderCard(toy)))
}

document.querySelector('.add-toy-form').addEventListener
("submit", (event) => {
  event.preventDefault();
  let newToy = {
    "name": event.target.name.value,
    "image": event.target.image.value,
    "likes": 0
  }
  postToy(newToy)
});

function postToy(newToy) {
  let options = {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(newToy)
  }
  fetch(toyURL, options)
  .then(response => response.json())
  .then(renderCard)   
}

function addLikes(toy, likes) {
  let likesCount = parseInt(likes.innerText) + 1
  let newLikes = {
    "likes": likesCount
  }

  let options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(newLikes)
  }

  fetch(toyURL + toy.id, options)
  .then(response => response.json())
  .then(updatedToy => likes.innerText = `${updatedToy.likes} Likes`)
}


function renderCard(toy) {
  const toyCollection = document.querySelector('#toy-collection')
  
  const toyCard = document.createElement('div');
  toyCard.setAttribute('class', 'card');

  const toyName = document.createElement('h2');
  toyName.textContent = toy.name;

  const toyImage = document.createElement('img');
  toyImage.src = toy.image;
  toyImage.setAttribute('class', 'toy-avatar');

  const likes = document.createElement('p');
  likes.textContent = `${toy.likes} Likes`

  const likeButton = document.createElement('button');
  likeButton.setAttribute('class', 'like-btn');
  likeButton.textContent = "Like";
  likeButton.addEventListener("click", () => { addLikes(toy, likes) })

  toyCard.append(toyName, toyImage, likes, likeButton)
  toyCollection.append(toyCard)
}