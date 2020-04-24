//const resetForm = () => document.getElementById("form-generate-token").reset();

// const handleSubmit = () => {
//   const form = document.getElementById("ins-jobcard-form");
//   let formData = new FormData(form);

//   const email = formData.get("email");
//   const vehicleNumber = formData.get("vehicle-number");
//   const ref = firebase.database().ref("tarun/job");
//   ref
//     .orderByChild("email")
//     .equalTo(email)
//     .once("value", (snapshot) => {
//       if (!snapshot.exists()) {
//         const fname = formData.get("first-name");
//         const lname = formData.get("last-name");
//         const contact = formData.get("contact");
//         const complainant = formData.get("complainant") == "on" ? "Yes" : "No";
//         const address = formData.get("address");
//         const city = formData.get("city");
//         const postal = formData.get("postal");
//         const vehicleBrand = formData.get("vehicle-brand");

//         let customerKey = insertData(
//           fname,
//           lname,
//           email,
//           contact,
//           complainant,
//           address,
//           city,
//           postal,
//           vehicleNumber,
//           vehicleBrand
//         );
//         let tokenNumber = generateToken(customerKey, vehicleNumber);
//         alert("Your token number is: " + tokenNumber);
//       } else {
//         let customerKey = Object.keys(snapshot.val())[0];
//         firebase
//           .database()
//           .ref("customers")
//           .child(customerKey)
//           .child("complainant")
//           .set(formData.get("complainant") == "on" ? "Yes" : "No");
//         let tokenNumber = generateToken(customerKey, vehicleNumber);
//         alert("Your token number is: " + tokenNumber);
//         resetForm();
//       }
//     });
// };

//const JobRef = firebase.database().ref("tarun/job");

let newJobKey = "";

const handleSubmit = command => {

  if (command == 'details') {
    newJobKey = insertDetails();
    alert(newJobKey);
  }
  if (command == 'inspection') {
    insertInspection(newJobKey);
  }
  if (command == 'add') {
    addJob(newJobKey);
  }
}

const insertInspection = (JobKey) => {

  const form = document.getElementById("ins-jobcard-form");
  let formData = new FormData(form);
  const vn = formData.get("ins-headlights");
  const vm = formData.get("ins-mirrors");
  const cm = formData.get("ins-turn-indicators");
  const ca = formData.get("ins-fuel-reading");
  const di = formData.get("ins-km-reading");

  const ref = firebase.database().ref("tarun/job").child(JobKey);
  // let newJobRef = ref.push({
  //   headlights: vn,
  //   mirrors: vm,
  //   turnIndicators: cm,
  //   fuelRreading: ca,
  //   kmReading: di
  // });

  ref.child("vehicleCondition").set({
    headlights: vn,
    mirrors: vm,
    turnIndicators: cm,
    fuelRreading: ca,
    kmReading: di
  })

  //return newJobRef.key;
};

const insertDetails = () => {

  const form = document.getElementById("ins-jobcard-form");
  let formData = new FormData(form);
  const vn = formData.get("vehicle-number");
  const vm = formData.get("vehicle-model");
  const cm = formData.get("customer-mobile");
  const ca = formData.get("customer-address");
  const di = formData.get("discount");

  const ref = firebase.database().ref("tarun/job");
  let newJobRef = ref.push({
    vehicleNumber: vn,
    vehicleModel: vm,
    customerMobile: cm,
    customerAddress: ca,
    discount: di
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
