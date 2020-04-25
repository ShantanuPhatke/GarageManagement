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

const getData = () => {
    const ref = firebase.database().ref("users")
    const table = document.getElementById("employee-table")
    ref
        .orderByChild("uid")
        .once("value", (snapshot) => {
            html = ''
            if (snapshot.exists()) {
                snapshot.forEach(user => {
                    html += '<tr>'
                    html += '<td>'
                    html += user.child("uid").val()
                    html += '</td>'
                    html += '<td>'
                    html += user.child("joiningDate").val()
                    html += '</td>'
                    html += '<td>'
                    html += user.child("type").val()
                    html += '</td>'
                    html += '<td>'
                    html += user.child("salary").val()
                    html += '</td>'
                    html += '</tr>'
                });

                table.innerHTML = html

            } else {
                let errorMessage = "Something is wrong, contact admin";
                alert(errorMessage);
            }

        });
}