let newJobKey = "";
let jobCost = 0;

const handleSubmit = command => {

  if (command == 'details') {
    newJobKey = insertDetails();
    alert(newJobKey);
    document.getElementById("job-id").innerHTML = newJobKey;
  }
  if (command == 'inspection') {
    insertInspection(newJobKey);
  }
  if (command == 'add') {
    addJob(newJobKey);
  }
  if (command == 'confirm') {
    confirmJob(newJobKey);
  }
}

const confirmJob = (JobKey) => {

  const form = document.getElementById("ins-jobcard-form");
  let formData = new FormData(form);

  const deliveryDate = formData.get("delivery-date");

  const ref = firebase.database().ref("tarun/job").child(JobKey);

  ref.update({ 'deliveryDate': deliveryDate });
  ref.update({ 'jobCost': jobCost });

  //clear data
  newJobKey = "";
  jobCost = "";
  window.location.href = "./../../inspector.html"
};



const addJob = (JobKey) => {

  const form = document.getElementById("ins-jobcard-form");
  let formData = new FormData(form);
  const serial = formData.get("work-serial");
  const work = formData.get("work");
  const part = formData.get("work-part");
  const comment = formData.get("work-comment");
  const cost = formData.get("work-cost");

  jobCost = parseInt(jobCost) + parseInt(cost);
  //const costElement = document.getElementById("est-job-cost");
  //document.getElementById("tesst").innerHTML('Rs ' + jobCost)
  document.getElementById("est-job-cost").innerHTML = 'Rs ' + jobCost;

  const ref = firebase.database().ref("tarun/job").child(JobKey);
  // let newJobRef = ref.push({
  //   headlights: vn,
  //   mirrors: vm,
  //   turnIndicators: cm,
  //   fuelRreading: ca,
  //   kmReading: di
  // });

  ref.child("jobList").child('service_00' + serial).set({
    serial: serial,
    work: work,
    part: part,
    comment: comment,
    cost: cost
  })
  //alert(jobCost);
  //return newJobRef.key;
};

const insertInspection = (JobKey) => {

  const form = document.getElementById("ins-jobcard-form");
  let formData = new FormData(form);
  const headlights = formData.get("ins-headlights");
  const mirrors = formData.get("ins-mirrors");
  const turnIndicators = formData.get("ins-turn-indicators");
  const fuelRreading = formData.get("ins-fuel-reading");
  const kmReading = formData.get("ins-km-reading");

  const ref = firebase.database().ref("tarun/job").child(JobKey);
  // let newJobRef = ref.push({
  //   headlights: vn,
  //   mirrors: vm,
  //   turnIndicators: cm,
  //   fuelRreading: ca,
  //   kmReading: di
  // });

  ref.child("vehicleCondition").set({
    headlights: headlights,
    mirrors: mirrors,
    turnIndicators: turnIndicators,
    fuelRreading: fuelRreading,
    kmReading: kmReading
  })

  //return newJobRef.key;
};

const insertDetails = () => {

  const form = document.getElementById("ins-jobcard-form");
  let formData = new FormData(form);
  const vehicleNumber = formData.get("vehicle-number");
  const vehicleModel = formData.get("vehicle-model");
  const customerMobile = formData.get("customer-mobile");
  const customerAddress = formData.get("customer-address");
  const discount = formData.get("discount");

  const ref = firebase.database().ref("tarun/job");
  let newJobRef = ref.push({
    vehicleNumber: vehicleNumber,
    vehicleModel: vehicleModel,
    customerMobile: customerMobile,
    customerAddress: customerAddress,
    discount: discount
  });
  return newJobRef.key;
};

// insertDetails = () => {

//   const form = document.getElementById("ins-jobcard-form");
//   let formData = new FormData(form);
//   const vn = formData.get("vehicle-number");
//   const vm = formData.get("vehicle-model");
//   const cm = formData.get("customer-mobile");
//   const ca = formData.get("customer-address");
//   const di = formData.get("discount");

//   const ref = firebase.database().ref("tarun/job");
//   let newJobRef = ref.push({
//     vehicleNumber: vn,
//     vehicleModel: vm,
//     customerMobile: cm,
//     customerAddress: ca,
//     discount: di
//   });
//   alert("Your token number is: " + newJobRef.key)
//   return newJobRef.key;
// };

// const generateToken = (customerKey, vehicleNumber) => {
//   const ref = firebase.database().ref("tokens");
//   let newToken = ref.push({
//     customerKey: customerKey,
//     vehicleNumber: vehicleNumber,
//     createdAt: window.firebase.database.ServerValue.TIMESTAMP,
//   });
//   return newToken.key;
// };

// let customerCount = document.getElementById("customerCount");

// const fetchTokenList = () => {
//   const ref = firebase.database().ref("tokens");
//   ref.on("value", (snapshot) => {
//     var count = snapshot.numChildren();
//     customerCount.innerHTML = count;
//     // snapshot.forEach(childSnapshot => {
//     //     let tokenKey = childSnapshot.key
//     //     let tokenData = childSnapshot.val()
//     //     console.log(tokenData);

//     // })
//   });
// };
