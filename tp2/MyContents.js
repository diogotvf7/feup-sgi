import * as THREE from 'three';
import { MyAxis } from './MyAxis.js';
import { MyFileReader } from './parser/MyFileReader.js';
import { loadCameras, loadGlobals, loadFog } from './loaders/index.js';



/**
 *  This class contains the contents of out application
 */
class MyContents {

    /**
       constructs the object
       @param {MyApp} app The application object
    */
    constructor(app) {
        this.app = app
        this.axis = null

        this.reader = new MyFileReader(this.onSceneLoaded.bind(this));
        this.reader.open("scenes/demo/demo.json");
    }

    /**
     * initializes the contents
     */
    init() {
        // create once 
        if (this.axis === null) {
            // create and attach the axis to the scene
            this.axis = new MyAxis(this)
            this.app.scene.add(this.axis)
        }
    }

    /**
     * Called when the scene JSON file load is completed
     * @param {Object} data with the entire scene object
     */
    onSceneLoaded(data) {
        this.onAfterSceneLoadedAndBeforeRender(data);
    }

    onAfterSceneLoadedAndBeforeRender(data) {
        
        let { globals, fog, cameras} = data.yasf

        //Load Global Settings
        if(globals){
            let globalsSettings = loadGlobals.execute(globals)
            this.app.scene.background = globalsSettings.background
            this.app.lights['ambient'] = globalsSettings.ambient
            this.app.scene.add(globalsSettings.ambient)
        }

        //Load Fog
        if(fog){
            let fogSettings = loadFog.execute(fog)
            this.app.scene.fog = fogSettings
        }

        if(cameras){
            let [initialCamera, allCameras] = loadCameras.execute(cameras)
            this.app.cameras = allCameras
            this.app.setActiveCamera(initialCamera)
        }



    }

    update() {
    }
}

export { MyContents };
