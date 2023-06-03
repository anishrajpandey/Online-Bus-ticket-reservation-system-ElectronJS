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
    let dialog = `<div class="block min-w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-200 w-screen grid min-h-screen place-items-center" > <dialog class="p-12 w-56 h-60 backdrop:bg-gray-400 rounded backdrop:bg-opacity-50 flex justify-center flex-col align-center open:animate-fade-in open:backdrop:animate-fade-in" open>
      <p class="mb-6 text-lg font-bold text-black">Please Enter Upcoming Date</p>
      <form>
        <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >OK</button>
      </form>
    </dialog></div>`;
    document.body.innerHTML = dialog;
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
    if (resjson.success) {
      let dialog = `<div class="block min-w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-200 w-screen grid min-h-screen place-items-center" > <dialog class="p-12 w-56 h-60 backdrop:bg-gray-400 rounded backdrop:bg-opacity-50 flex justify-center flex-col align-center open:animate-fade-in open:backdrop:animate-fade-in" open>
      <p class="mb-6 text-lg font-bold text-black">Bus has been added successfully</p>
      <form>
        <button class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >OK</button>
      </form>
    </dialog></div>`;
      document.body.innerHTML = dialog;
    } else {
      let dialog = `<div class="block min-w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-200 w-screen grid min-h-screen place-items-center" > <dialog class="p-12 w-56 h-60 backdrop:bg-gray-400 rounded backdrop:bg-opacity-50 flex justify-center flex-col align-center open:animate-fade-in open:backdrop:animate-fade-in" open>
      <p class="mb-6 text-lg font-bold text-black">ERROR</p>
      <form>
        <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >OK</button>
      </form>
    </dialog></div>`;
      document.body.innerHTML = dialog;
    }
  }
});
deletebusbtn.onclick = async () => {
  let message = await versions.confirm();
  let response = message === "delete";
  if (response) {
    fetch(`${API_URL}/deleteAllBuses`)
      .then((r) => r.json())
      .then((r) => {
        if (r.success) {
          let dialog = `<div class="block min-w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-200 w-screen grid min-h-screen place-items-center" > <dialog class="p-12 w-56 h-60 backdrop:bg-gray-400 rounded backdrop:bg-opacity-50 flex justify-center flex-col align-center open:animate-fade-in open:backdrop:animate-fade-in" open>
      <p class="mb-6 text-lg font-bold text-black">Buses have been added successfully</p>
      <form>
        <button class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >OK</button>
      </form>
    </dialog></div>`;
          document.body.innerHTML = dialog;
        } else {
          let dialog = `<div class="block min-w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-200 w-screen grid min-h-screen place-items-center" > <dialog class="p-12 w-56 h-60 backdrop:bg-gray-400 rounded backdrop:bg-opacity-50 flex justify-center flex-col align-center open:animate-fade-in open:backdrop:animate-fade-in" open>
      <p class="mb-6 text-lg font-bold text-black">Some Error Occured</p>
      <form>
        <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >OK</button>
      </form>
    </dialog></div>`;
          document.body.innerHTML = dialog;
        }
      });
  }
};
