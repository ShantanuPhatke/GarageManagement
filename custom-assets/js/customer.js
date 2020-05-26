let uid = "";

const setUsername = () => {
  const userData = JSON.parse(localStorage.getItem("user"))
  uid = userData.uid
  const name = userData.name

  const usernameElements = document.getElementsByClassName("username")

  for (let x = 0; x < usernameElements.length; x++) {
    usernameElements[x].innerHTML = name
  }
}

const getData = () => {
  const userData = JSON.parse(localStorage.getItem("user"))
  const uid = userData.uid

  const ref = firebase.database().ref('customers')
  ref.once(
    "value", snapshot => {
      snapshot.forEach(childSnapshot => {
        if (uid == childSnapshot.child("uid").val()) {
          // Job details
          const jobTable = document.getElementById("job-table")
          let html = ''
          let srNo = 1

          newRef = firebase.database().ref(`customers/${childSnapshot.key}/jobs`)

          newRef.once("value", gChildSnap => {
            gChildSnap.forEach(jobitem => {
              const jobId = jobitem.child("job_id").val()
              const vehicleNumber = jobitem.child("vehicle_number").val()
              const vehicleBrand = jobitem.child("vehicle_brand").val()
              const deliveryDate = jobitem.child("deliveryDate").val()
              const cost = jobitem.child("jobCost").val()
              const status = jobitem.child("status").val()
              html += '<tr>'
              html += '<td>'
              html += jobId
              html += '</td>'
              html += '<td>'
              html += vehicleNumber
              html += '</td>'
              html += '<td>'
              html += vehicleBrand
              html += '</td>'
              html += '<td>'
              html += deliveryDate
              html += '</td>'
              html += '<td>'
              html += cost
              html += '</td>'
              html += '<td>'
              html += status
              html += '</td>'
              // html += '<td class="text-right">'
              // html += '<div class="dropdown">'
              // html += `<a type="button" class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown"
              //   aria-haspopup="true" aria-expanded="false">`
              // html += '<i class="ni ni-bold-right">'
              // html += '</i>'
              // html += '</a>'
              // html += '</div>'
              // html += '</td>'
              html += '</tr>'
            })
            jobTable.innerHTML = html
          })
        }
      });
    })
}

const logout = () => {
  localStorage.clear()
  window.location.href = "./../../index.html"
}