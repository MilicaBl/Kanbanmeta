import { saveToLs, getDataFromLS, clearLS } from "./handleLS.mjs";
import { showRightView } from "../script.js";
import { allowDrop, drag, drop } from "./dragAndDrop.mjs"

// Function to create a card column
export function renderCardColumn(title) {
  const column = document.createElement("div");
  column.classList.add("card-column");

  // Column title
  const columnTitle = document.createElement("h2");
  columnTitle.textContent = title;
  column.appendChild(columnTitle);

  // Column body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  column.appendChild(cardBody);

  getSavedCards(title, cardBody);
  column.addEventListener("dragover", allowDrop);
  column.addEventListener("drop", drop);
  // Add card button
  const addCardBtn = document.createElement("button");
  addCardBtn.classList.add("add-card-btn");
  addCardBtn.textContent = "Lägg till ett kort";
  column.appendChild(addCardBtn);

  addCardBtn.addEventListener("click", function () {
    createCard(cardBody, title);
  });

  return column;
}

//Add logout button
const logoutButton = document.createElement("button");
logoutButton.type = "button";
logoutButton.textContent = "Logga ut";

logoutButton.addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  showRightView();
});

// Function to create main board with all columns
export function renderMainBoard(username) {
  const root = document.getElementById("root");
  root.innerHTML = "";

  let p = document.createElement("p");
  p.textContent = `Välkommen ${username}! Du är nu inloggad`;
  // Create main container
  const mainContainer = document.createElement("div");
  mainContainer.classList.add("main-container");

  // Create each card folumn
  const columns = ["To do", "Doing", "Testing", "Done"];
  columns.forEach((title) => {
    const column = renderCardColumn(title);

    mainContainer.appendChild(column);
  });

  mainContainer.appendChild(logoutButton);
  mainContainer.appendChild(p);

  root.appendChild(mainContainer);
}

export function createCard(column, title) {
  let cardInput = document.createElement("div");
  cardInput.className = "cardInput";
  cardInput.contentEditable = "true";
  column.appendChild(cardInput);

  let saveCardBtn = document.createElement("button");
  saveCardBtn.className = "saveCardBtn";
  saveCardBtn.innerText = "Spara";

  // let buttonsdiv = document.createElement("div");
  // buttonsdiv.className = "buttonsdiv";

  // buttonsdiv.appendChild(saveCardBtn);

  column.append(cardInput, saveCardBtn);
  // column.appendChild(buttonsdiv);

  saveCardBtn.addEventListener("click", function () {
    let cardId = Date.now();
    console.log(cardId);
    let cardText = cardInput.innerText;
    let cardInfo = {
      text: cardText,
      id: cardId
    };
    saveToLs(title, cardInfo);
    cardInput.remove();
    // buttonsdiv.remove();
    getSavedCards(title, column);
  });
}

function getSavedCards(title, cardBody) {
  let savedCards = getDataFromLS(title);
  cardBody.innerHTML = "";
  savedCards.forEach((card) => {
    let cardBox = document.createElement("div");
    let removeCardBtn = document.createElement("button");
    removeCardBtn.className = "removeCardBtn";
    removeCardBtn.innerText = "Radera";
    let savedCardText = document.createElement("p");
    savedCardText.innerText = card.text;
    console.log(card.id);
    removeCardBtn.addEventListener("click", function () {
      clearLS(title, card);
      renderMainBoard(title);
    });
    cardBox.id = card.id;
    console.log(cardBox.id);
    cardBox.append(savedCardText, removeCardBtn);
    cardBox.draggable = "true";
    cardBox.addEventListener("dragstart", drag);
    cardBody.appendChild(cardBox);
  });
}