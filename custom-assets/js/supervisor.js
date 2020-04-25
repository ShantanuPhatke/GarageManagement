const logout = () => {
    localStorage.clear()
    window.location.href = "./../../index.html"
}

const fetchJobList = uid => {

    const ref = firebase.database().ref("technicians")
    const table = document.getElementById("job-table")
    ref
        .orderByChild("uid")
        .on("value", (snapshot) => {
            html = ''
            if (snapshot.exists()) {
                // console.log(snapshot.child(uid).child("jobs").val());
                snapshot.forEach(technician => {
                    const uid = technician.child("uid").val()

                    technician.child("jobs").forEach(job => {
                        const currentJobID = job.child("job_id").val()
                        html += '<tr>'
                        html += '<td>'
                        html += job.child("vehicle_number").val()
                        html += '</td>'
                        html += '<td>'
                        html += uid
                        html += '</td>'
                        html += '<td>'
                        html += currentJobID
                        html += '</td>'
                        html += '<td>'
                        html += job.child("status").val()
                        html += '</td>'
                        html += '<td>'
                        if (job.child("status").val() == "Completed") {
                            html += `<a href="javascript: alert('Job already completed')" class="btn btn-sm btn-info">`
                            html += 'Review'
                            html += '</a>'
                        } else if (job.child("status").val() == 'Not started') {
                            html += `<a href="javascript: openJobCard('${currentJobID}')" class="btn btn-sm btn-primary">`
                            html += 'Review'
                            html += '</a>'
                        } else {
                            html += `<a href="javascript: openJobCard('${currentJobID}')" class="btn btn-sm btn-success">`
                            html += 'Review'
                            html += '</a>'
                        }
                        html += '</td>'
                        html += '</tr>'
                    });
                });

                table.innerHTML = html

            } else {
                let errorMessage = "Something is wrong, contact admin";
                alert(errorMessage);
            }

        });
}

const openJobCard = job_id => {
    const currentJobID = {
        job_id: job_id
    }
    localStorage.setItem("current_job", JSON.stringify(currentJobID))

    window.location.href = "./../../jobcard.html"
}