const { app, BrowserWindow, ipcMain, webContents } = require('electron');
const path = require('path');

const createWindow = () => {
    const options = {
        width: 320,
        height: 240,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        } 
    };

    const first = new BrowserWindow(options);
    const second = new BrowserWindow(options);

    first.loadFile('index.html');
    second.loadFile('index.html');
};

app.whenReady().then(() => {
    createWindow();

    let apples = 10;

    ipcMain.on('reqCount', (e) => {
        e.reply('count', apples);
    });

    ipcMain.on('reqSteal', (e) => {
        apples--;
        e.reply('count', apples);
    });

    ipcMain.on('reqBroadcast', (e) => {
        const contents = webContents.getAllWebContents();
        for (const c of contents)
            c.send('count', apples);
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length == 0)
            createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});