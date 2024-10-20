import * as THREE from "three";


class Frame extends THREE.Object3D {

    constructor(app, position, picture, imgX, imgY, frameWidth, withFrame=true){
        super();
        this.app = app;
        this.framePosition = position;
        this.imgX = imgX;
        this.imgY = imgY;
        this.frameWidth = frameWidth;
        this.withFrame = withFrame;
        this.pictureMaterial = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(picture),
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

    init(){
        this.framePicture = new THREE.Group()
        this.buildPicture();
        if(this.withFrame){
            this.buildFrame();
            this.framePicture.add(this.frame)
            this.framePicture.add(this.img)
        }else{
            //Hard Coded need to change
            this.img.rotation.y = Math.PI / 2;
            this.framePicture.add(this.img)
        }
        this.framePicture.position.set(this.framePosition.x, this.framePosition.y, this.framePosition.z)

    }

    buildFrame(){
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

    buildPicture(){
        const imgGeometry = new THREE.PlaneGeometry(this.imgX, this.imgY);
        this.img = new THREE.Mesh(imgGeometry, this.pictureMaterial);
        this.img.position.set(0, this.imgY / 2, 0.2)
    }

    draw(){
        this.app.scene.add(this.framePicture);
    }
}

export { Frame };
