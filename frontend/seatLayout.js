let seats = document.querySelectorAll("li");
let reserveBtn = document.querySelector("#reserve-button");
const urlParams = new URLSearchParams(window.location.search);
const busName = urlParams.get("busname");
const price = urlParams.get("price");
const time = urlParams.get("time");
const unavailableSeats = urlParams.get("reservedSeats").split(",");
let total = document.querySelector("#total");
document.getElementById("nameofbus").innerText = `( ` + busName + " )";
for (occupied of unavailableSeats) {
  document
    .getElementById(occupied)
    ?.parentElement.children[1].classList.remove("available");
  document
    .getElementById(occupied)
    ?.parentElement.children[1].classList.add("unavailable");
}
[...seats].forEach((seat, i) => {
  if (!seat.children[0].classList.contains("seats") && seat.children[1])
    if (seat.children[1]) {
      let labeleme = seat.children[1];
      //   labeleme.textContent = i;
      labeleme.addEventListener("click", handleClick);
      if (labeleme.classList.contains("unavailable")) {
        labeleme.style.pointerEvents = "none";
        labeleme.style.cursor = "not-allowed";
        labeleme.classList.remove("reserved");
        labeleme.classList.remove("available");
      }
    }
});
let reservedSeats = [];
function handleClick(e) {
  console.log((reservedSeats.length + 1) * parseInt(price));
  if ([...e.target.classList].includes("available")) {
    e.target.classList.add("reserved");
    e.target.classList.remove("available");

    let seat = e.target.parentElement.children[0].id;
    reservedSeats.push(seat);
    total.innerText = "Rs. " + reservedSeats.length * parseInt(price);
  } else {
    e.target.classList.remove("reserved");
    e.target.classList.add("available");
    let seat = e.target.parentElement.children[0].id;
    reservedSeats = reservedSeats.filter((s) => {
      return s != seat;
    });
    total.innerText = "Rs. " + reservedSeats.length * parseInt(price);
  }
  reserveBtn.onclick = (e) => {
    e.target.disabled = true;
    let userdata = JSON.parse(localStorage.getItem("kgn"));
    const authorized = userdata?.authorized;

    authorized
      ? handleBookReservation(reservedSeats, userdata)
      : (document.body.innerHTML = `<div class="block min-w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-200 w-screen grid min-h-screen place-items-center" > <dialog class="p-12 w-56 h-60 backdrop:bg-gray-400 rounded backdrop:bg-opacity-50 flex justify-center flex-col align-center open:animate-fade-in open:backdrop:animate-fade-in" open>
      <p class="mb-6 text-lg font-bold text-black">Login First to continue</p>
      <form>
        <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >OK</button>
      </form>
    </dialog></div>`);
  };
}
let modalContainer = document.getElementById("modal-container");

function handleBookReservation(reservedSeats, userdata) {
  const urlParams = new URLSearchParams(window.location.search);
  const busid = urlParams.get("busid");
  const source = urlParams.get("source");
  const destination = urlParams.get("destination");
  const busName = urlParams.get("busname");
  const date = urlParams.get("date").split("/").join(" ");
  seatsInString = reservedSeats.join(" ");
  let bodyData = {
    userid: userdata.userid,
    name: busName,
    source,
    destination,
    date,
    seat: seatsInString,
    busid,
    time,
  };
  console.log(bodyData);
  fetch(`${API_URL}/book`, {
    method: "POST",
    body: JSON.stringify(bodyData),
    cors: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
      let modalButton = document.getElementById("modal-button");
      let modalTitle = document.getElementById("modal-title");
      let modalText = document.getElementById("modal-text");
      modalContainer.classList.remove("hidden");
      modalContainer.classList.add("block");
      console.log(r);
      if (r.success) {
        modalTitle.innerHTML =
          "Hello " +
          userdata.Name +
          "👋, <br/>" +
          "Bus has been successfully booked  ";
        modalText.innerText =
          "    Booking will be cancelled if payment is not completed sooner";
        modalContainer.style.setProperty("--state-colour", "green");
        modalContainer.dataset.success = "true";
      } else {
        modalTitle.innerHTML = "Some error occured. Please try again";
        modalText.innerText = userdata.message;
        // modalContainer.style.setProperty("--state-colour", "red");
        modalButton.style.backgroundColor = "red";
        document.getElementById("tick").style.display = "none";
        modalContainer.dataset.success = "false";

        // window.location.href = "/";
      }
    });
  let modalButton = document.getElementById("modal-button");

  modalButton.onclick = () => {
    modalContainer.dataset.success === "true"
      ? (window.location.href = "./buses.html")
      : window.location.reload();

    if ([...modalContainer.classList].includes("hidden")) {
      modalContainer.classList.remove("hidden");
      modalContainer.classList.add("block");
      console.log("shown");
    } else {
      modalContainer.classList.add("hidden");
      modalContainer.classList.remove("block");
      console.log("hidden");
    }
  };
}
