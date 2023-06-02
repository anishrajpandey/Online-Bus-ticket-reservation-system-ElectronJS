const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("userPrompt", {
//   prompt: (text, placeholder, icon) => userPrompt(text, placeholder, icon),
// });
contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  message: () => ipcRenderer.invoke("prompt"),
  confirm: () => ipcRenderer.invoke("confirm"),

  // we can also expose variables, not just functions
});
// contextBridge.exposeInMainWorld("prompt", {
// });

// const icon = __dirname + "/icon.png";

// userPrompt("Label text", "Placeholder text", icon)
//   .then((input) => {
//     console.log(input);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
