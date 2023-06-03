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
});
