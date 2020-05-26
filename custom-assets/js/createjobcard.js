const randNumber = Math.floor(Math.random() * 3) + 1
const techId = 't00' + randNumber

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

const fillDetails = customerUid => {
  const token = JSON.parse(localStorage.getItem("current_token"))
  const ref = firebase.database().ref("customers")
  ref.orderByChild("uid").once("value", snapshot => {
    snapshot.forEach(childSnapshot => {
      if (customerUid == childSnapshot.child("uid").val()) {
        //document.getElementById("input-vehicle-number").value = childSnapshot.child("vehicleNumber").val()
        //document.getElementById("input-vehicle-brand").value = childSnapshot.child("vehicleBrand").val()
        document.getElementById("input-vehicle-number").value = token.vehicleNumber
        document.getElementById("input-vehicle-brand").value = token.vehicleBrand
        document.getElementById("input-contact").value = childSnapshot.child("contact").val()
        document.getElementById("input-address").value = childSnapshot.child("address").val()
      }
    });
  })
}

const getDetails = () => {
  const token = JSON.parse(localStorage.getItem("current_token"))
  const tokenNo = token.createdAt
  const customerUid = token.customerUid

  document.getElementById("tokenNo").innerHTML = tokenNo
  fillDetails(customerUid)
}




let newJobKey = ""
let jobCost = 0

const handleSubmit = command => {

  if (command == 'details') {
    newJobKey = insertDetails()
    document.getElementById("job-id").innerHTML = newJobKey
  }
  if (command == 'inspection') {
    insertInspection(newJobKey)
  }
  if (command == 'add') {
    addJob(newJobKey)
  }
  if (command == 'confirm') {
    confirmJob(newJobKey)
  }
}

let getKeyToRemove = () => {
  const token = JSON.parse(localStorage.getItem("current_token"))
  const tokenNo = token.createdAt
  const ref = firebase.database().ref("tokens")
  ref.orderByChild("createdAt").equalTo(tokenNo).once("value", snapshot => {
    console.log(snapshot.child("createdAt").val());

  })

}

let clearCurrentToken = () => {

  let keyToRemove = getKeyToRemove()
  console.log(keyToRemove);

  const ref = firebase.database().ref('tokens')
  ref.equalTo(keyToRemove).once("value", snapshot => {
    console.log(snapshot.val());
  })
  ref.child(keyToRemove).remove(function (error) {
    alert(error ? "Uh oh!" : "Success!");
  })

}

const confirmJob = JobKey => {

  const form = document.getElementById("ins-jobcard-form")
  let formData = new FormData(form)

  const deliveryDate = formData.get("delivery-date")

  const ref = firebase.database().ref("jobs").child(JobKey)

  ref.update({ 'deliveryDate': deliveryDate })
  ref.update({ 'jobCost': jobCost })

  //update in customer try 1
  //const custRef = firebase.database().ref("customers/jobs").child(JobKey)
  //custRef.update({ 'deliveryDate': deliveryDate })
  //custRef.update({ 'jobCost': jobCost })

  //update in customer try 2
  // const tokenData = JSON.parse(localStorage.getItem("current_token"))
  // const customerId = tokenData.customerUid

  // const custRef = firebase.database().ref('customers')
  // custRef.once("value", snapshot => {
  //   snapshot.forEach(childSnapshot => {
  //     if (customerId == childSnapshot.child("uid").val()) {
  //       const newCustRef = custRef.child(childSnapshot.key).child("jobs")
  //       newCustRef.once("value", gChildSnapshot => {
  //         gChildSnapshot.forEach(job => {
  //           if (JobKey == job.child("job_id").val()) {
  //             newCustRef.child(job.key).update({ 'deliveryDate': deliveryDate })
  //             newCustRef.child(job.key).update({ 'jobCost': jobCost })
  //           }
  //         });

  //       })
  //     }
  //   });
  // })

  //update in customer try 3
  const tokenData = JSON.parse(localStorage.getItem("current_token"))
  const customerId = tokenData.customerUid

  const custRef = firebase.database().ref('customers').child(customerId).child('jobs').child(JobKey)
  custRef.update({ 'deliveryDate': deliveryDate })
  custRef.update({ 'jobCost': jobCost })

  // const custRef = firebase.database().ref('customers')
  // custRef.once("value", snapshot => {
  //   snapshot.forEach(childSnapshot => {
  //     if (customerId == childSnapshot.child("uid").val()) {
  //       const newCustRef = custRef.child(childSnapshot.key).child("jobs")
  //       newCustRef.once("value", gChildSnapshot => {
  //         gChildSnapshot.forEach(job => {
  //           if (JobKey == job.child("job_id").val()) {
  //             newCustRef.child(job.key).update({ 'deliveryDate': deliveryDate })
  //             newCustRef.child(job.key).update({ 'jobCost': jobCost })
  //           }
  //         });

  //       })
  //     }
  //   });
  // })






  // clearCurrentToken()
  const token = JSON.parse(localStorage.getItem("current_token"))
  const tokenNo = token.createdAt
  const refToken = firebase.database().ref("tokens")
  refToken.once("value", snapshot => {
    snapshot.forEach(childSnapshot => {
      if (tokenNo == childSnapshot.child("createdAt").val()) {
        newRef = firebase.database().ref(`tokens/${childSnapshot.key}`)
        newRef.remove()
      }
    });

  })

  //clear data
  newJobKey = "";
  jobCost = "";

  setTimeout(() => {
    window.location.href = "./../../inspector.html"
  }, 1000);
}



const addJob = JobKey => {

  const form = document.getElementById("ins-jobcard-form")
  let formData = new FormData(form)
  const service_id = formData.get("service_id")
  const service_name = formData.get("service_name")
  const cost = formData.get("cost")

  jobCost = parseInt(jobCost) + parseInt(cost)
  document.getElementById("est-job-cost").innerHTML = 'Rs ' + jobCost

  // Add details in Jobs
  const ref = firebase.database().ref("jobs").child(JobKey)
  ref.child("services").child('service_00' + service_id).set({
    service_id: 'service_00' + service_id,
    service_name: service_name,
    cost: cost,
    status: 'Not started'
  })

  // Add details in Technicians
  const techRef = firebase.database().ref(`technicians/${techId}/jobs`)
  techRef.once("value", snapshot => {
    snapshot.forEach(childSnapshot => {
      if (JobKey == childSnapshot.child("job_id").val()) {
        techRef.child(childSnapshot.key).child("services").child('service_00' + service_id).set({
          service_id: 'service_00' + service_id,
          service_name: service_name,
          cost: cost,
          status: 'Not started'
        })
      }
    });
  })

  // Add details in Customer
  const tokenData = JSON.parse(localStorage.getItem("current_token"))
  const customerId = tokenData.customerUid

  const custRef = firebase.database().ref('customers')
  custRef.once("value", snapshot => {
    snapshot.forEach(childSnapshot => {
      if (customerId == childSnapshot.child("uid").val()) {
        const newCustRef = custRef.child(childSnapshot.key).child("jobs")
        newCustRef.once("value", gChildSnapshot => {
          gChildSnapshot.forEach(job => {
            if (JobKey == job.child("job_id").val()) {
              newCustRef.child(job.key).child("services").child('service_00' + service_id).set({
                service_id: 'service_00' + service_id,
                service_name: service_name,
                cost: cost,
                status: 'Not started'
              })
            }
          });

        })
      }
    });
  })

}

const insertInspection = JobKey => {

  const form = document.getElementById("ins-jobcard-form")
  let formData = new FormData(form)
  const headlights = formData.get("ins-headlights")
  const mirrors = formData.get("ins-mirrors")
  const airbags = formData.get("airbags")
  const horn = formData.get("horn")
  const breaks = formData.get("breaks")
  const tires = formData.get("tires")

  // Add details in Jobs
  const ref = firebase.database().ref("jobs").child(JobKey)
  ref.child("vehicle_condition").set({
    headlights: headlights,
    mirrors: mirrors,
    airbags: airbags,
    horn: horn,
    breaks: breaks,
    tires: tires
  })

  // Add details in Customer
  const tokenData = JSON.parse(localStorage.getItem("current_token"))
  const customerId = tokenData.customerUid

  const custRef = firebase.database().ref('customers')
  custRef.once("value", snapshot => {
    snapshot.forEach(childSnapshot => {
      if (customerId == childSnapshot.child("uid").val()) {
        const newCustRef = custRef.child(childSnapshot.key).child("jobs")
        newCustRef.once("value", gChildSnapshot => {
          gChildSnapshot.forEach(job => {
            if (JobKey == job.child("job_id").val()) {
              newCustRef.child(job.key).child("vehicle_condition").set({
                headlights: headlights,
                mirrors: mirrors,
                airbags: airbags,
                horn: horn,
                breaks: breaks,
                tires: tires
              })
            }
          });

        })
      }
    });
  })

}

const insertDetails = () => {

  const tokenData = JSON.parse(localStorage.getItem("current_token"))
  const customerId = tokenData.customerUid

  const form = document.getElementById("ins-jobcard-form")
  let formData = new FormData(form)
  const vehicleNumber = formData.get("vehicle-number")
  const vehicleModel = formData.get("vehicle-model")
  const fuel = formData.get("fuel")
  const km = formData.get("km")
  const discount = formData.get("discount")

  // Add details in Jobs
  const ref = firebase.database().ref("jobs")
  let newJobRef = ref.push({
    vehicle_number: vehicleNumber,
    vehicle_brand: vehicleModel,
    fuel: fuel,
    km: km,
    discount: discount,
    cid: customerId,
    status: 'Not started'
  })

  // Add details in Technicians
  const techRef = firebase.database().ref(`technicians/${techId}/jobs`)
  techRef.push({
    status: 'Not started',
    job_id: newJobRef.key,
    vehicle_brand: vehicleModel,
    vehicle_number: vehicleNumber
  })

  // Add details in Customer

  const custRef = firebase.database().ref('customers')
  custRef.once("value", snapshot => {
    snapshot.forEach(childSnapshot => {
      if (customerId == childSnapshot.child("uid").val()) {
        custRef.child(childSnapshot.key).child("jobs").child(newJobRef.key).set({
          status: 'Not started',
          job_id: newJobRef.key,
          vehicle_brand: vehicleModel,
          vehicle_number: vehicleNumber
        })
      }
    });
  })

  return newJobRef.key;
}