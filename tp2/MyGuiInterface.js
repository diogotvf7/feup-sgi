import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MyApp } from './MyApp.js';
import { MyContents } from './MyContents.js';

/**
    This class customizes the gui interface for the app
*/
class MyGuiInterface  {

    /**
     * 
     * @param {MyApp} app The application object 
     */
    constructor(app) {
        this.app = app
        this.datgui =  new GUI();
        this.contents = null
    }

    /**
     * Set the contents object
     * @param {MyContents} contents the contents objects 
     */
    setContents(contents) {
        this.contents = contents
    }

    /**
     * Initialize the gui interface
     */
    init() {
        const nodes = this.app.scene.children

        const cameraFolder = this.datgui.addFolder('Camera')
        cameraFolder.add(this.app, 'activeCameraName', Object.keys(this.app.cameras) ).name("Active Camera")

        const lights = nodes.filter(x => x.isLight === true)
        const lightsFolder = this.datgui.addFolder('Lights')
        lights.forEach((light, index) => {
            lightsFolder.add(light, 'intensity', 0, light.intensity * 2)
                .name(`Light ${index + 1} Intensity`)
                .onChange((value) => {
                    light.intensity = value;
                });
        });

        const objects = nodes.filter(x => x.isObject3D === true && x.isGroup === true)
        const wireframeButton = this.datgui.add({ toggleWireframe: false }, 'toggleWireframe').name('Toggle Wireframe');

        wireframeButton.onChange((value) => {
            objects.forEach((obj) => {
                this.wireframeOn(obj, value)
            });
        });
    }

    wireframeOn(object, value) {
        if (object.isMesh) {
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach(material => material.wireframe = value);
        } else {
            object.children.forEach(child => this.wireframeOn(child, value));
        }
    }
}

export { MyGuiInterface };