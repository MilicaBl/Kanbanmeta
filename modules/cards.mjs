import { loginPage } from "./login.mjs";
import { saveToLs } from "./handleLS.mjs";
import { clearLS } from "./handleLS.mjs";
import { showRightView } from "../script.js";
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

  // Add card button
  const addCardBtn = document.createElement("button");
  addCardBtn.classList.add("add-card-btn");
  addCardBtn.textContent = "Lägg till ett kort";
  column.appendChild(addCardBtn);

  addCardBtn.addEventListener("click", function()
  {
    createCard(cardBody);
  })

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

export function createCard(column)
{
  let cardInput = document.createElement("div");
  cardInput.className = "cardInput";
  cardInput.contentEditable = "true";
  
  let saveCardBtn = document.createElement("button");
  saveCardBtn.className = "saveCardBtn";
  saveCardBtn.innerText = "Spara";

  let removeCardBtn = document.createElement("button");
  removeCardBtn.className = "removeCardBtn";
  removeCardBtn.innerText = "Radera";

  let buttonsdiv = document.createElement("div");
  buttonsdiv.className = "buttonsdiv";
  buttonsdiv.appendChild(saveCardBtn);
  buttonsdiv.appendChild(removeCardBtn);

  column.appendChild(cardInput);
  column.appendChild(buttonsdiv);

  let cardText = cardInput.innerText;
  saveCardBtn.addEventListener("click", function()
  {
    saveToLs(column, cardText);
  })

  removeCardBtn.addEventListener("click", function()
  {
    cardInput.remove();
    buttonsdiv.remove();
    clearLS(column, cardText);
  })
}