import * as THREE from "three";

import { MyNurbsBuilder } from "../helpers/MyNurbsBuilder.js";

/**
 * @class Vase
 * @extends THREE.Object3D
 * @description This class creates a vase. The vase is made of a NURBS ( Non-Uniform Rational B-Spline) surface.
 * @param {App} app - The app object.
 * @param {THREE.Vector3} position - The position of the vase.
 * @param {boolean} withFlower - If the vase will have a flower, it adds dirt to the vase.
 */
class Vase extends THREE.Object3D {
  constructor(app, position, withFlower = false) {
    super();
    this.app = app;
    this.vasePosition = position;
    this.builder = new MyNurbsBuilder();
    this.withFlower = withFlower;

    this.material = new THREE.MeshPhongMaterial({
      color: 0xa0a0a0,
      side: THREE.DoubleSide,
      shininess: 100,
      specular: 0xffffff,
    });

    this.dirtMaterial = new THREE.MeshPhongMaterial({ color: 0x8c2d19 });

    this.material.side = THREE.DoubleSide;
    this.samplesU = 16;
    this.samplesV = 16;
    this.meshes = [];
    this.init();
  }


  init() {
    this.build();
    if (this.withFlower) {
      this.buildDirt();
    }

    this.vase.position.set(
      this.vasePosition.x,
      this.vasePosition.y,
      this.vasePosition.z
    );
  }

  build() {
    if (this.meshes !== null) {
      for (let i = 0; i < this.meshes.length; i++) {
        this.app.scene.remove(this.meshes[i]);
      }
      this.meshes = []; // empty the array
    }

    let controlPoints;
    let surfaceData;
    let orderU = 3;
    let orderV = 3;

    // build nurb #1
    controlPoints = [
      // U = 0
      [
        [-0.5, -1, 0.0, 1],
        [-1, 0, 0.0, 3],
        [-0.4, 1.5, 0.0, 4],
        [-0.5, 2, 0.0, 2],
      ],
      // U = 1
      [
        // V = 0..1
        [-0.5, -1, (4 * 0.5) / 3, 1],
        [-0.5, 0, 1.0, 10],
        [-0.35, 1.5, 0.3, 4],
        [-0.35, 2, 0.75, 2],
      ],
      [
        [0.5, -1, (4 * 0.5) / 3, 1],
        [0.5, 0, 1.0, 10],
        [0.35, 1.5, 0.3, 4],
        [0.35, 2, 0.75, 2],
      ],
      // U = 2
      [
        // V = 0..1
        [0.5, -1, 0.0, 1],
        [1, 0, 0.0, 3],
        [0.4, 1.5, 0.0, 4],
        [0.5, 2, 0.0, 2],
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

    let mesh = new THREE.Mesh(surfaceData, this.material);
    let mesh1 = new THREE.Mesh(surfaceData, this.material);

    mesh1.rotation.y = Math.PI;

    this.vase = new THREE.Group();
    this.vase.add(mesh);
    this.vase.add(mesh1);
    this.vase.add(this.buildBase());
  }

  buildDirt() {
    const geometry = new THREE.CircleGeometry( 0.47, 16 );
    const dirt = new THREE.Mesh(geometry, this.dirtMaterial);
    dirt.position.set(0, 1.5, 0);
    dirt.rotation.x = -Math.PI / 2;
    this.vase.add(dirt);
  }

  buildBase() {
    const geometry = new THREE.CircleGeometry(0.5, 32);
    const circle = new THREE.Mesh(geometry, this.material);
    circle.position.set(0, -1, 0);
    circle.rotation.x = -Math.PI / 2;
    return circle;
  }

  draw() {
    this.app.scene.add(this.vase);
  }
}

export { Vase };
