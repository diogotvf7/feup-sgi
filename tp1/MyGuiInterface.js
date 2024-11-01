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
        // Lights controls
        const lightFolder = this.datgui.addFolder('Lights')
        lightFolder.add(this.contents.cakeSpotLight, 'intensity', 0, 1000).name("Cake Spotlight Intensity")
        lightFolder.add(this.contents.lamp.lamp.children[3], 'intensity', 0, 100).name("Lamp Spotlight Intensity")

        // Camera controls
        const cameraFolder = this.datgui.addFolder('Camera')
        cameraFolder.add(this.app, 'activeCameraName', [ 'Perspective', 'JohnTravolta', 'SamuelLJackson', 'Left', 'Top', 'Front', 'Back'] ).name("active camera");
        cameraFolder.add(this.app.activeCamera.position, 'x', 0, 10).name("x coord")

        // Curtains controls
        const curtainFolder = this.datgui.addFolder('Curtains');
        const walls_with_curtains = this.app.contents.walls.filter((wall) => wall.curtains.length > 0);
        walls_with_curtains.forEach((wall, index) => {
            const curtains = wall.curtains
            curtains.forEach((curtain, index) => {
                curtainFolder.add(curtain, 'open_ratio', 0, 1).name(`Curtain ${index + 1}`).onChange((value) => {
                    wall.updateCurtain(curtain, value);
                });
            });
        });

        
        
    }
}

export { MyGuiInterface };