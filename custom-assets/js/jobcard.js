const getData = () => {
    const current_job = JSON.parse(localStorage.getItem("current_job"))
    const current_job_id = current_job.job_id

    const refJobs = firebase.database().ref('jobs')
    refJobs
        .orderByChild("job_id")
        .equalTo(current_job_id)
        .once(
            "value", snapshot => {
                if (snapshot.exists()) {
                    const jobData = snapshot.child(current_job_id).val()
                    // console.log(jobData)
                    fillJobCard(jobData)
                } else {
                    let errorMessage = "Something is wrong, contact admin";
                    alert(errorMessage);
                }
            }
        )

}

const fillJobCard = jobData => {

    const vehicleNumber = document.getElementById("input-vehicle-number");
    vehicleNumber.value = jobData.vehicle_number

    const vehicleBrand = document.getElementById("input-vehicle-brand");
    vehicleBrand.value = jobData.vehicle_brand

}