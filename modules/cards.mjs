import { saveToLs, getDataFromLS, clearLS, getLoggedInUser } from "./handleLS.mjs";
import { showRightView } from "../script.js";
import { allowDrop, drag, drop } from "./dragAndDrop.mjs";

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
  column.addEventListener("drop", function (element) {
    drop(element, title);
  });
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
export function renderMainBoard() {
  console.log("körs");
  const root = document.getElementById("root");
  root.innerHTML = "";

  let userName = getLoggedInUser()
  
  let p = document.createElement("p");
  p.textContent = `Välkommen ${userName}! Du är nu inloggad`;
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

  let cancelIcon = document.createElement("i");
  cancelIcon.className = "fa-solid fa-xmark";
  
  let saveAndCancelButtons = document.createElement("div");
  saveAndCancelButtons.className = "saveCancel";

  saveAndCancelButtons.appendChild(saveCardBtn);
  saveAndCancelButtons.appendChild(cancelIcon);

  // let buttonsdiv = document.createElement("div");
  // buttonsdiv.className = "buttonsdiv";

  // buttonsdiv.appendChild(saveCardBtn);

  column.append(cardInput, saveAndCancelButtons);
  // column.appendChild(buttonsdiv);

  cancelIcon.addEventListener("click", function () {
    cardInput.remove();
    saveAndCancelButtons.remove();
  });

  saveCardBtn.addEventListener("click", function () {
    let cardId = Date.now();
    console.log(cardId);
    let cardText = cardInput.innerText.trim();

    // checking so the card text is not empty
    if (cardText !== "") {

      let cardInfo  = {
      text: cardText,
      id: cardId

    };

    saveToLs(title, cardInfo);
    cardInput.remove();
    // buttonsdiv.remove();
    getSavedCards(title, column);
    }
  });

cardInput.addEventListener("keydown", function (event) {
  
  if (event.key === "Enter") {
    let cardId = Date.now();
    let cardText = cardInput.innerText.trim();
    // checking so the card text is not empty
    if (cardText !== "") {

      let cardInfo = {
        text: cardText,
        id: cardId

      };

      saveToLs(title, cardInfo);
      cardInput.remove(); 
      getSavedCards(title, column);
    }
  }
});

}

function getSavedCards(title, cardBody) {
  let savedCards = getDataFromLS(title);
  cardBody.innerHTML = "";

  savedCards.forEach((card) => {
    let cardBox = document.createElement("div");
    cardBox.classList.add("card");

    // Icon container
    let cardIcons = document.createElement("div");
    cardIcons.classList.add("card-icons");

    let removeCardIcon = document.createElement("i");
    removeCardIcon.className = "fa-solid fa-trash-can";

    let editTextIcon = document.createElement("i");
    editTextIcon.className = "fa-solid fa-pen-to-square";

    let savedCardText = document.createElement("p");
    savedCardText.innerText = card.text;

    removeCardIcon.addEventListener("click", function () {
      clearLS(title, card);
      renderMainBoard(title);
    });

    editTextIcon.addEventListener("click", function () {
      savedCardText.contentEditable = "true";
      savedCardText.focus();
    });

    savedCardText.addEventListener("blur", function () {
      savedCardText.contentEditable = "false";
      let updatedCard = {
        text: savedCardText.innerText,
        id: card.id
      };
      saveToLs(title, updatedCard);
      card=updatedCard;
    });

    cardBox.id = card.id;
    cardBox.draggable = "true";
    cardBox.addEventListener("dragstart", function (event) {
      drag(event, title, card);
    });

  
    cardIcons.append(removeCardIcon, editTextIcon);
    
    cardBox.append(savedCardText, cardIcons);

    cardBody.appendChild(cardBox);
  });
}
