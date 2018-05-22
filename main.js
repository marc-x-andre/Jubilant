const { app, BrowserWindow } = require('electron')

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#f6f6f6',
        icon: `${__dirname}/dist/favicon.ico`,
        minHeight: 800,
        minWidth: 1200,
        webPreferences: { webSecurity: false }
    })

    console.log(`file://${__dirname}/dist/favicon.ico`);

    win.setMenu(null);

    win.loadURL(`file://${__dirname}/dist/index.html`)
    // win.webContents.openDevTools()

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})