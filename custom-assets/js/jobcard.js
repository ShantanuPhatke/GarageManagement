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