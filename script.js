const form = document.getElementById("form");

const fullName = document.getElementById("fullname");
const yearOfBirth = document.getElementById("year");
const tableBody = document.querySelector("tbody");
const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
let data = JSON.parse(localStorage.getItem("usersData"));

// init year of birth
function yearOption(startYear, endYear) {
  const years = [];
  for (let i = startYear; i <= endYear; i++) {
    years.push(`<option value=${i}>${i}</option>`);
  }

  yearOfBirth.innerHTML = years.join("");
}
yearOption(1990, 2022);

// Object contrucstor for User
function userInfo(fullname, yearOfBirth, gender, time) {
  (this.fullName = fullname),
    (this.yearOfBirth = yearOfBirth),
    (this.gender = gender),
    (this.time = time);
}

// Form submit => save userdata into LocalStorage
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let gender = document.querySelector('input[name="gender"]:checked');

  // Get Registration Time
  let registrationTime = getTime();

  let newUser = new userInfo(
    fullName.value,
    yearOfBirth.value,
    gender.value,
    registrationTime
  );
  usersData.push(newUser);
  localStorage.setItem("usersData", JSON.stringify(usersData));
  let data = JSON.parse(localStorage.getItem("usersData"));
  renderItem(usersData, 1);
});

// Get time
function getTime() {
  let time = new Date();
  let yyyy = time.getFullYear();
  let mm = time.getMonth() + 1; // Months start at 0!
  let dd = time.getDate();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  time = dd + "/" + mm + "/" + yyyy;
  return hours + ":" + minutes + " " + ampm + "  " + time;
}

// Render items from LocalStorage
function renderItem(users) {
  const htmls = users.map((user, index) => {
    return `
      <tr>
        <td>${index + 1}</td>
            <td>${user.fullName}</td>
            <td>${user.yearOfBirth}</td>
            <td>${user.gender}</td>
            <td>${user.time}</td>
            <td class="delete" id="delete"><i class="fa-solid fa-trash-can"></i></td>
      </tr>
    `;
  });
  tableBody.innerHTML = htmls.join("");
}

// Render yearFilter option
const yearFilter = document.getElementById("yearFilter");

const getYears = [];
let uniq;
for (let i = 0; i < data.length; i++) {
  getYears.push(data[i].yearOfBirth);
  uniq = [...new Set(getYears)].sort(); // Sort year from smallest to largest
}

function renderYearOption(uniq) {
  const years = [` <option selected hidden>Năm sinh</option>`];
  for (let i = 0; i < uniq.length; i++) {
    years.push(`<option value=${uniq[i]}>${uniq[i]}</option>`);
  }
  yearFilter.innerHTML = years.join("");
}
renderYearOption(uniq);

// Render when reload
if (data) {
  renderItem(data);
}

// Table
const table = document.getElementById("listTable");
const tRows = document.querySelectorAll("#listTable tr:not(.header)");

//Filters
// YOB filter
yearFilter.addEventListener("change", () => {
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].yearOfBirth == yearFilter.value) {
      newData.push(data[i]);
    }
  }
  renderItem(newData);
});
// gender filter
const genderFilter = document.getElementById("genderFilter");
console.log(genderFilter);
genderFilter.addEventListener("change", () => {
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    console.log(genderFilter.value);
    if (data[i].gender == genderFilter.value) {
      newData.push(data[i]);
    }
  }
  renderItem(newData);
});

//Sorts
