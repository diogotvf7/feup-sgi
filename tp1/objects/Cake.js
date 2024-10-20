import * as THREE from "three";

class Cake extends THREE.Object3D {
  constructor(app, radius, height, position, rotation=0, isSlice=false) {
    super();
    this.app = app;
    this.radius = radius;
    this.height = height;
    this.cakePosition = position;
    this.cakeRotation = rotation;
    this.isSlice = isSlice;
    
    this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.insideCakeGeometry = new THREE.PlaneGeometry(this.radius, this.height);

    const cakeTexture = new THREE.TextureLoader().load("./texture/cake.jpg");
    const coverCakeTexture = new THREE.TextureLoader().load(
      "./texture/cover.jpg"
    );

    this.cakeMaterial = new THREE.MeshStandardMaterial({
      map: cakeTexture,
      roughness: 1,
      metalness: 0,
    });
    this.coverCakeMaterial = new THREE.MeshStandardMaterial({
      map: coverCakeTexture,
      roughness: 1,
      metalness: 0,
    });

    this.init();
  }

  init() {
    this.isSlice ? this.buildSlice() : this.buildCake();
  }

  buildCake() {
    const geometry = new THREE.CylinderGeometry(
      this.radius,
      this.radius,
      this.height,
      32,
      1,
      false,
      0,
      (17 / 20) * 2 * Math.PI
    );
    this.cake = new THREE.Mesh(geometry, this.coverCakeMaterial);

    const insideCake1 = new THREE.Mesh(
      this.insideCakeGeometry,
      this.cakeMaterial
    );
    const insideCake2 = new THREE.Mesh(
      this.insideCakeGeometry,
      this.cakeMaterial
    );

    insideCake1.rotation.y = -(Math.PI / 2);
    insideCake1.position.z = 0.5;

    const angle = (3 / 20) * 2 * Math.PI;

    insideCake2.rotation.y = Math.PI / 2 - angle;
    insideCake2.position.set(
      -0.5 * Math.cos(Math.PI / 2 - angle) * this.radius,
      0,
      0.5 * Math.sin(Math.PI / 2 - angle) * this.radius
    );

    const cake = new THREE.Group();
    cake.add(this.cake);
    cake.add(insideCake1);
    cake.add(insideCake2);
    cake.rotation.y = this.cakeRotation;
    cake.position.set(this.cakePosition.x, this.cakePosition.y, this.cakePosition.z);

    this.add(cake);
  }

  buildSlice() {
    const sliceGeometry = new THREE.CylinderGeometry(
      this.radius,
      this.radius,
      this.height,
      32,
      1,
      false,
      0,
      (3 / 20) * 2 * Math.PI
    );

    this.slice = new THREE.Mesh(sliceGeometry, this.coverCakeMaterial);
    const insideCake1 = new THREE.Mesh(
      this.insideCakeGeometry,
      this.cakeMaterial
    );
    const insideCake2 = new THREE.Mesh(
      this.insideCakeGeometry,
      this.cakeMaterial
    );
    insideCake1.rotation.y = -(Math.PI / 2);
    insideCake1.position.z = 1;

    const angle = -(3 / 20) * 2 * Math.PI;

    insideCake2.rotation.y = Math.PI / 2 - angle;
    insideCake2.position.set(
      -0.5 * Math.cos(Math.PI / 2 - angle) * this.radius,
      0,
      0.5 * Math.sin(Math.PI / 2 - angle) * this.radius
    );

    const slice = new THREE.Group();
    slice.add(this.slice);
    slice.add(insideCake1);
    slice.add(insideCake2);

    slice.rotation.y = Math.PI / 2;
    slice.rotation.x = Math.PI / 2;
    
    slice.position.set(this.cakePosition.x, this.cakePosition.y, this.cakePosition.z);
    this.add(slice);
  }

  draw() {
    this.app.scene.add(this);
  }
}

export { Cake };
