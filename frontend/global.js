let API_URL = "https://kgnairbus.onrender.com";
// let API_URL = "http://localhost:3000";
let ISAUTHORIZED = JSON.parse(localStorage?.getItem("kgn"))?.authorized;
if (ISAUTHORIZED) {
  let btnContainer = document.getElementById("loginButtonContainer");
  let anchor = btnContainer.children[0];
  anchor.href = `./dashboard.html?userid=${
    JSON.parse(localStorage?.getItem("kgn")).userid
  }&name=${JSON.parse(localStorage?.getItem("kgn")).Name}`;
  anchor.children[0].innerHTML = "Dashboard";
}
