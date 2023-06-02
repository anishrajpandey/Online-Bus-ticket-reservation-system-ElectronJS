let params = new URLSearchParams(window.location.search);
let name = params.get("name");
let email = params.get("email");
let subject = params.get("subject");
let message = params.get("message");
let data = { name, email, subject, message };
window.onload = sendMessage;

async function sendMessage() {
  let res = await fetch(`${API_URL}/sendMessage`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "Application/json",
    },
  });
  let resjson = await res.json();
  console.log(resjson);
  //   console.log(data);
}
