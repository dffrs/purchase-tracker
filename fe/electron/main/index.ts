import { app, BrowserWindow, shell, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";
import fs from "fs";
import { update } from "./update";
import { ChildProcessWithoutNullStreams, spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, "../..");

export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

const BE_PATH = app.isPackaged
  ? path.join(process.resourcesPath, "app.asar.unpacked", "bin")
  : path.join(process.env.APP_ROOT, "bin");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
let beProcess: ChildProcessWithoutNullStreams | null = null;

const preload = path.join(__dirname, "../preload/index.mjs");
const indexHtml = path.join(RENDERER_DIST, "index.html");

function getDBPath() {
  const userData = app.getPath("userData");
  const dbDir = path.join(userData, "db");
  const dbFile = path.join(dbDir, "data.db");

  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true })

  if (!fs.existsSync(dbFile)) {
    const template = app.isPackaged 
      ? path.join(process.resourcesPath, "app.asar.unpacked", "db", "data.db")
      : path.join(process.env.APP_ROOT, "db", "data.db");
    
    fs.copyFileSync(template, dbFile)
  }

  return dbFile;
}

async function startBE() {
  const dbPath = getDBPath()

  const beExecutable = process.platform === "win32" ? "be.exe" : "be";
  const bePath = path.join(BE_PATH, beExecutable);

  beProcess = spawn(bePath, ["--db", dbPath])

  beProcess.stdout.on("data", (d) => console.log("BE:", d.toString()));
  beProcess.stderr.on("data", (d) => console.error("BE ERR:", d.toString()));

  beProcess.on("exit", (code) => {
    console.log("Backend exited:", code);
  });
}

async function createWindow() {
  win = new BrowserWindow({
    title: "Purchase Tracker",
    icon: path.join(process.env.VITE_PUBLIC, "favicon.ico"),
    width: 1024,
    height: 800,
    minWidth: 1024,
    minHeight: 800,
    resizable: true,
    titleBarStyle: "hidden",
    ...(process.platform !== "darwin" ? { titleBarOverlay: true } : {}),
    webPreferences: {
      preload,
      devTools: false,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  });

  win.setMenu(null);

  if (VITE_DEV_SERVER_URL) {
    // #298
    win.loadURL(VITE_DEV_SERVER_URL);
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  // Auto update
  update(win);
}

app.whenReady().then(startBE).then(createWindow);

app.on("before-quit", () => {
  if (beProcess) beProcess.kill();
})

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
