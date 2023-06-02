let container = document.querySelector("#messagesContainer");

// let div = document.createElement("div");
// div.innerHTML = messageElem;
// container.append(div);
let fetchMessages = async () => {
  let res = await fetch(`${API_URL}/getMessages`);
  let { messages } = await res.json();
  return messages;
};
fetchMessages().then((messages) => {
  for (let a of messages) {
    let { name, email, subject, message } = a;
    let messageElem = ` <a
            href="#"
            class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
          >
            <span
              class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
            ></span>

            <div class="sm:flex sm:justify-between sm:gap-4">
              <div>
                <h3 class="text-lg font-bold text-gray-900 sm:text-xl">
                  ${subject}
                </h3>

                <p class="mt-1 text-xs font-medium text-gray-600">By ${name}</p>
              </div>

              <div class="hidden sm:block sm:shrink-0">
                <img
                  alt="image"
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel "
                  class="h-16 w-16 rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>

            <div class="mt-4">
              <p class="max-w-[40ch] text-sm text-gray-500">
               ${message}
              </p>
            </div>

            <dl class="mt-6 flex gap-4 sm:gap-6">
              <div class="flex flex-col-reverse">
                <dt class="text-sm font-medium text-gray-600">Email</dt>
                <dd class="text-xs text-gray-500">${email}</dd>
              </div>
            </dl>
          </a>`;
    let div = document.createElement("div");
    div.innerHTML = messageElem;
    container.append(div);
  }
});
let deleteBtn = document.getElementById("delBtn");
deleteBtn.addEventListener("click", handleDelete);
function handleDelete() {
  fetch(`${API_URL}/deleteMessages`).then((r) => console.log(r.json()));
  alert("Deleted Successfully");
  window.location.reload();
}
