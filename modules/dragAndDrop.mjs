import { renderMainBoard } from "./cards.mjs";
import { clearLS, saveToLs } from "./handleLS.mjs";

export function allowDrop(ev) {
  ev.preventDefault();
}

// Start dragging an element
export function drag(ev, column, card) {
  ev.dataTransfer.setData("cardId", ev.target.id);
  ev.dataTransfer.setData("card", JSON.stringify(card));
  // Remove the card from localStorage in the original column
  clearLS(column, card);
}

// Drop the element
export function drop(ev, column) {
  ev.preventDefault();

  const cardId = ev.dataTransfer.getData("cardId");
  const card = JSON.parse(ev.dataTransfer.getData("card"));

  ev.target.append(document.getElementById(cardId));
  saveToLs(column, card);
  renderMainBoard();
}
