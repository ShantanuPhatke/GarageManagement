const getData = () => {

    const current_job = JSON.parse(localStorage.getItem("current_job"))
    const current_job_id = current_job.job_id

    const refJobs = firebase.database().ref('jobs')
    refJobs
        .orderByChild("job_id")
        .equalTo(current_job_id)
        .on(
            "value", snapshot => {
                if (snapshot.exists()) {
                    const jobData = snapshot.child(current_job_id).val()
                    // console.log(jobData)
                    fillJobCard(jobData)

                    // Job details
                    const jobTable = document.getElementById("job-table")
                    let html = ''
                    let srNo = 1
                    snapshot.child(current_job_id).child("job_details").child("services").forEach(service => {
                        const currentServiceId = service.child("service_id").val()
                        const currentServiceName = service.child("service_name").val()
                        const currentServiceStatus = service.child("status").val()
                        // console.log(currentServiceName);

                        html += '<tr>'
                        html += '<td>'
                        html += srNo++
                        html += '</td>'
                        html += '<td>'
                        html += currentServiceId
                        html += '</td>'
                        html += '<td>'
                        html += currentServiceName
                        html += '</td>'
                        html += '<td>'
                        html += currentServiceStatus
                        html += '</td>'

                        if (isTechnician()) {
                            //Adds the column header
                            const actionColumn = document.getElementById("actionColumn")
                            actionColumn.innerHTML = 'Action'

                            //Adds user type in breadcrum
                            const userType = document.getElementById("userType")
                            userType.innerHTML = 'Technician'

                            html += '<td>'
                            if (currentServiceStatus == "Not started") {
                                html += `<a href="javascript: updateServiceStatus('${currentServiceId}', 'Working')" class="btn btn-sm btn-primary">`
                                html += 'Start'
                                html += '</a>'
                            } else if (currentServiceStatus == "Working") {
                                html += `<a href="javascript: updateServiceStatus('${currentServiceId}', 'Completed')" class="btn btn-sm btn-success">`
                                html += 'Finish'
                                html += '</a>'
                            } else if (currentServiceStatus == "Completed") {
                                html += `<a href="javascript: alert('Service already completed')" class="btn btn-sm btn-info">`
                                html += 'Completed'
                                html += '</a>'
                            }
                            html += '</td>'
                        } else {
                            const userType = document.getElementById("userType")
                            userType.innerHTML = 'SUPERVISOR'
                        }
                        html += '</tr>'
                    })
                    jobTable.innerHTML = html

                } else {
                    let errorMessage = "Something is wrong, contact admin";
                    alert(errorMessage);
                }
            }
        )

}


const setUsername = () => {
    const userData = JSON.parse(localStorage.getItem("user"))
    const name = userData.name

    const usernameElements = document.getElementsByClassName("username")

    for (let x = 0; x < usernameElements.length; x++) {
        usernameElements[x].innerHTML = name

    }
}


const isTechnician = () => {
    const current_user = JSON.parse(localStorage.getItem("user"))
    const current_uid = current_user.uid

    return current_uid.startsWith("t")
}


const updateServiceStatus = (serviceId, newStatus) => {
    const current_job = JSON.parse(localStorage.getItem("current_job"))
    const current_job_id = current_job.job_id
    const ref = firebase.database().ref(`jobs/${current_job_id}/job_details/services`)
    ref.child(serviceId).update({ 'status': newStatus })
}


const finishJob = () => {
    const current_job = JSON.parse(localStorage.getItem("current_job"))
    const current_user = JSON.parse(localStorage.getItem("user"))
    const current_job_id = current_job.job_id
    const user_id = current_user.uid

    //Update status of job in Job
    const jobRef = firebase.database().ref('jobs')
    jobRef.child(current_job_id).update({ 'status': 'Completed' })

    //Update status of job in Technician
    const technicianRef = firebase.database().ref(`technicians/${user_id}/jobs`)
    technicianRef.child(current_job_id).update({ 'status': 'Completed' })

    window.location.href = "./../../technician.html"
}


const fillJobCard = jobData => {

    // Vehicle info
    const vehicleNumber = document.getElementById("input-vehicle-number");
    vehicleNumber.value = jobData.vehicle_number

    const vehicleBrand = document.getElementById("input-vehicle-brand");
    vehicleBrand.value = jobData.vehicle_brand

    const vehicleKm = document.getElementById("input-vehicle-km");
    vehicleKm.value = jobData.km

    const vehicleFuel = document.getElementById("input-vehicle-fuel");
    vehicleFuel.value = jobData.fuel


    // Vehicle condition
    const headlights = document.getElementById("input-headlights");
    headlights.value = jobData.vehicle_condition.headlights

    const tiers = document.getElementById("input-tiers");
    tiers.value = jobData.vehicle_condition.tiers

    const breaks = document.getElementById("input-breaks");
    breaks.value = jobData.vehicle_condition.breaks

    const horn = document.getElementById("input-horn");
    horn.value = jobData.vehicle_condition.horn

    const airbags = document.getElementById("input-airbags");
    airbags.value = jobData.vehicle_condition.airbags

    const mirrors = document.getElementById("input-mirrors");
    mirrors.value = jobData.vehicle_condition.mirrors


}


const logout = () => {
    localStorage.clear()
    window.location.href = "./../../index.html"
}