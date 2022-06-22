const form = document.getElementById("form");
const fullName = document.getElementById("fullname");
const yearOfBirth = document.getElementById("year");
const tableBody = document.querySelector("tbody");
const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
let data = JSON.parse(localStorage.getItem("usersData"));

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

  let registeredTime = getTime();
  let newUser = new userInfo(
    fullName.value,
    yearOfBirth.value,
    gender.value,
    registeredTime
  );
  usersData.push(newUser);
  localStorage.setItem("usersData", JSON.stringify(usersData));
  let data = JSON.parse(localStorage.getItem("usersData"));

  console.log(data);

  renderItem(usersData, 1);
});

// Get time
function getTime() {
  let time = new Date();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  console.log(hours + ":" + minutes + " " + ampm);
  let yyyy = time.getFullYear();
  let mm = time.getMonth() + 1; // Months start at 0!
  let dd = time.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  time = dd + "/" + mm + "/" + yyyy;
  return hours + ":" + minutes + " " + ampm + "  " + time;
}

// Render items form LocalStorage
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

// Render when reload
if (data) {
  renderItem(data);
}
