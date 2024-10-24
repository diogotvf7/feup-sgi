import * as THREE from "three";

class Flower extends THREE.Object3D {
  constructor(app, position) {
    super();
    this.app = app;
    this.flowerPosition = position;
    this.init();
  }

  init() {
    this.buildStem();
    // this.buildPetals();
  }
  buildStem() {
    const p1 = new THREE.Vector3(3.71, 0.52, 0);
    const p2 = new THREE.Vector3(2.6, 3.91, 0);
    const p3 = new THREE.Vector3(5.79, 6.38, 0);
    const p4 = new THREE.Vector3(4.56, 10.51, 0);

    // Create a CubicBezierCurve3
    const curve = new THREE.CubicBezierCurve3(p1, p3, p2, p4);

    const geometry = new THREE.TubeGeometry(curve, 64, 0.2, 8, false);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    this.stem = new THREE.Mesh(geometry, material);
    this.stem.scale.set(0.3, 0.3, 0.3);
  }

  buildPetals() {}

  draw() {
    this.app.scene.add(this.stem);
  }
}

export { Flower };
