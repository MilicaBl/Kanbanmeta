import { loginPage } from "./modules/login.mjs";
import { renderMainBoard } from "./modules/cards.mjs";
import {getLoggedInUser} from "./modules/handleLS.mjs";

export function showRightView() {
  let loggedInUser = getLoggedInUser()
  const root = document.getElementById("root");
  root.innerHTML = "";
  if(loggedInUser){
    renderMainBoard()
  }else loginPage()
}
showRightView();
