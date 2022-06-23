const form = document.getElementById("form");

const fullName = document.getElementById("fullname");
const yearOfBirth = document.getElementById("year");
const tableBody = document.querySelector("tbody");
const usersData = JSON.parse(localStorage.getItem("usersData")) || [];

let data = JSON.parse(localStorage.getItem("usersData"));

// init year of birth
function yearOption(startYear, endYear) {
  const years = [];
  for (let i = endYear; i >= startYear; i--) {
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
            <td class="delete"><i class="fa-solid fa-trash-can"></i></td>
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
  uniq = [...new Set(getYears)].sort(); // Sort year from smallest to largest and remove duplicates year
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

//Filters
const genderFilter = document.getElementById("genderFilter");
let initialData = [];
let year_of_birth = "";
let _gender = "";

// Gender filter
genderFilter.addEventListener("change", () => {
  const gender_filter = data
    .map((item) => {
      if (
        item.gender === genderFilter.value &&
        item.yearOfBirth === year_of_birth
      ) {
        return item;
      } else {
        return undefined;
      }
    })
    .filter(Boolean);
  _gender = genderFilter.value;
  renderItem(gender_filter);
});

// Year filter
yearFilter.addEventListener("change", () => {
  const newData = data
    .map((item) => {
      if (!!_gender.length) {
        if (item.yearOfBirth === yearFilter.value && item.gender === _gender) {
          return item;
        }
      } else {
        if (item.yearOfBirth === yearFilter.value) {
          return item;
        }
      }
    })
    .filter(Boolean);
  year_of_birth = yearFilter.value;
  renderItem(newData);
});

//Sorts
const nameSort = document.getElementById("nameSort");
const timeSort = document.getElementById("timeSort");

nameSort.addEventListener("change", () => {
  console.log("nameSort.value :>> ", nameSort.value);
  if (nameSort.value == "atoz") {
    newData = data.sort(compareName);
  } else if (nameSort.value == "ztoa") {
    newData = data.sort(compareName).reverse();
  }
  renderItem(newData);
});

function compareName(a, b) {
  if (a.fullName.toLowerCase() < b.fullName.toLowerCase()) {
    return -1;
  }
  if (a.fullName.toLowerCase() > b.fullName.toLowerCase()) {
    return 1;
  }
  return 0;
}

// Sort by time
timeSort.addEventListener("change", () => {
  let newTimeData = [];
  if (timeSort.value == "new") {
    newTimeData = data.sort(sortTimeData).reverse();
  } else if (timeSort.value == "old") {
    newTimeData = data.sort(sortTimeData);
  }
  renderItem(newTimeData);
});

// Compare time to get newTimeData
function sortTimeData({ time: a }, { time: b }) {
  const getNumber = (t) => +t.replace(/:/g, "");
  getNumber(a) - getNumber(b);
}

// Delete item
const deleteBtn = document.querySelectorAll(".delete");

deleteBtn.forEach(function (button, index) {
  button.addEventListener("click", function () {
    if (index > -1) {
      data.splice(index, 1);
    }
    localStorage.setItem("usersData", JSON.stringify(data));
    renderItem(data);
    location.reload();
    alert("Xoá thành công");
  });
});
