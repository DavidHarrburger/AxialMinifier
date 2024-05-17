const path = require("path");

module.exports =
{
    packagerConfig:
    {
        name: "Axial Minifier",
        icon: "./assets/icons/favicon",
        overwrite: true,
        executableName: "AxialMinifier",
        appVersion: "1.0.0"

    },
    rebuildConfig: {},
    makers:
    [
        {
            name: '@electron-forge/maker-squirrel',
            platforms: ["win32"],
            config: {},
        }
    ],
    publishers: [],
    plugins: [],
    hooks: {},
    buildIdentifier: {}
};