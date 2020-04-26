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

const attendToken = (createdAt, customerUid) => {
    const currentToken = {
        createdAt: createdAt,
        customerUid: customerUid
    }
    localStorage.setItem("current_token", JSON.stringify(currentToken))

    window.location.href = "./../../createjobcard.html"
}

const renderTokenQueue = tokenQueue => {
    const table = document.getElementById("token-table")
    html = ''
    tokenQueue.forEach(token => {
        html += '<tr>'
        html += '<td>'
        html += token.createdAt
        html += '</td>'
        html += '<td>'
        html += token.vehicleNumber
        html += '</td>'
        html += '<td>'
        html += token.customerUid
        html += '</td>'
        html += '<td>'
        html += `<a href="javascript: attendToken('${token.createdAt}', '${token.customerUid}')" class="btn btn-sm btn-info">`
        html += 'Attend'
        html += '</a>'
        html += '</td>'
        html += '</tr>'
    });
    table.innerHTML = html
}

const fetchJobHistory = () => {
    const tokenQueue = []

    const ref = firebase.database().ref("tokens")

    ref.orderByChild("createdAt").on("value", snapshot => {
        snapshot.forEach(token => {
            const tokenData = token.val()
            tokenQueue.push(tokenData)
        })
        renderTokenQueue(tokenQueue)
    })

}