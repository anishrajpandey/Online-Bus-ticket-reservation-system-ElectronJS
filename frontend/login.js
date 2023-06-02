let formInput = document.getElementById("form");
let nameInput = document.getElementById("name");
let passwordInput = document.getElementById("password");
let submitInput = document.getElementById("submit");
// let API_URL = "https://kgnairbus.onrender.com";

formInput.addEventListener("submit", async (e) => {
  e.preventDefault();

  let name = nameInput.value;
  let password = passwordInput.value;
  let form = formInput.value;
  console.log(name);
  console.log(password);
  const data = {
    email: name,
    password,
  };
  console.log("data");
  let res = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    cors: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let resjson = await res.json();
  console.log(resjson);
  if (resjson.authorized) {
    console.log(resjson);
    localStorage.setItem("kgn", JSON.stringify(resjson));
    window.location.href = `/dashboard.html?userid=${resjson.userid}&name=${resjson.Name}`;
    // window.location.href =
    //   "/dashboard.html?userid=" + resjson.userid + "?name=" + resjson.Name;
  } else {
    // alert("UNABLE TO VERIFY");

    let dialog = `<div class="block min-w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-200 w-screen grid min-h-screen place-items-center" > <dialog class="p-12 w-56 h-60 backdrop:bg-gray-400 rounded backdrop:bg-opacity-50 flex justify-center flex-col align-center open:animate-fade-in open:backdrop:animate-fade-in" open>
      <p class="mb-6 text-lg font-bold text-black">WRONG CREDENTIALS.... <br/> UNABLE TO LOG IN . PLEASE TRY AGAIN</p>
      <form>
        <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >OK</button>
      </form>
    </dialog></div>`;
    document.body.innerHTML = dialog;
  }
});
