import * as THREE from 'three';

class Candle extends THREE.Object3D {
    constructor(app, radius, height) {
        super();
        this.app = app;
        this.radius = radius;
        this.height = height;
        this.teardrops = [];
        this.init();
    }

    init() {

        this.buildCandleBody();
        this.buildCandleTop();
        this.buildCandleWick();
        this.buildTeardrop();


        this.add(this.candleMesh);
        this.add(this.topMesh);
        this.add(this.wickMesh);
    
    }   

    buildCandleBody(){
        this.geometry = new THREE.CylinderGeometry(this.radius, this.radius, this.height, 30);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffe3bd });
        this.candleMesh = new THREE.Mesh(this.geometry, this.material);
        this.candleMesh.position.y = this.height / 2;
    }

    buildCandleTop(){
        const points = [];
        points.push(new THREE.Vector2(this.radius, 0)); 
        points.push(new THREE.Vector2(this.radius * 0.95, 0.1 * this.radius)); 
        points.push(new THREE.Vector2(this.radius * 0.85, 0.2 * this.radius)); 
        points.push(new THREE.Vector2(this.radius * 0.75, 0.3 * this.radius)); 
        points.push(new THREE.Vector2(0, 0.35 * this.radius)); 

        this.topGeometry = new THREE.LatheGeometry(points, 30);
        this.topMaterial = new THREE.MeshBasicMaterial({ color: 0xffe3bd });
        this.topMesh = new THREE.Mesh(this.topGeometry, this.topMaterial);

        this.topMesh.position.y = this.height;
    }

    buildCandleWick(){
        const wickRadius = this.radius * 0.05; 
        const wickHeight = this.height * 0.1; 

        const wickCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, this.height / 2, 0), 
            new THREE.Vector3(0, this.height / 2 + wickHeight / 2, 0), 
            new THREE.Vector3(0.1, this.height / 2 + wickHeight, 0.05), 
        ]);

        const wickGeometry = new THREE.TubeGeometry(wickCurve, 20, wickRadius, 8, false);
        const wickMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); 
        this.wickMesh = new THREE.Mesh(wickGeometry, wickMaterial);
        this.wickMesh.position.y = this.height / 2 * 1.05;
    }

    buildTeardrop(){
        this.teardrops = [];
        this.createTeardrop(0.25, this.height * 0.5, 0);    
        this.createTeardrop(-0.25, this.height * 0.8, 0.1);  
        this.createTeardrop(0, this.height * 0.65, -0.25);
    }
    
    createTeardrop(x, y, z){
        const geometry = new THREE.SphereGeometry(0.08, 32, 32);
        geometry.scale(1, 1.5, 1);
    
        const material = new THREE.MeshBasicMaterial({ color: 0xffe3bd });
        const teardrop = new THREE.Mesh(geometry, material);
    
        teardrop.position.set(x, y, z);
        this.add(teardrop);
    }
    
    

    draw() {
        this.app.scene.add(this);
    }
}

export { Candle };
