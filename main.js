const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
function createWindow() {
  let win = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile(path.join(__dirname, "./frontend/index.html"));

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
      submenu: [
        {
          label: "Reservations",
          click: () => win.loadFile("frontend/admin/index.html"),
        },
      ],
    },
  ];
  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
app.whenReady().then(() => {
  createWindow();
  mainProcess();
});
function mainProcess() {}
