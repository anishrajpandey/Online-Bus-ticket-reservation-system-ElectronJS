const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const prompt = require("electron-prompt");
const path = require("path");
function createWindow() {
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });
  win.loadFile(path.join(__dirname, "./frontend/index.html"));
  win.webContents.openDevTools();
  const template = [
    {
      label: "Navigate",
      submenu: [
        {
          label: "Home",
          click: () => win.loadFile("frontend/index.html"),
        },
        {
          label: "About",
          click: () => win.loadFile("frontend/about.html"),
        },
        {
          label: "Services",
          click: () => win.loadFile("frontend/services.html"),
        },
        {
          label: "Contact",
          click: () => win.loadFile("frontend/Contact.html"),
        },
      ],
    },
    {
      label: "Admin",
      click: () => win.loadFile("frontend/admin/index.html"),
    },
    {
      label: "Account",
      submenu: [
        {
          label: "Login",
          click: () => win.loadFile("frontend/login.html"),
        },
        {
          label: "Sign Up",
          click: () => win.loadFile("frontend/signup.html"),
        },
      ],
    },
    {
      label: "More options",
      submenu: [
        {
          label: "Reload",
          role: "reload",
        },
        {
          label: "Toggle Dev Tools",
          role: "toggledevtools",
        },
        {
          label: "Quit",
          role: "quit",
        },
        {
          label: "Minimize",
          role: "minimize",
        },
      ],
    },
  ];
  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
app.whenReady().then(() => {
  createWindow();
  ipcMain.handle("prompt", () =>
    prompt({
      alwaysOnTop: true,
      title: "Enter Admin Password to continue",
      label: "Admin Pass",
      value: "password",
      inputAttrs: {
        type: "number",
      },
      type: "input",
    })
  );
  ipcMain.handle("confirm", () =>
    prompt({
      alwaysOnTop: true,
      label: "Type 'delete' to continue",
      title: "CONFIRM DELETE??",
    })
  );
});
