const ADMIN_PASS = 123;
let input = prompt("Enter Admin password");
if (parseInt(input) == ADMIN_PASS) {
  console.log("cool");
} else {
  window.location.href = "/";
  console.log("not cool");
}
window.addEventListener("load", fetchBusData);
function fetchBusData() {
  console.log(API_URL);
  fetch(`${API_URL}/getBookings`)
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
      bookings(r);
    });
}
function bookings(data) {
  let tableBody = document.querySelector("#table-body");

  const { success, bookings } = data;
  if (!bookings[0]) {
    document.getElementById(
      "info"
    ).innerHTML = `<div class="p-4 my-1  text-sm text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">ERROR.......</span>No bookings Found. Change a few things up and try submitting again.
</div`;
  } else {
    for (bus of bookings) {
      let tr = document.createElement("tr");
      tr.dataset.reservedSeats = bus.reservedSeats;
      tr.dataset.userid = bus.userid;
      tr.className +=
        " bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600";
      tr.onclick = handleBusInfoClick;
      tableBody.appendChild(tr);
      let th = document.createElement("th");
      th.className +=
        " px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";
      tr.appendChild(th);
      th.innerText = bus.busid;
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let td5 = document.createElement("td");
      let td6 = document.createElement("td");
      let td7 = document.createElement("td");
      td1.classList += " px-6 py-4";
      td2.classList += " px-6 py-4";
      td3.classList += " px-6 py-4";
      td4.classList += " px-6 py-4";
      td5.classList += " px-6 py-4";
      td6.classList += " px-6 py-4";
      td7.classList += " px-6 py-4";
      td1.innerText = bus.userid;
      td2.innerText = bus.name;
      td3.innerText = bus.source;
      td4.innerText = bus.destination;
      td5.innerText = bus.date;
      td6.innerText = bus.time;
      td7.innerText = bus.seat;
      tr.append(td1, td2, td3, td4, td5, td6, td7);
    }
  }
}

async function handleBusInfoClick(e) {
  let tableRow = e.target.parentElement;
  let reservedSeats = tableRow.dataset.reservedSeats
    .trim()
    .split(" ")
    .join(",");
  let userid = tableRow.children[1].innerText;
  let busid = tableRow.children[0].innerText;
  //   let busName = tableRow.children[1].innerText;
  //   let source = tableRow.children[2].innerText;
  //   let destination = tableRow.children[3].innerText;
  //   let date = tableRow.children[4].innerText.split(" ").join("/");
  //   let price = tableRow.children[5].innerText;
  //   let time = tableRow.children[6].innerText;

  const data = {
    userid,
    busid,
  };

  let res = await fetch(`${API_URL}/deleteReservation`, {
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
