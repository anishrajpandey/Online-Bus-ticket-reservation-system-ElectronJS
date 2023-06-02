let formInput = document.getElementById("form");
let nameInput = document.getElementById("name");
let passwordInput = document.getElementById("password");
let submitInput = document.getElementById("submit");
// let API_URL = "https://kgnairbus.onrender.com";

form.addEventListener("submit", async (e) => {
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
    alert("UNABLE TO VERIFY");
  }
});
