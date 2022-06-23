const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
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


app.whenReady().then(() => {
    createWindow()
})