let addBusForm = document.querySelector("#addBusForm");
let addbusbtn = document.querySelector("#addbusbtn");
let deletebusbtn = document.querySelector("#deletebusbtn");

console.log(addBusForm);
addBusForm.children;
console.log("🤔 > addBusForm.children:", addBusForm.children);
let inputs = [...addBusForm.children];
addBusForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
addbusbtn.addEventListener("click", async () => {
  console.log("dsfd");

  let source = inputs[0].children[1].value;
  let destination = inputs[1].children[1].value;
  let busName = inputs[2].children[1].value;
  let busid = inputs[3].children[1].value;
  let date = inputs[4].children[1].value.split("-").join(" ");
  let time = inputs[5].children[1].value.split(":").join(" ");
  let price = inputs[6].children[1].value;
  let reservedDate = new Date(date);
  let todaysDate = new Date();
  let validated = false;
  if (reservedDate < todaysDate) {
    alert("Please Enter Upcoming Date");
  } else {
    validated = true;
  }
  if (validated) {
    let data = { source, destination, busName, busid, date, time, price };
    console.log({ ...data });
    let res = await fetch(`${API_URL}/addBus`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "Application/json",
      },
    });
    let resjson = await res.json();
    console.log(resjson);
    resjson.success ? alert("Bus Added successfully") : alert("Error");
    window.location.reload();
  }
});
deletebusbtn.onclick = () => {
  console.log("hi");
  let response = confirm("Are you sure you want to delete all buses");
  if (response) {
    fetch(`${API_URL}/deleteAllBuses`)
      .then((r) => r.json())
      .then((r) => {
        if (r.success) {
          alert("Buses have been deleted successfully");
        } else {
          alert("some error occured");
        }
      });
  }
};
