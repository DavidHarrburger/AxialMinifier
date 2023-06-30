console.log("Hello Electron Preload Script");

const { contextBridge, ipcRenderer } = require("electron");

function minifyJS( params )
{
    ipcRenderer.invoke("minify", params);
}

contextBridge.exposeInMainWorld( "axialElectron",
{
    minify: minifyJS
});