import * as THREE from 'three'
import { MyNurbsBuilder } from "../helpers/MyNurbsBuilder.js";

/**
 * @class Newspaper
 * @extends THREE.Object3D
 * @description This class creates a newspaper. The newspaper is composed of four pages. Each page is made of a NURBS ( Non-Uniform Rational B-Spline) surface. For this newspaper, actual pages of the New York Times were used - from the edition of the Berlin Wall fall.
 * @param {App} app - The app object.
 * @param {number} height - The height of the newspaper.
 * @param {THREE.Texture} surface - The texture of the newspaper.
 * @param {THREE.Vector3} translate - The translation of the newspaper.
 */
class Newspaper extends THREE.Object3D {
    constructor(app, height, translate) {
        super();
        this.app = app;
        this.height = height
        this.width = height * 8 / 12
        this.translate = translate

        this.front = new THREE.TextureLoader().load("./texture/nyt.png");
        this.back = new THREE.TextureLoader().load("./texture/nyt-back.png");
        this.mid_right = new THREE.TextureLoader().load("./texture/nyt-mid-right.png");
        this.mid_left = new THREE.TextureLoader().load("./texture/nyt-mid-left.png");
        
        this.builder = new MyNurbsBuilder();
        this.samplesU = 16;
        this.samplesV = 16;
        
        this.init();
    }

    init() {
        this.buildFrontPage()
        this.buildBackPage()
        this.buildMidRightPage()
        this.buildMidLeftPage()

        this.newspaper = new THREE.Group();
        this.newspaper.add(this.front_page);
        this.newspaper.add(this.back_page);
        this.newspaper.add(this.mid_right_page);
        this.newspaper.add(this.mid_left_page);

        this.newspaper.translateX(this.translate.x)
        this.newspaper.translateY(this.translate.y)
        this.newspaper.translateZ(this.translate.z)
    }   

    buildBackPage() {
        const orderU = 3;
        const orderV = 3;

        const controlPoints = [
            [
                [1,     0,     0,       1],
                [1,     0,     .5,      1],
                [1,     0,     1,       1],
                [1,     0,     1.5,     1],
            ],
            [
                [.6,    0,     0,       1],
                [.6,    0,     .5,      1],
                [.6,    0,     1,       1],
                [.6,    0,     1.5,     1],
            ],
            [
                [.8,    1,   0,       1],
                [.8,    1,   .5,      1],
                [.8,    1,   1,       1],
                [.8,    1,   1.5,     1],
            ],
            [
                [0,     .85,    0,       1],
                [0,     .85,    .5,      1],
                [0,     .85,    1,       1],
                [0,     .85,    1.5,     1],
            ],
        ]

        const surfaceData = this.builder.build(
          controlPoints,
          orderU,
          orderV,
          this.samplesU,
          this.samplesV,
          this.material
        );

        this.back_page = new THREE.Mesh( surfaceData, new THREE.MeshBasicMaterial( { map: this.back, side: THREE.DoubleSide } ) );   
    }

    buildMidRightPage() {
        const orderU = 3;
        const orderV = 3;

        const controlPoints = [
            [
                [1,     0,     0,       1],
                [1,     0,     .5,      1],
                [1,     0,     1,       1],
                [1,     0,     1.5,     1],
            ],
            [
                [.75,   0,     0,       1],
                [.75,   0,     .5,      1],
                [.75,   0,     1,       1],
                [.75,   0,     1.5,     1],
            ],
            [
                [.8,    1,     0,       1],
                [.8,    1,     .5,      1],
                [.8,    .9,     1,       1],
                [.8,    1.2,   1.5,     1],
            ],
            [
                [0,     .9,    0,       1],
                [0,     .85,   .5,      1],
                [0,     .85,   1,       1],
                [0,     .85,   1.5,     1],
            ],
        ]

        const surfaceData = this.builder.build(
          controlPoints,
          orderU,
          orderV,
          this.samplesU,
          this.samplesV,
          this.material
        );

        this.mid_right_page = new THREE.Mesh( surfaceData, new THREE.MeshBasicMaterial( { map: this.mid_right, side: THREE.DoubleSide } ) );   
        this.mid_right_page.rotateZ(- 0.01 * Math.PI)
        this.mid_right_page.translateY(.05)
        this.mid_right_page.translateX(-.05)
    }

    buildFrontPage() {
        const orderU = 3;
        const orderV = 3;

        const controlPoints = [
            [
                [1.3,     0,    0,     1],
                [1.3,     0,    .5,    1],
                [1.3,     0,    1,     1],
                [1.3,     0,    1.5,   1],
            ],
            [
                [.55,   .3,   0,     1],
                [.55,   .3,   .5,    1],
                [.55,   .3,   1,     1],
                [.55,   .3,   1.5,   1],
            ],
            [
                [.4,    0,    0,     1],
                [.4,    0,    .5,    1],
                [.4,    0,    1,     1],
                [.4,    0,    1.5,   1],
            ],
            [
                [0,     0,    0,     1],
                [0,     0,    .5,    1],
                [0,     0,    1,     1],
                [0,     0,    1.5,   1],
            ],
        ]

        const surfaceData = this.builder.build(
          controlPoints,
          orderU,
          orderV,
          this.samplesU,
          this.samplesV,
          this.material
        );

        this.front_page = new THREE.Mesh( surfaceData, new THREE.MeshBasicMaterial( { map: this.front, side: THREE.DoubleSide } ) );
        this.front_page.translateX(1)
    }

    buildMidLeftPage() {
        const orderU = 3;
        const orderV = 3;

        const controlPoints = [
            [
                [1.3,     .13,   0,     1],
                [1.3,     .12,   .5,    1],
                [1.3,     .11,    1,     1],
                [1.3,     .10,   1.5,   1],
            ],
            [
                [.7,      0,   0,     1],
                [.7,      0,   .5,    1],
                [.7,      0,   1,     1],
                [.7,      0,   1.5,   1],
            ],
            [
                [1,     .5,    0,     1],
                [1,     .6,    .5,    1],
                [1,     .7,    1,     1],
                [1,     .8,    1.5,   1],
            ],
            [
                [0,     0,    0,     1],
                [0,     0,    .5,    1],
                [0,     0,    1,     1],
                [0,     0,    1.5,   1],
            ],
        ]

        const surfaceData = this.builder.build(
          controlPoints,
          orderU,
          orderV,
          this.samplesU,
          this.samplesV,
          this.material
        );

        this.mid_left_page = new THREE.Mesh( surfaceData, new THREE.MeshBasicMaterial( { map: this.mid_left, side: THREE.DoubleSide } ) );
        this.mid_left_page.translateX(1)
    }

    draw() {
        this.app.scene.add(this.newspaper)
    }
}

export { Newspaper }
