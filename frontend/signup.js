let form = document.getElementById("signupform");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phoneno");
let pass1Input = document.getElementById("password1");
let pass2Input = document.getElementById("password2");
// let API_URL = "https://kgnairbus.onrender.com";
// let API_URL = "http://localhost:3000";

let modalContainer = document.getElementById("modal-container");
let modalButton = document.getElementById("modal-button");
let modalTitle = document.getElementById("modal-title");
let modalText = document.getElementById("modal-text");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let name = nameInput.value;
  let email = emailInput.value;
  let phoneno = phoneInput.value;
  let password1 = pass1Input.value;
  let password2 = pass2Input.value;
  let isPasswordValid = false;
  let isPhoneValid = false;
  if (password1 != password2) {
    alert("Passwords do not match");
  } else {
    isPasswordValid = true;
  }

  if (phoneno.length == 10) {
    isPhoneValid = true;
  } else {
    alert("Phone number is not valid");
  }
  let id = Math.floor(100000 + Math.random() * 900000);

  if (isPasswordValid && isPhoneValid) {
    const data = {
      id,
      name,
      email,
      phone: phoneno,
      password: password1,
    };
    console.log(data);
    let signupBtn = document.getElementById("sign-up-btn");
    signupBtn.disabled = true;

    signupBtn.style.background = "gray";
    signupBtn.innerText = "Signing Up...";
    let res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      cors: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resjson = await res.json();
    console.log(resjson);

    signupBtn.style.background = "initial";
    signupBtn.innerText = resjson.authorized
      ? "SIGNUP SUCCESS"
      : "SIGNUP FAILED";
    let userInfo = resjson;
    modalContainer.classList.remove("hidden");
    modalContainer.classList.add("block");
    resjson.authorized && localStorage.setItem("kgn", JSON.stringify(userInfo));
    if (resjson.status === "success") {
      modalTitle.innerHTML =
        "Hello " +
        resjson.Name +
        "👋, <br/>" +
        "Your Account has successfully been Created.";
      modalText.innerText =
        "     You can now login with credentials. Thank you for joining our community. We look forward to providing you with a great user experience!";
      modalContainer.style.setProperty("--state-colour", "green");
      modalContainer.dataset.isAuthorized = true;
      console.log(
        "🤔 > form.addEventListener > modalContainer.dataset:",
        modalContainer.dataset
      );
    } else {
      modalTitle.innerHTML = "Some error occured. Please try again";
      modalText.innerText = resjson.message;
      // modalContainer.style.setProperty("--state-colour", "red");
      modalButton.style.backgroundColor = "red";
      document.getElementById("tick").style.display = "none";
      modalContainer.dataset.isAuthorized = false;
      console.log(
        "🤔 > form.addEventListener > modalContainer.dataset:",
        modalContainer.dataset
      );
    }
  }
  // window.reload();

  // if (resjson.authorized) {
  //   modalTitle.innerText = "Account successfully Created";
  // } else {
  //   modalTitle.innerText = "Some Error occured" + resjson;
  // }
  modalButton.onclick = () => {
    if (modalContainer.dataset.isAuthorized === "true") {
      window.location.href = "/";
    } else {
      window.location.reload();
    }
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
});
