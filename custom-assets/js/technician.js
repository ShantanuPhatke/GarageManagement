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

const getDetails = () => {
    const userData = JSON.parse(localStorage.getItem("user"))
    fetchJobList(userData.uid)
}

const fetchJobList = uid => {

    const ref = firebase.database().ref("technicians")
    const table = document.getElementById("job-table")
    ref
        .orderByChild("uid")
        .equalTo(uid)
        .on("value", (snapshot) => {
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

    //Update status of job in Technician
    const technicianRef = firebase.database().ref(`technicians/${uid}/jobs`)
    technicianRef.once("value", snapshot => {
        snapshot.forEach(childSnapshot => {
            console.log(childSnapshot.val());
            if (job_id == childSnapshot.child('job_id').val()) {
                console.log(childSnapshot.key);
                const techRef = firebase.database().ref(`technicians/${uid}/jobs/${childSnapshot.key}`)

                techRef.update({ 'status': 'Started' })
            }
        });
    })

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