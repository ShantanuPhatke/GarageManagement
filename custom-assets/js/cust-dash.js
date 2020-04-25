// let usernameObjects = document.getElementsByClassName("username");

// let userData = JSON.parse(localStorage.getItem("user"));

// for (const username in usernameObjects) {
//   usernameObjects[username].innerHTML = userData.name;
// }

function logout() {
  localStorage.clear();
  console.log("LOGGED OUT!");
}
