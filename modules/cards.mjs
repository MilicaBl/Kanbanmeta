import { saveToLs, getDataFromLS, clearLS, getLoggedInUser } from "./handleLS.mjs";
import { showRightView } from "../script.js";
import { allowDrop, drag, drop } from "./dragAndDrop.mjs";

// Function to create element
function createElement(tag, classes = [], content = "") {
  const element = document.createElement(tag);
  // The spread operator makes it possible to add more than one class at the same time (...classes)
  if (classes.length) element.classList.add(...classes);
  if (content) element.textContent = content;
  return element;
}

// Function to create a card column
export function renderCardColumn(title) {
  const column = createElement("div", ["card-column"]);
  const columnTitle = createElement("h2", [], title);
  const cardBody = createElement("div", ["card-body"]);

  column.append(columnTitle, cardBody, createAddCardButton(cardBody, title));

  getSavedCards(title, cardBody);
  setupDragAndDrop(column, title);

  return column;
}

// Add card button
function createAddCardButton(cardBody, title) {
  const addCardBtn = createElement("button",["add-card-btn"],"Lägg till ett kort");
  addCardBtn.addEventListener("click", () => createCard(cardBody, title));

  return addCardBtn;
}
export function renderMainBoard() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const headerWrapper = createElement("div",["header-wrapper"]);
  const userName = capitalizeFirstLetter()
  const welcomeText = createElement("p",["welcome-text"], `Välkommen ${userName}! Du är nu inloggad.`);
 
  const logoutButton = createElement("button",["logout-btn"], "Logga ut");
  logoutButton.type = "button";
  logoutButton.addEventListener("click",()=> {
    localStorage.removeItem("loggedInUser");
    showRightView();
  });

  headerWrapper.append(welcomeText, logoutButton);
 
  const mainContainer = createElement("div",["main-container"]);

  const columns = ["To do", "Doing", "Testing", "Done"];
  columns.forEach(title => {
    const column = renderCardColumn(title);
    mainContainer.appendChild(column);
  });

  root.appendChild(headerWrapper);
  root.appendChild(mainContainer);
}

function capitalizeFirstLetter(){
  let userName = getLoggedInUser();
  return userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
}
export function createCard(column, title) {
  const cardInput = createElement("div", ["cardInput"]);
  cardInput.contentEditable = "true";
  const saveCardBtn = createElement("button", ["saveCardBtn"], "Spara");
  const cancelIcon = createElement("i", ["fa-solid", "fa-xmark"]);
  const saveAndCancelButtons = createElement("div", ["saveCancel"]);

  saveAndCancelButtons.append(saveCardBtn, cancelIcon);
  column.append(cardInput, saveAndCancelButtons);

  cancelIcon.addEventListener("click", () => {
    cardInput.remove();
    saveAndCancelButtons.remove();
  });
  saveCardBtn.addEventListener("click", () =>
    saveCard(cardInput, title, column)
  );
  cardInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") saveCard(cardInput, title, column);
  });
}
// Function to saveCard
function saveCard(cardInput, title, column) {
  const cardText = cardInput.innerText.trim();

  // checking so the card text is not empty
  if (cardText !== "") {
    let cardInfo = { text: cardText, id: Date.now() };
    saveToLs(title, cardInfo);
    cardInput.remove();
    getSavedCards(title, column);
  }
}
//Function to set up drag and drop events for a column
function setupDragAndDrop(column, title) {
  column.addEventListener("dragover", allowDrop);
  column.addEventListener("drop", (element) => drop(element, title));
}

// Function to get saved cards and render them
function getSavedCards(title, cardBody) {
  const savedCards = getDataFromLS(title);
  cardBody.innerHTML = "";

  savedCards.forEach((card) => {
    const cardBox = createElement("div", ["card"]);
    cardBox.id = card.id;
    cardBox.draggable = "true";

    const savedCardText = createElement("p", [], card.text);
    // Icon container
    const cardIcons = createElement("div", ["card-icons"]);
    const removeCardIcon = createElement("i", ["fa-solid", "fa-trash-can"]);
    const editTextIcon = createElement("i", ["fa-solid", "fa-pen-to-square"]);

    removeCardIcon.addEventListener("click", () => {
      clearLS(title, card);
      renderMainBoard(title);
    });
  
    editTextIcon.addEventListener("click", () => {
      savedCardText.contentEditable = "true";
      savedCardText.focus();
    });
  
    savedCardText.addEventListener("blur", () => {
      savedCardText.contentEditable = "false";
      const updatedCard = { text: savedCardText.innerText, id: card.id };
      saveToLs(title, updatedCard);
      card = updatedCard;
    });
    cardIcons.append(removeCardIcon, editTextIcon);
    cardBox.append(savedCardText, cardIcons);
    cardBox.addEventListener("dragstart", (event) => drag(event, title, card));
    cardBody.appendChild(cardBox);
  });
}