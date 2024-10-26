import * as THREE from "three";
import { MyNurbsBuilder } from "../helpers/MyNurbsBuilder.js";


class Flower extends THREE.Object3D {
  constructor(app, position, scale = 1, rotation = new THREE.Vector3(0, 0, 0)) {
    super();
    this.app = app;
    this.flowerPosition = position;
    this.flowerScale = scale;
    this.flowerRotation = rotation;
    this.builder = new MyNurbsBuilder();

    this.material = new THREE.MeshPhongMaterial({
      transparent: this.opacity < 1.0,
      opacity: this.opacity,
      color: 0xff00000,
      side: THREE.DoubleSide,
    });
    this.samplesU = 16;
    this.samplesV = 16;
    this.meshes = []
    this.init();
  }

  init() {
    this.buildStem();
    this.buildPetals();
    this.buildBase();

    this.stemFlower = new THREE.Group()
    this.stemFlower.add(this.stem)
    this.stemFlower.add(this.flower)
    this.stemFlower.scale.set(this.flowerScale, this.flowerScale, this.flowerScale);
    this.stemFlower.rotation.set(this.flowerRotation.x, this.flowerRotation.y, this.flowerRotation.z);
    this.stemFlower.position.set(this.flowerPosition.x, this.flowerPosition.y, this.flowerPosition.z);
  }


  buildStem() {
    const p1 = new THREE.Vector3(3.71, 0.52, 0);
    const p2 = new THREE.Vector3(2.6, 3.91, 0);
    const p3 = new THREE.Vector3(5.79, 6.38, 0);
    const p4 = new THREE.Vector3(4.56, 10.51, 0);

    const curve = new THREE.CubicBezierCurve3(p1, p3, p2, p4);

    const geometry = new THREE.TubeGeometry(curve, 64, 0.2, 8, false);
    const material = new THREE.MeshStandardMaterial({ color: 0x006600 });
    this.stem = new THREE.Mesh(geometry, material);
    this.stem.scale.set(0.3, 0.3, 0.3);
    this.stem.position.set(-1, 0, 0);

  }

  buildPetals() {
    let petalRing1 = this.buildPetalRing();
    let petalRing2 = this.buildPetalRing();
    let petalRing3 = this.buildPetalRing();
  
    petalRing2.scale.set(0.8, 0.8, 0.8);
    petalRing2.rotateY(THREE.MathUtils.degToRad(30)); 
    petalRing3.scale.set(0.6, 0.6, 0.6);
    petalRing3.rotateY(THREE.MathUtils.degToRad(60)); 


    this.flower = new THREE.Group()
    this.flower.add(petalRing1)
    this.flower.add(petalRing2)
    this.flower.add(petalRing3)

    this.flower.scale.set(0.4, 0.4, 0.4);
    this.flower.position.set(0.4, 3.5, 0);
    this.flower.rotation.set(0, 0, THREE.MathUtils.degToRad(-10));
  } 

  buildBase(){
    let base = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), this.material);
    base.scale.set(1.1, 1 , 1.1);
    base.position.set(0, -0.7, 0);
    this.flower.add(base);
  }


  buildPetalRing(){
    let petal1 = this.buildPetal();
    let petal2 = this.buildPetal();
    let petal3 = this.buildPetal();


    petal1.rotation.set(0, THREE.MathUtils.degToRad(90), 0);
    petal1.position.set(0, 0, 0);    
    petal1.rotateX(THREE.MathUtils.degToRad(10));

  petal2.rotation.set(THREE.MathUtils.degToRad(10), THREE.MathUtils.degToRad(-10), 0)
    petal2.position.set(0, 0, -0.1)

    petal3.rotation.set(0, THREE.MathUtils.degToRad(240), 0)
    petal3.position.set(0, 0, 0) 
    petal3.rotateX(THREE.MathUtils.degToRad(10))


    let petalRing = new THREE.Group()
    petalRing.add(petal1)
    petalRing.add(petal2)
    petalRing.add(petal3)

    return petalRing 
  }

  buildPetal(){
    if (this.meshes !== null) {
      for (let i = 0; i < this.meshes.length; i++) {
        this.app.scene.remove(this.meshes[i]);
      }
      this.meshes = []; // empty the array
    }
    
    let orderU = 3;
    let orderV = 3;
    let controlPoints;
    let surfaceData;

    controlPoints = [
      // U = 0
      [
        [-0.5, -1, 0.0, 1],
        [-1, 0, 0.0, 3],
        [-0.5,0.5,0.3],
        [-1, 1.2, 0.0, 4],
      ],
      // U = 1
      [
        // V = 0..1
        [-0.5, -1, (4 * 0.5) / 3, 1],
        [-0.5, 0, 1.0, 7],
        [-0.2,0.5,0.3, 3],
        [-0.35, 1.2, 1, 20],
      ],
      [
        [0.5, -1, (4 * 0.5) / 3, 1],
        [0.5, 0, 1.0, 7],
        [0.2,0.5,0.3,3],
        [0.35, 1.2, 1, 20],
      ],
      // U = 2
      [
        // V = 0..1
        [0.5, -1, 0.0, 1],
        [1, 0, 0.0, 3],
        [0.5,0.5,0.3,3],
        [1, 1.2, 0.0, 4],
      ],
    ];

    surfaceData = this.builder.build(
      controlPoints,
      orderU,
      orderV,
      this.samplesU,
      this.samplesV,
      this.material
    );

    let petal = new THREE.Mesh(surfaceData, this.material);
    return petal
  }

  draw() {
    this.app.scene.add(this.stemFlower)
  }

}

export { Flower };
