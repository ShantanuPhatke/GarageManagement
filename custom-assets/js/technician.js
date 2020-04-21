const logout = () => {
    localStorage.clear()
    window.location.href = "./../../index.html"
}

const getDetails = () => {
    const userData = JSON.parse(localStorage.getItem("user"))
    let userNameObjects = document.getElementsByClassName("username")
    for (const username in userNameObjects) {
        userNameObjects[username].innerHTML = userData.name
    }

    fetchJobList(userData.uid)
}

const fetchJobList = uid => {

    const ref = firebase.database().ref("technicians")
    const table = document.getElementById("job-table")
    ref
        .orderByChild("uid")
        .equalTo(uid)
        .once("value", (snapshot) => {
            html = ''
            if (snapshot.exists()) {
                // console.log(snapshot.child(uid).child("jobs").val());
                snapshot.child(uid).child("jobs").forEach(job => {
                    html += '<tr>'
                    html += '<td>'
                    html += job.child("vehicle_number").val()
                    html += '</td>'
                    html += '<td>'
                    html += job.child("job_id").val()
                    html += '</td>'
                    html += '<td>'
                    html += job.child("status").val()
                    html += '</td>'
                    html += '<td>'
                    if (job.child("status").val() == "Completed") {
                        html += `<a href="javascript: alert('Job already completed')" class="btn btn-sm btn-info">`
                        html += 'Completed'
                        html += '</a>'
                    } else if (job.child("status").val() == 'Not started') {
                        const currentJobID = job.child("job_id").val()
                        html += `<a href="javascript: startJob('${currentJobID}')" class="btn btn-sm btn-primary">`
                        html += 'Start'
                        html += '</a>'
                    } else {
                        const currentJobID = job.child("job_id").val()
                        html += `<a href="javascript: resumeJob('${currentJobID}')" class="btn btn-sm btn-success">`
                        html += 'Resume'
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

const startJob = job_id => {
    const currentJobID = {
        job_id: job_id
    }
    localStorage.setItem("current_job", JSON.stringify(currentJobID))
    const userData = JSON.parse(localStorage.getItem('user'))
    const uid = userData.uid

    // Updates technician object
    const refTechnicians = firebase.database().ref(`technicians/${uid}/jobs/`)
    refTechnicians.child(job_id).update({ 'status': 'Started' })

    // Updates jobs object
    const refJobs = firebase.database().ref('jobs')
    refJobs.child(job_id).update({ 'status': 'Started' })

    window.location.href = "./../../jobcard.html"
}

const resumeJob = job_id => {
    const currentJobID = {
        job_id: job_id
    }
    localStorage.setItem("current_job", JSON.stringify(currentJobID))

    window.location.href = "./../../jobcard.html"
}