console.log("Hello Electron App");

const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const { AxialMainProcess } = require("./project/js/AxialMainProcess");
const path = require("path");

function initWindow()
{
    const mainWindowOptions = 
    {
        width: 600,
        height: 400,
        resizable: false,
        minimizable: true,
        maximizable: false,
        title: "Axial Minifier",
        icon: path.join(__dirname, "assets/icons/favicon.ico"),
        webPreferences:
        {
            preload: path.join(__dirname, "main-preload.js")
        }

    }
    const mainWindow = new BrowserWindow( mainWindowOptions );
    mainWindow.loadFile("./build/index.html");
}

async function initElectronApp()
{
    try
    {
        await app.whenReady();
        initWindow();

        ipcMain.handle( "minify", AxialMainProcess.minifyJS );

        app.on("activate", electronAppActivateHandler);
        app.on("window-all-closed", electronAppWindowAllClosedHandler);

        //Menu.setApplicationMenu(null);
    }
    catch(err)
    {
        console.log(err);
    }
}

function electronAppActivateHandler()
{
    if( BrowserWindow.getAllWindows().length === 0 )
    {
        initWindow();
    }
}

function electronAppWindowAllClosedHandler()
{
    if( process.platform !== "darwin" )
    {
        app.quit();
    }
}

initElectronApp();