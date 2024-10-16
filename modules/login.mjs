//Inloggningsfunktionen
import { showRightView } from "../script.js";
// import { renderMainBoard } from "./cards.mjs";

export function loginPage() {
  //Användarnamn och lösenord för inloggning
  const usernames = ["max", "villiam", "adam", "milica", "janne"];
  const passwords = ["1234", "1234", "1234", "1234", "1234"];

  //Hämtar root-elementet och tar bort allt innehåll i root
  const root = document.getElementById("root");
  root.innerHTML = "";

  //Skapar en container för inloggningsformuläret, samt html-elementen för inloggningsformuläret
  const loginContainer = document.createElement("div");
  loginContainer.id = "login-container";

  const header = document.createElement("h1");
  header.textContent = "Trello v2";
  header.id = "header";

  const slogan = document.createElement("h2");
  slogan.textContent = "Organisera arbetsdagen";
  slogan.id = "slogan";

  const todo = document.createElement("img");
  todo.src = "/bilder/todolist.png";
  todo.id = "todo-img";

  const loginText = document.createElement("p");
  loginText.textContent = "Logga in";
  loginText.id = "login-text";

  const loginInfo = document.createElement("p");
  loginInfo.textContent = "Fortsätt till Trello v2";
  loginInfo.id = "login-info";

  const form = document.createElement("form");

  const usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.placeholder = "Användarnamn";
  usernameInput.id = "username";
  usernameInput.required = true;

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Lösenord";
  passwordInput.id = "password";
  passwordInput.required = true;

  const loginButton = document.createElement("button");
  loginButton.type = "submit";
  loginButton.textContent = "Logga in";
  loginButton.id = "login-button";

  form.appendChild(usernameInput);
  form.appendChild(passwordInput);
  form.appendChild(loginButton);

  loginContainer.appendChild(loginText);
  loginContainer.appendChild(loginInfo);
  loginContainer.appendChild(todo);
  loginContainer.appendChild(slogan);
  loginContainer.appendChild(header);
  loginContainer.appendChild(form);

  root.appendChild(loginContainer);

  //Eventlistener för inloggning av användare
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    //Hämtar användarnamn och lösenord från formuläret
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //Kollar om användarnamn och lösenord finns i arrayerna usernames och passwords
    const userIndex = usernames.indexOf(username);

    //Tar bort felmeddelande om det redan finns ett
    const errorMessage = document.getElementById("error-message");

    if (errorMessage) {
      errorMessage.remove();
    }

    //Om användarnamn och lösenord finns i arrayerna visas en välkomsttext
    if (userIndex !== -1 && passwords[userIndex] === password) {
      //Sparar ett unikt localStorage för varje användare
      localStorage.setItem(username, "loggedIn");

      //Sparar den inloggade användaren i localStorage
      localStorage.setItem("loggedInUser", username);
        showRightView()
    //   renderMainBoard();

      //Om användarnamn och lösenord inte finns i arrayerna visas ett felmeddelande
    } else {
      let p = document.createElement("p");
      p.id = "error-message";
      p.textContent = "Fel användarnamn eller lösenord";
      loginContainer.appendChild(p);
    }
  });
}
