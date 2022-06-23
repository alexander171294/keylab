const { app, BrowserWindow } = require('electron')


app.on('ready', () => {

    const createWindow = () => {
        const win = new BrowserWindow({
            width: 1200,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        })
        win.webContents.on('did-finish-load', e => {
            win.show();
        });

        win.webContents.openDevTools({
            mode: 'detach'
        });

        win.on('closed', () => {
            w = null
        });
        win.loadFile('www/index.html')
    }
    createWindow()
});