import * as THREE from "three";


/**
 * @class Frame
 * @extends THREE.Object3D
 * @description This class creates a frame with a picture inside.
 * @param {App} app - The app object.
 * @param {THREE.Vector3} position - The position of the frame.
 * @param {string} picture - The path to the picture.
 * @param {number} imgX - The width of the picture.
 * @param {number} imgY - The height of the picture.
 * @param {number} frameWidth - The width of the frame.
 * @param {number} pictureWidth - The width of the picture.
 * @param {number} pictureHeight - The height of the picture.
 * @param {boolean} withFrame - If the frame should be drawn.
 * @param {object} rotation - The rotation of the frame.
 */
class Frame extends THREE.Object3D {

    constructor(app, position, picture, imgX, imgY, frameWidth, pictureWidth, pictureHeight, withFrame=true, rotation={x:0, y:0, z:0}, ) {
        super();
        this.app = app;
        this.framePosition = position;
        this.imgX = imgX;
        this.imgY = imgY;
        this.frameWidth = frameWidth;

        this.pictureWidth = pictureWidth;
        this.pictureHeight = pictureHeight;
        
        this.withFrame = withFrame;
        this.frameRotation = rotation;

        this.planeTexture = new THREE.TextureLoader().load(picture);
        this.planeTexture.wrapS = THREE.RepeatWrapping;
        this.planeTexture.wrapT = THREE.RepeatWrapping;

        this.pictureMaterial = new THREE.MeshStandardMaterial({
            map: this.planeTexture,
            roughness: 1,
            metalness: 0,
        });
        this.frameMaterial = new THREE.MeshStandardMaterial({
            map : new THREE.TextureLoader().load("./texture/wood.jpg"),
            roughness: 1,
            metalness: 0,
        });
        
        this.init();
    }

    init() {
        this.framePicture = new THREE.Group()
        this.buildPicture();
        if (this.withFrame) {
            this.buildFrame();
            this.framePicture.add(this.frame)
            this.framePicture.add(this.img)
        } else {
            this.framePicture.add(this.img)
        }
        this.framePicture.position.set(this.framePosition.x, this.framePosition.y, this.framePosition.z)
        this.framePicture.rotation.set(this.frameRotation.x, this.frameRotation.y, this.frameRotation.z)
    }

    buildFrame() {
        const topBottomGeometryFrame = new THREE.BoxGeometry(this.imgX + this.frameWidth * 2, this.frameWidth, 0.5)
        const sideFrame = new THREE.BoxGeometry(this.frameWidth, this.imgY, 0.5)

        const bottomFrame = new THREE.Mesh(topBottomGeometryFrame, this.frameMaterial)
        const topFrame = new THREE.Mesh(topBottomGeometryFrame, this.frameMaterial)
        const leftFrame = new THREE.Mesh(sideFrame, this.frameMaterial)
        const rightFrame = new THREE.Mesh(sideFrame, this.frameMaterial)

        bottomFrame.position.set(0,-this.frameWidth / 2,0)
        topFrame.position.set(0, this.imgY + this.frameWidth / 2, 0)
        leftFrame.position.set(-this.imgX / 2 - this.frameWidth / 2, this.imgY / 2 , 0)
        rightFrame.position.set(this.imgX / 2 + this.frameWidth / 2, this.imgY / 2 , 0)

        this.frame = new THREE.Group()
        this.frame.add(bottomFrame)
        this.frame.add(topFrame)
        this.frame.add(leftFrame)
        this.frame.add(rightFrame)
    }

    buildPicture() {
      let planeUVRate = this.imgY / this.imgX;

      let planeTextureUVRate = this.pictureWidth / this.pictureHeight;
      let planeTextureRepeatU = 1;
      let planeTextureRepeatV = planeTextureRepeatU * planeUVRate * planeTextureUVRate;

      this.planeTexture.repeat.set(planeTextureRepeatU, planeTextureRepeatV);
      this.planeTexture.rotation = 0;
      this.planeTexture.offset = new THREE.Vector2(0, 0);

      const imgGeometry = new THREE.PlaneGeometry(this.imgX, this.imgY);
      this.img = new THREE.Mesh(imgGeometry, this.pictureMaterial);
      this.img.position.set(0, this.imgY / 2, 0.2); 
    }

    draw() {
        this.app.scene.add(this.framePicture);
    }
}

export { Frame };
