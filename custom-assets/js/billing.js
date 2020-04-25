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


const fetchBillingList = () => {

    const ref = firebase.database().ref("billing")
    const table = document.getElementById("billing-table")
    ref
        .orderByChild("bill_id")
        .on("value", (snapshot) => {
            html = ''
            if (snapshot.exists()) {
                // console.log(snapshot.child(uid).child("jobs").val());
                snapshot.forEach(bill => {
                    const paymentStatus = bill.child("payment_status").val()
                    const job_id = bill.child("job_id").val()
                    const bill_id = bill.child("bill_id").val()
                    const vehicle_number = bill.child("vehicle_number").val()
                    html += '<tr>'
                    html += '<td>'
                    html += vehicle_number
                    html += '</td>'
                    html += '<td>'
                    html += bill_id
                    html += '</td>'
                    html += '<td>'
                    html += paymentStatus
                    html += '</td>'
                    html += '<td>'
                    if (paymentStatus == "Paid") {
                        html += `<a href="javascript: openBill('${bill_id}', '${job_id}', '${vehicle_number}', '${paymentStatus}')" class="btn btn-sm btn-info">`
                        html += 'Review'
                        html += '</a>'
                    } else if (paymentStatus == 'Unpaid') {
                        html += `<a href="javascript: openBill('${bill_id}', '${job_id}', '${vehicle_number}', '${paymentStatus}')" class="btn btn-sm btn-primary">`
                        html += 'Generate'
                        html += '</a>'
                    }
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


const openBill = (bill_id, job_id, vehicle_number, paymentStatus) => {
    const selectedBill = {
        bill_id: bill_id,
        job_id: job_id,
        vehicle_number: vehicle_number,
        payment_status: paymentStatus
    }
    localStorage.setItem("selected_bill", JSON.stringify(selectedBill))

    window.location.href = "./../../bill-view.html"
}
