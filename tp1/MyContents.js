import * as THREE from 'three';
import { MyAxis } from './MyAxis.js';
import { Plate } from './objects/Plate.js';
import { Candle } from './objects/Candle.js';
import { Floor }  from './objects/Floor.js';
import { Walls } from './objects/Walls.js';
import { Ceiling } from './objects/Ceiling.js';
import { Table } from './objects/Table.js';
import { Cake } from './objects/Cake.js';
import { Frame } from './objects/Frame.js';

/**
 *  This class contains the contents of out application
 */
class MyContents  {

    /**
       constructs the object
       @param {MyApp} app The application object
    */ 
    constructor(app) {
        this.app = app
        this.axis = null

        this.plate = new Plate(app, 1.5, 1, 0.2, new THREE.Vector3(-5, 3.5, -4))
        this.cake = new Cake(app, 1, 0.5, new THREE.Vector3(-5, 3.8, -4), -Math.PI / 2)
        this.candle = new Candle(app, 0.03 ,0.25, new THREE.Vector3(-4.95, 4, -4))
        this.table = new Table(app, 3, .3, 3, .2, new THREE.Vector3(-5, 0, -4))

        // beige floor (rug)
        this.floor = new Floor(app, 25, 45, "#f28f7e", "#ffffff", 0)
        this.walls = new Walls(app, this.floor, 15, "#696e56")
        this.ceiling = new Ceiling(app, this.floor, this.walls, "#fbf2d5")

        this.frame = new Frame(app, new THREE.Vector3(0, 6, -12.5), "./texture/diogo.jpg", 4, 4, 0.5)
        this.frame2 = new Frame(app, new THREE.Vector3(8, 6, -12.5), "./texture/jaime.jpg", 4, 4, 0.5)
        this.frame3 = new Frame(app, new THREE.Vector3(-22.4, 5, 6), "./texture/pulpfiction.jpg", 6, 8, 0.5, false, {x: 0, y: Math.PI / 2, z: 0})
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

        // add a point light on top of the model
        const pointLight = new THREE.PointLight( 0xffffff, 500, 0 );
        pointLight.position.set( 0, 20, 0 );
        this.app.scene.add( pointLight );

        // add a point light helper for the previous point light
        // const sphereSize = 0.5;
        // const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        // this.app.scene.add( pointLightHelper );

        // add an ambient light
        const ambientLight = new THREE.AmbientLight( 0x555555 );
        this.app.scene.add( ambientLight );

    
        this.build()
        this.illuminate()
    }

    build() {
        this.plate.draw()
        this.cake.draw()
        this.candle.draw()
        this.floor.draw()
        this.walls.draw()
        this.ceiling.draw()
        this.table.draw()
        
        this.frame.draw()
        this.frame2.draw()
        this.frame3.draw()
    }

    illuminate() {
        this.cakeSpotLight = new THREE.SpotLight(0xe0ce9b, 500, 21, Math.PI / 12, 1);
        this.cakeSpotLight.position.set(-5, 10, -4);
        this.cakeSpotLight.castShadow = true;
        this.cakeSpotLight.receiveShadow = true;

        this.app.scene.add(this.cakeSpotLight);

        this.cakeSpotLight.target.position.set(-5, 3.8, -4);
        this.app.scene.add(this.cakeSpotLight.target);
    
        const spotLightHelper = new THREE.SpotLightHelper(this.cakeSpotLight);
        this.app.scene.add(spotLightHelper);

        const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const lightSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        lightSphere.position.copy(this.cakeSpotLight.position);
        this.app.scene.add(lightSphere); 
    
    }


}

export { MyContents };