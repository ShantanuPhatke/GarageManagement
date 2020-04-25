const setUsername = () => {
  const userData = JSON.parse(localStorage.getItem("user"))
  const name = userData.name

  const usernameElements = document.getElementsByClassName("username")

  for (let x = 0; x < usernameElements.length; x++) {
    usernameElements[x].innerHTML = name

  }
}


const logout = () => {
  localStorage.clear()
  window.location.href = "./../../index.html"
}