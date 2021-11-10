function login() {
  const uid = document.getElementById("uid_field").value
  const password = document.getElementById("password_field").value

  if (uid.startsWith("c")) {
    // For customers
    const ref = firebase.database().ref("customers")
    ref.once("value", (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((userSnapshot) => {
          if (uid == userSnapshot.child("uid").val()) {
            if (password == userSnapshot.child("password").val()) {
              const userDetails = {
                uid: userSnapshot.child("uid").val(),
                name: userSnapshot.child("fname").val(),
                type: userSnapshot.child("type").val(),
              }
              localStorage.setItem("user", JSON.stringify(userDetails))

              window.location.href = "./../../customer.html"
            } else {
              let errorMessage = "Invalid password"
              alert(errorMessage)
            }
          }
        })
      } else {
        let errorMessage = "No users found"
        alert(errorMessage)
      }
    })
  } else {
    // For employees
    const ref = firebase.database().ref("users")
    ref
      .orderByChild("uid")
      .equalTo(uid)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          if (password == snapshot.child(uid).child("password").val()) {
            const userData = snapshot.child(uid)
            // console.log(userData);

            const userDetails = {
              uid: userData.child("uid").val(),
              name: userData.child("name").val(),
              type: userData.child("type").val(),
            }
            localStorage.setItem("user", JSON.stringify(userDetails))

            const userType = userData.child("type").val()
            console.log(userType)

            switch (userType) {
              case "customer":
                window.location.href = "./../../customer.html"
                break
              case "receptionist":
                window.location.href = "./../../reception.html"
                break
              case "supervisor":
                window.location.href = "./../../supervisor.html"
                break
              case "technician":
                window.location.href = "./../../technician.html"
                break
              case "wash":
                window.location.href = "./../../wash.html"
                break
              case "inspector":
                window.location.href = "./../../inspector.html"
                break
              case "billing":
                window.location.href = "./../../billing.html"
                break
              case "hr":
                window.location.href = "./../../hr.html"
                break
              default:
                window.location.href = "./../../index.html"
                break
            }
          } else {
            let errorMessage = "Invalid password"
            alert(errorMessage)
          }
        } else {
          let errorMessage = "Invalid UID"
          alert(errorMessage)
        }
      })
  }
}

document.getElementById("login-submit").addEventListener("click", (e) => {
  e.preventDefault()
  login()
})
