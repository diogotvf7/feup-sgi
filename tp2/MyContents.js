import { MyAxis } from './MyAxis.js';
import { MyFileReader } from './parser/MyFileReader.js';
import { loadCameras, loadGlobals, loadTextures, loadMaterials, loadObjects } from './loaders/index.js';

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
    }

    /**
     * initializes the contents
     */
    async init() {
        // Load the JSON scene
        try {
            const data = await this.loadScene("scenes/SGI_TP2_JSON_T06_G07_v1.json");
            this.onSceneLoaded(data);
        } catch (error) {
            console.error(`Failed to initialize contents: ${error}`);
        }

        if (this.axis === null) {
            this.axis = new MyAxis(this);
            this.app.scene.add(this.axis);
        }
    }

    async loadScene(filePath) {
        const reader = new MyFileReader();
        return await reader.open(filePath);
    }

    /**
     * Called when the scene JSON file load is completed
     * @param {Object} data with the entire scene object
     */
    onSceneLoaded(data) {
        this.onAfterSceneLoadedAndBeforeRender(data);
    }

    onAfterSceneLoadedAndBeforeRender(data) {
        let { globals, cameras, textures, materials, graph } = data.yasf
        
        let actions = {
            textures: () => {
                this.texturesSettings = loadTextures.execute(textures)
            },
            materials: () => {
                this.materialsSetttings = loadMaterials.execute(materials, this.texturesSettings)
            },
            globals: () => {
                let globalsSettings = loadGlobals.execute(globals)
                this.app.scene.background = globalsSettings.background
                this.app.lights['ambient'] = globalsSettings.ambient
                this.app.scene.add(globalsSettings.ambient)
                this.app.scene.fog = globalsSettings.fog
                this.app.scene.add(globalsSettings.skybox)
            },
            cameras: () => {
                let [initialCamera, allCameras] = loadCameras.execute(cameras)
                this.app.cameras = allCameras
                this.app.setActiveCamera(initialCamera)
            },
            objects: () => {
                [...loadObjects.execute(graph, this.materialsSetttings)] 
                .forEach(object => {
                    this.app.scene.add(object)
                })
            }
        };
    
        Object.keys(actions).forEach(key => {
            actions[key]();
        });
    }

    update() {
    }
}

export { MyContents };
