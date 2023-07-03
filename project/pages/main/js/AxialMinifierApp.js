"use strict"

import { AxialButton } from "../../../../axial/js/button/AxialButton";
import { AxialToggleButtonGroupBase } from "../../../../axial/js/button/AxialToggleButtonGroupBase";
import { GlobalPage } from "../../../js/GlobalPage";

class AxialMinifierApp extends GlobalPage
{
    /** @type { HTMLInputElement } */
    #fileInput;

    /** @type { HTMLElement } */
    #fileInfo;

    /** @type { HTMLInputElement } */
    #fileOutput;

    /** @type { AxialToggleButtonGroupBase } */
    #toggleGroupMode;

    /** @type { AxialButton } */
    #processButton;

    /** @type { Function } */
    #boundFileInputChangeHandler;

    /** @type { Function } */
    #boundProcessButtonClickHandler;

    constructor()
    {
        super();
        console.log("Hello AxialMinifier");

        this.#boundFileInputChangeHandler = this.#fileInputChangedHandler.bind(this);
        this.#boundProcessButtonClickHandler = this.#processButtonClickHandler.bind(this);
    }

    _onApplicationPageLoaded( event )
    {
        super._onApplicationPageLoaded( event );
        
        this.#fileInput = document.getElementById("fileInput");
        this.#fileInfo = document.getElementById("fileInfo");
        this.#fileOutput = document.getElementById("fileOutput");
        this.#toggleGroupMode = document.getElementById("toggleGroupMode");
        this.#processButton = document.getElementById("processButton");

        this.#fileInput.addEventListener("change", this.#boundFileInputChangeHandler);
        this.#processButton.addEventListener("click", this.#boundProcessButtonClickHandler);

        this.#toggleGroupMode.forceSelection = true;
        this.#toggleGroupMode.selectedIndex = 0;
    }

    #fileInputChangedHandler( event )
    {
        console.log("file change");
        this.#updateInterface();
    }

    #updateInterface()
    {
        const file = this.#fileInput.files[0];
        if( file === undefined || file === null )
        {
            throw new Error("[AXIAL_MINIFIER][ERROR] file not found" );
        }
        console.log(file);
        const inputName = file.name;
        const inputPath = file.path; // electron property

        const inputBaseName = inputName.split(".js")[0];
        console.log(inputBaseName);
        const inputBasePath = inputPath.split(inputName)[0];
        console.log(inputBasePath);

        const outputName = inputBaseName + ".min.js";
        const outputPath = inputBasePath + outputName;
        
        this.#fileInfo.innerHTML = inputName;
        this.#fileOutput.value = outputPath;
    }

    #processButtonClickHandler( event )
    {
        const file = this.#fileInput.files[0];
        if( file === undefined || file === null )
        {
            throw new Error("[AXIAL_MINIFIER][ERROR] file not found" );
        }
        console.log(file);

        const mode = this.#toggleGroupMode.selectedIndex == 0 ? "production" : "development";

        const inputName = file.name;
        const inputPath = file.path; // electron property
        const inputBaseName = inputName.split(".js")[0];
        const inputBasePath = inputPath.split(inputName)[0];
        const outputName = inputBaseName + ".min.js";
        
        const minifyParams = 
        {
            mode: mode,
            jsInput : inputPath,
            jsOutputPath: inputBasePath,
            jsOutput: outputName
        };

        window.axialElectron.minify( minifyParams );
    }
}
export { AxialMinifierApp }