//Inloggningsfunktionen
import { showRightView } from "../script.js";

function createLoginForm() {
  const form = document.createElement("form");
  const usernameInput = createInput("text", "Användarnamn", "username");
  const passwordInput = createInput("password", "Lösenord", "password");
  const loginButton = createButton("Logga in", "login-button");
  form.append(usernameInput, passwordInput, loginButton);
  return form;
}
function createInput(type, placeholder, id) {
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.id = id;
  input.required = true;
  return input;
}
function createButton(text, id) {
  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = text;
  button.id = id;
  return button;
}
function createElement(tag, id, content = "") {
  const element = document.createElement(tag);
  element.id = id;
  if (content) element.textContent = content;
  return element;
}
export function loginPage() {
  // Usernames and passwords for login
  const usernames = ["MAX", "VILLIAM", "ADAM", "MILICA", "JANNE"];
  const passwords = ["1234", "1234", "1234", "1234", "1234"];

  // Get the root element and clear its content
  const root = document.getElementById("root");
  root.innerHTML = "";

  // Create a container for the login form and the HTML elements for the login form
  const loginContainer = createElement("div", "login-container");
  const header = createElement("h1", "header", "Trello v2");
  const slogan = createElement("h2", "slogan", "Organisera arbetsdagen");
  const todo = createElement("img", "todo-img");
  todo.src = "https://github.com/MilicaBl/Kanbanmeta/Bilder/todolist.png";
  const loginText = createElement("p", "login-text", "Logga in");
  const loginInfo = createElement("p", "login-info", "Fortsätt till Trello v2");
  const form = createLoginForm();

  loginContainer.append(loginText, loginInfo, todo, slogan, header, form);
  root.appendChild(loginContainer);

  // Event listener for user login
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get the username and password from the form
    const username = document.getElementById("username").value.toUpperCase();
    const password = document.getElementById("password").value;

    // Check if the username and password exist in the usernames and passwords arrays
    const userIndex = usernames.indexOf(username);

    // Remove the error message if it already exists
    const errorMessage = document.getElementById("error-message");

    if (errorMessage) {
      errorMessage.remove();
    }

    // If the username and password exist in the arrays, display a welcome message
    if (userIndex !== -1 && passwords[userIndex] === password) {
      // Save a unique localStorage entry for each user
      localStorage.setItem(username, "loggedIn");

      // Save the logged-in user in localStorage
      localStorage.setItem("loggedInUser", username);
      showRightView();

      // If the username and password do not exist in the arrays, display an error message
    } else {
      const p = createElement("p", "error-message", "Fel användarnamn eller lösenord");
      loginContainer.appendChild(p);
    }
  });
}
