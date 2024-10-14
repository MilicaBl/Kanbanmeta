import { renderMainBoard } from "./cards.mjs";
import { clearLS, saveToLs } from "./handleLS.mjs";

export function allowDrop(ev) {
  console.log("allowDrop", ev);
  ev.preventDefault();
}

export function drag(ev, column, card) {
  ev.dataTransfer.setData("cardId", ev.target.id);
  ev.dataTransfer.setData("card", JSON.stringify(card));
  clearLS(column, card);
}

export function drop(ev, column) {
  console.log("drop", ev);
  ev.preventDefault();
  var data = ev.dataTransfer.getData("cardId");
  var card = JSON.parse(ev.dataTransfer.getData("card"));
  console.log("card i drop", card);
  ev.target.append(document.getElementById(data));
  saveToLs(column, card);
  renderMainBoard();
}
