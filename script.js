import { loginPage } from "./modules/login.mjs";
import { renderMainBoard } from "./modules/cards.mjs";

export function showRightView() {
  let loggedInUser = localStorage.getItem("loggedInUser");
  localStorage.getItem("loggedInUser") ? renderMainBoard() : loginPage();
  console.log(loggedInUser);
}
showRightView();
