// const ADMIN_PASS = 123;
// let input = prompt("Enter Admin password");
// if (parseInt(input) == ADMIN_PASS) {
//   console.log("cool");
// } else {
//   window.location.href = "/";
//   console.log("nodt cool");
// }
window.addEventListener("load", fetchUsers);
function fetchUsers() {
  fetch(`${API_URL}/getUsers`)
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
      showUsers(r);
    });
}
function showUsers(data) {
  let tableBody = document.querySelector("#table-body");

  const { users } = data;
  if (!users[0]) {
    document.getElementById(
      "info"
    ).innerHTML = `<div class="p-4 my-1  text-sm text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">ERROR.......</span>No users Found. Change a few things up and try submitting again.
</div`;
  } else {
    for (let user of users) {
      let tr = document.createElement("tr");
      tr.className +=
        " bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600";
      tr.onclick = handleuserInfoClick;
      tableBody.appendChild(tr);
      let th = document.createElement("th");
      th.className +=
        " px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";
      tr.appendChild(th);
      th.innerText = user.userid;
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");

      td1.classList += " px-6 py-4";
      td2.classList += " px-6 py-4";
      td3.classList += " px-6 py-4";

      td1.innerText = user.Name;
      td2.innerText = user.Email;
      td3.innerText = user.phone;

      tr.append(td1, td2, td3);
    }
  }
}

async function handleuserInfoClick(e) {
  let tableRow = e.target.parentElement;
  let userid = tableRow.children[0].innerText;

  const data = {
    userid,
  };
  console.log(data);
  let res = await fetch(`${API_URL}/deleteUser`, {
    method: "POST",
    body: JSON.stringify(data),
    cors: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let resjson = await res.json();
  console.log(resjson);
  tableRow.classList.add("hidden");
}
