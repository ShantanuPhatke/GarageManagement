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
          console.log(userData);

          const userDetails = {
            uid: userData.child("uid").val(),
            name: userData.child("name").val(),
          };

          localStorage.setItem("user", JSON.stringify(userDetails));
          window.location.href = "./../../profile.html";

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

// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     // User is signed in.

//     window.location.href = "./../../page2.html";

//     // document.getElementById("user_div").style.display = "block";
//     // document.getElementById("login_div").style.display = "none";

//     var user = firebase.auth().currentUser;

//     // if (user != null) {
//     //   var email_id = user.email;
//     //   document.getElementById("user_para").innerHTML =
//     //     "Welcome User : " + email_id;
//     // }
//   }
// });

// function login() {
//   var userEmail = document.getElementById("email_field").value;
//   var userPass = document.getElementById("password_field").value;

//   firebase
//     .auth()
//     .signInWithEmailAndPassword(userEmail, userPass)
//     .catch(function (error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;

//       window.alert("Error : " + errorMessage);

//       // ...
//     });
// }

function logout() {
  firebase.auth().signOut();
}
