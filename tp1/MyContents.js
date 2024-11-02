import * as THREE from "three"
import { MyAxis } from "./MyAxis.js"
import * as Objects from "./objects/index.js"

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

      const table_top_height = 0.3
      const table_leg_height = 3
      const furniture_color = 0x9B8863
      const floor_width = 25
      const floor_height = 45
      const wall_height = 16

      this.table = new Objects.Table(app, table_leg_height, table_top_height, 3, .2, furniture_color, new THREE.Vector3(-5, 0, -4))
      this.plate = new Objects.Plate(app, 1.5, 1, 0.2, new THREE.Vector3(-5, table_leg_height + table_top_height, -4))
      this.cake = new Objects.Cake(this.app, 1, 0.5, new THREE.Vector3(-5, 3.6, -4), -Math.PI / 2)
      this.candle = new Objects.Candle(app, 0.03 ,0.25, new THREE.Vector3(-4.95, 3.8, -4))
      this.spiral = new Objects.Spiral(this.app, new THREE.Vector3(-6, 3.6, -6), new THREE.Vector3(0, Math.PI / 4, Math.PI / 2), 0.5, 5, 128, 2, 0.1)

      this.counter = new Objects.Counter(this.app, 6, wall_height, "#696e56")
      this.door1 = new Objects.Door(this.app, new THREE.Vector3(- floor_height / 2 + .3, 0, -8), Math.PI / 2)
      this.door2 = new Objects.Door(this.app, new THREE.Vector3(- floor_height / 2 + 4.5, 0, - floor_width / 2 + .3), 0)
      this.door3 = new Objects.Door(this.app, new THREE.Vector3(floor_height / 2 - .3, 0, 8), - Math.PI / 2)

      this.floor = new Objects.Floor(this.app, floor_width, floor_height, "#f28f7e")
      this.ceiling = new Objects.Ceiling(this.app, this.floor, wall_height, "#fbf2d5")
      this.walls = [
        new Objects.Wall(this.app, floor_width, wall_height, "#696e56", [],
          new THREE.Vector3(floor_height / 2, 0, - floor_width / 2),
          - Math.PI / 2, []
        ),
        new Objects.Wall(this.app, floor_width, wall_height, "#696e56", [],
          new THREE.Vector3(- floor_height / 2, 0, floor_width / 2),
          Math.PI / 2, [   
            { x: -22.4, y: 8, z: 0.5 },
            { x: -22.4, y: 10, z: -3 },
            { x: -22.4, y: 12, z: 1 },
            { x: -22.4, y: 10.5, z: 0 },
            { x: -22.4, y: 9, z: -1 },
          ]
        ),
        new Objects.Wall(this.app, floor_height, wall_height, "#696e56", [],
          new THREE.Vector3(- floor_height / 2, 0, - floor_width / 2),
          0, []
        ),
        new Objects.Wall(this.app, floor_height, wall_height, "#696e56", [
          { x: floor_height * 0.4, y: 5, width: 4, height: 7, depth: 0.3, frame_thickness: 0.3, color: furniture_color },
          { x: floor_height * 0.8, y: 5, width: 4, height: 7, depth: 0.3, frame_thickness: 0.3, color: furniture_color }
        ],
          new THREE.Vector3(floor_height / 2, 0,floor_width / 2),
          Math.PI, []
        ),
      ]
            
      this.chair = new Objects.Chair(this.app, new THREE.Vector3(0, 0, -7))
      this.sofa = new Objects.Sofa(app)
      this.newspaper = new Objects.Newspaper(app, 1.5, new THREE.Vector3(-13, 2.77, 9))

      this.suitcase = new Objects.Suitcase(app)

      this.diogo_frame = new Objects.Frame(this.app, new THREE.Vector3(3, 7, -12.5), "./texture/diogo.jpg", 4, 4, 0.5, 1200, 1600, ),
      this.jaime_frame = new Objects.Frame(this.app, new THREE.Vector3(-3, 7, -12.5), "./texture/jaime.jpg", 4, 4, 0.5, 640, 640, ),
      this.pulp_fiction_frame = new Objects.Frame(this.app, new THREE.Vector3(-22.4, 5, 6), "./texture/pulpfiction.jpg", 6, 8, 0.5, 1055, 1536, false, { x: 0, y: Math.PI / 2, z: 0 })
      this.beetle = new Objects.Beetle(this.app, 2, 0.5, new THREE.Vector3(floor_height / 2 - 0.25, wall_height / 2 + 1, - floor_width / 4), Math.PI / 2)
      this.beetle_frame = new Objects.Frame(this.app, new THREE.Vector3(floor_height / 2, wall_height / 2 + .3, - floor_width / 4), "./texture/track.png", 6, 4, 0.2, 1055, 1536, true, { x: 0, y: - Math.PI / 2, z: 0 })

      this.vase = new Objects.Vase(this.app, new THREE.Vector3(-21, 1.1, -2), true);
      this.flowers = [
        new Objects.Flower(this.app, new THREE.Vector3(-21, 2.6, -2), 0.5, new THREE.Vector3(0, -10, 0)),
        new Objects.Flower(this.app, new THREE.Vector3(-20.9, 2.1, -2), 0.5),
        new Objects.Flower(this.app, new THREE.Vector3(-21, 2.3, -1.9), 0.5, new THREE.Vector3(0, 5, 0))
      ];

      this.little_table = new Objects.LittleTable(this.app, new THREE.Vector3(- floor_height * 0.475, 0, 0))      
      this.lamp = new Objects.Lamp(this.app, 9, furniture_color, new THREE.Vector3(- floor_height * 0.45, 0, floor_width * 0.4))
      this.wall_lamps = [
        new Objects.WallLamp(this.app, new THREE.Vector3(- floor_height / 2, 8, -1), Math.PI / 2),
        new Objects.WallLamp(this.app, new THREE.Vector3(- floor_height / 2 + 11, 8, - floor_width / 2), 0),
        new Objects.WallLamp(this.app, new THREE.Vector3(floor_height / 2, 8, 1), - Math.PI / 2),
      ]

      this.light_switch = new Objects.LightSwitch(this.app, new THREE.Vector3(- floor_height / 2, 5, -4), Math.PI / 2)
    }

    /**
     * initializes the contents
     */
    init() {
        // create once 
        if (this.axis === null) {
          // create and attach the axis to the scene
          // this.axis = new MyAxis(this)
          // this.app.scene.add(this.axis)
        }

        // add a point light on top of the model
        const pointLight = new THREE.PointLight( 0xffffff, 200, 0 )
        pointLight.position.set( 0, 20, 0 )
        this.app.scene.add( pointLight )

        // add a point light helper for the previous point light
        // const sphereSize = 0.5
        // const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize )
        // this.app.scene.add( pointLightHelper )

        // add an ambient light
        const ambientLight = new THREE.AmbientLight( 0x555555 )
        this.app.scene.add( ambientLight )

        this.build()
        this.illuminate()
    }

    build() {
      this.table.draw()
      this.plate.draw()
      this.cake.draw()
      this.spiral.draw()
      this.candle.draw()
      this.chair.draw()
      this.sofa.draw()
      this.suitcase.draw()
      this.floor.draw()
      this.walls.forEach(wall => wall.draw())
      this.ceiling.draw()
      this.diogo_frame.draw()
      this.jaime_frame.draw()
      this.pulp_fiction_frame.draw()
      this.counter.draw()
      this.door1.draw()
      this.door2.draw()
      this.door3.draw()
      this.newspaper.draw()
      this.vase.draw();
      this.flowers.forEach(flower => flower.draw())
      this.beetle.draw()
      this.beetle_frame.draw()
      this.little_table.draw()
      this.lamp.draw()
      this.wall_lamps.forEach(wall_lamp => wall_lamp.draw())
      this.light_switch.draw()
    }   

    illuminate() {
      this.cakeSpotLight = new THREE.SpotLight(0xffffff, 500, 21, Math.PI / 9, 1)
      this.cakeSpotLight.position.set(-5, 10, -4)
      this.cakeSpotLight.castShadow = true
      this.cakeSpotLight.receiveShadow = true

      this.app.scene.add(this.cakeSpotLight)

      this.cakeSpotLight.target.position.set(-5, 3.8, -4)
      this.app.scene.add(this.cakeSpotLight.target)
  }
}

export { MyContents }
