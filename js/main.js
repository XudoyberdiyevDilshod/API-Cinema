let elForm = document.querySelector(".form");
let elInput = document.querySelector(".form-input");
let elList = document.querySelector(".js-list");
let API_KEY = "11b76425";

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
      let elBtn1 = document.createElement("button")

      elImg1.src = item.Poster;
      elTitle1.textContent = item.Title;
      elYear.textContent = item.Year;
      elBtn1.textContent = "Cancel"
      elBtn1.addEventListener("click",()=>{
         elModal.classList.add("d-none");
      })
      modal.append(elImg1, elTitle1,elYear, elBtn1);
    });
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        elModal.classList.add("d-none");
      }
    });


   //  elBtnFavourite("click", ()=> {

   //  })
  });
}

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
