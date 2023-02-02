let elForm = document.querySelector(".form");
let elInput = document.querySelector(".form-input");
let elList = document.querySelector(".js-list");
let elBtnFavour = document.querySelector(".js-btn-favourite");
let elBookmarkList = document.querySelector(".js-bookmarklist");
let API_KEY = "11b76425";

const bookmarkList = new Set();

let listArr = JSON.parse(window.localStorage.getItem("listArr")) || [];

function renderList(arr, element) {
  element.innerHTML = "";
  arr.map((item) => {
    let elItem = document.createElement("li");
    let elImg = document.createElement("img");
    let elTitle = document.createElement("h2");
    let elBtn = document.createElement("button");
    let elBtnFavourite = document.createElement("button");
    let elModal = document.querySelector(".js-modal");
    let modal = document.querySelector(".modal");

    elImg.setAttribute("class", "img");
    elBtn.setAttribute("class", "js-modalbtn");
    elBtnFavourite.setAttribute("class", "js-favouritebtn");
    elBtnFavourite.dataset.filmId = item.imdbID;

    elImg.src = item.Poster;
    elTitle.textContent = item.Title;
    elBtn.textContent = "More";
    elBtnFavourite.textContent = "Favourite";
    elItem.append(elImg, elTitle, elBtn, elBtnFavourite);

    element.appendChild(elItem);

    elBtn.addEventListener("click", () => {
      elModal.classList.remove("d-none");
      modal.innerHTML = "";
      let elImg1 = document.createElement("img");
      let elTitle1 = document.createElement("h2");
      let elYear = document.createElement("h2");
      let elBtn1 = document.createElement("button");

      elImg1.src = item.Poster;
      elTitle1.textContent = item.Title;
      elYear.textContent = item.Year;
      elBtn1.textContent = "Cancel";
      elBtn1.addEventListener("click", () => {
        elModal.classList.add("d-none");
      });
      modal.append(elImg1, elTitle1, elYear, elBtn1);
    });
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        elModal.classList.add("d-none");
      }
    });
  });
}

const renderBookmarkList = (arr, node) => {
  node.innerHTML = "";
  arr.forEach((item) => {
    const newItem = document.createElement("li");
    const newText = document.createElement("p");
    let elYear = document.createElement("p");
    const newDeleteBtn = document.createElement("button");

    newText.textContent = item.Title;
    elYear.textContent = item.Year;
    newDeleteBtn.innerHTML = "&times;";
    newDeleteBtn.setAttribute("class", "delete-bookmark");
    newDeleteBtn.dataset.filmId = item.imdbID;

    newItem.append(newText, elYear, newDeleteBtn);
    
    node.appendChild(newItem);
    elBtnFavour.addEventListener("click", function(evt){
    })
  });
};

renderList(listArr, elList);

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let elInputVal = elInput.value;
  fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${elInputVal}`)
    .then((res) => res.json())
    .then((data) => {
      renderList(data.Search, elList);
      window.localStorage.setItem("listArr", JSON.stringify(data.Search));
    });
});

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-favouritebtn")) {
    const filmId = evt.target.dataset.filmId;
    const findedFilm = listArr.find((film) => film.imdbID === filmId);
    bookmarkList.add(findedFilm);
    renderBookmarkList(bookmarkList, elBookmarkList);
  }
});

elBookmarkList.addEventListener("click", function (evt) {
  if (evt.target.matches(".delete-bookmark")) {
    const filmId = evt.target.dataset.filmId;
    const findedFilm = listArr.find((film) => film.imdbID === filmId);
    bookmarkList.delete(findedFilm);
    renderBookmarkList(bookmarkList, elBookmarkList);
  }
});