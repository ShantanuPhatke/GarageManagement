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

const fillBillInfo = (bill_id, vehicle_number, payment_status) => {
    document.getElementById("bill_id").innerHTML = bill_id
    document.getElementById("vehicle_number").innerHTML = vehicle_number
    paymentLabel = document.getElementById("payment_status")
    payment_status == 'Paid'
        ? paymentLabel.innerHTML = '<p class="text-success lead" style="margin: 10px; font-weight: bold;">PAID</p>'
        : paymentLabel.innerHTML = '<p class="text-danger lead" style="margin: 10px; font-weight: bold;">UNPAID</p>'
}

const getBillDetails = () => {

    // fillBillInfo()
    const billData = JSON.parse(localStorage.getItem("selected_bill"))
    const bill_id = billData.bill_id
    const vehicle_number = billData.vehicle_number
    const payment_status = billData.payment_status
    const job_id = billData.job_id

    // Adding details from local storage
    fillBillInfo(bill_id, vehicle_number, payment_status)


    const refJobs = firebase.database().ref(`jobs/${job_id}/job_details/services`)
    refJobs
        .once(
            "value", snapshot => {
                if (snapshot.exists()) {
                    const srNo = 1
                    html = ''
                    snapshot.forEach(service => {
                        const service_name = service.child("service_name").val()
                        const service_cost = service.child("service_cost").val()
                        html += '<tr>'
                        html += '<td class="text-center">'
                        html += srNo
                        html += '</td>'
                        html += '<td class="text-center">'
                        html += service_name
                        html += '</td>'
                        html += '<td class="text-center">'
                        html += service_cost
                        html += '</td>'
                        html += '</tr>'
                    });
                    if (payment_status == 'Unpaid') {
                        html += '<tr>'
                        html += '<td class="text-center"></td>'
                        html += '<td class="text-center"></td>'
                        html += '<td class="text-center">'
                        html += `<a href="javascript: payBill('${bill_id}')" class="btn btn-round btn-primary">Pay Bill</a>`
                        html += '</td>'
                        html += '</tr>'
                    }

                    document.getElementById("bill-table").innerHTML = html

                } else {
                    let errorMessage = "Something is wrong, contact admin";
                    alert(errorMessage);
                }
            }
        )

}

const payBill = job_id => {
    const ref = firebase.database().ref('billing')
    ref.child(job_id).update({ 'payment_status': 'Paid' })

    window.location.href = "./../../billing.html"
}