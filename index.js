document.addEventListener("DOMContentLoaded", () => {
  displayTable();
});

document.querySelector("form").addEventListener("submit", myHospital);
let HospArr = JSON.parse(localStorage.getItem("hospital")) || [];

function myHospital(e) {
  e.preventDefault();

  let doctorName = document.querySelector("#name").value.trim();
  let doctorID = document.querySelector("#docID").value.trim();
  let specialization = document.querySelector("#dept").value;
  let experience = parseInt(document.querySelector("#exp").value.trim(), 10);
  let email = document.querySelector("#email").value.trim();
  let mobileNumber = document.querySelector("#mbl").value.trim();

  if (!doctorName || !doctorID || !specialization || isNaN(experience) || !email || !mobileNumber) {
    alert("Please fill all fields correctly!");
    return;
  }

  if (!/^[a-zA-Z ]+$/.test(doctorName)) {
    alert("Doctor name should contain only alphabets!");
    return;
  }

  if (HospArr.some(doc => doc.doctorID === doctorID)) {
    alert("Doctor ID already exists!");
    return;
  }

  let role = experience >= 5 ? "Senior Doctor" : "Junior Doctor";
  let doctorObj = { doctorName, doctorID, specialization, experience, email, mobileNumber, role };

  HospArr.push(doctorObj);
  localStorage.setItem("hospital", JSON.stringify(HospArr));
  displayTable();
  document.querySelector("form").reset();
}

function displayTable() {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  HospArr.forEach((el, i) => {
    let row = document.createElement("tr");

    ["doctorName", "doctorID", "specialization", "experience", "email", "mobileNumber", "role"].forEach((key) => {
      let td = document.createElement("td");
      td.innerText = el[key];
      row.appendChild(td);
    });

    let tdActions = document.createElement("td");
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => editDoctor(i);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => {
      HospArr.splice(i, 1);
      localStorage.setItem("hospital", JSON.stringify(HospArr));
      displayTable();
    };

    tdActions.append(editBtn, deleteBtn);
    row.appendChild(tdActions);
    tbody.appendChild(row);
  });
}

function editDoctor(index) {
  let doctor = HospArr[index];
  document.querySelector("#name").value = doctor.doctorName;
  document.querySelector("#docID").value = doctor.doctorID;
  document.querySelector("#dept").value = doctor.specialization;
  document.querySelector("#exp").value = doctor.experience;
  document.querySelector("#email").value = doctor.email;
  document.querySelector("#mbl").value = doctor.mobileNumber;
  
  HospArr.splice(index, 1);
  localStorage.setItem("hospital", JSON.stringify(HospArr));
  displayTable();
}
