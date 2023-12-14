import {app, BrowserWindow} from 'electron';

let mainView;

app.whenReady().then(() => {
  mainView = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainView.loadFile('index.html');
});