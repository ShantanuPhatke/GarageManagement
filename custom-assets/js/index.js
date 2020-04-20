function login() {
  const uid = document.getElementById("uid_field").value;
  const password = document.getElementById("password_field").value;

  // Get a reference to the database service
  const ref = firebase.database().ref("users");
  ref
    .orderByChild("uid")
    .equalTo(uid)
    .once("value", (snapshot) => {

      if (snapshot.exists()) {
        if (password == snapshot.child(uid).child("password").val()) {

          const userData = snapshot.child(uid);
          // console.log(userData);

          const userDetails = {
            uid: userData.child("uid").val(),
            name: userData.child("name").val(),
            type: userData.child("type").val()
          };
          localStorage.setItem("user", JSON.stringify(userDetails));

          const userType = userData.child("type").val()
          console.log(userType);

          switch (userType) {
            case "admin": window.location.href = "./../../profile.html"
              break;
            case "receptionist": window.location.href = "./../../reception.html"
              break;
            case "supervisor": window.location.href = "./../../supervisor.html"
              break;
            case "technician": window.location.href = "./../../technician.html"
              break;
            default: window.location.href = "./../../index.html"
              break;
          }

        } else {
          let errorMessage = "Invalid password";
          alert(errorMessage);
        }
      } else {
        let errorMessage = "Invalid UID";
        alert(errorMessage);
      }

    });
}
