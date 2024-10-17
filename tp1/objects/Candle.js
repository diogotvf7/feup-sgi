import * as THREE from 'three';

class Candle extends THREE.Object3D {
    constructor(app, radius, height) {
        super();
        this.app = app;
        this.radius = radius;
        this.height = height;
        this.teardrops = [];
  
        this.candleMaterial = new THREE.MeshPhongMaterial({ color: 0xffe3bd });
        this.wickMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 }); 
        this.flameMaterial = new THREE.MeshPhongMaterial({ 
            color:0xd26f04 ,
            emissive:0xd26f04 ,
            emissiveIntensity: 1 
        });
        this.bottomFlameMaterial = new THREE.MeshPhongMaterial({ color: 0xD17205 });
        

        this.init();
    }

    init() {

        this.buildCandleBody();
        this.buildCandleTop();
        this.buildCandleWick();
        this.buildFlame();


        this.add(this.candleMesh);
        this.add(this.topMesh);
        this.add(this.wickMesh);
        this.add(this.flame)
    
    }   

    buildCandleBody(){
        this.geometry = new THREE.CylinderGeometry(this.radius, this.radius, this.height, 30);
        this.candleMesh = new THREE.Mesh(this.geometry, this.candleMaterial);
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
        this.topMesh = new THREE.Mesh(this.topGeometry, this.candleMaterial);

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
        this.wickMesh = new THREE.Mesh(wickGeometry, this.wickMaterial);
        this.wickMesh.position.y = this.height / 2 * 1.05;
    }

    
    buildFlame() {
        this.flameGeometry = new THREE.ConeGeometry(0.05, 0.2, 50);
        const flameMesh = new THREE.Mesh(this.flameGeometry, this.flameMaterial);
        flameMesh.position.y = 4.93;
    
        const sphereGeometry = new THREE.SphereGeometry(0.05, 32, 32);
        const sphereMesh = new THREE.Mesh(sphereGeometry, this.bottomFlameMaterial);
        sphereMesh.position.y = 4.83;
    
        const flame = new THREE.Group();
        flame.add(flameMesh);
        flame.add(sphereMesh);
        
        flame.position.set(0.1, -2.55, 0.05);
    
        const rotationInDegrees = 15;
        const rotationInRadians = THREE.MathUtils.degToRad(rotationInDegrees);
        flame.rotation.x = rotationInRadians
        flame.position.set(0.1,-2.4,-1.2)

        this.add(flame);
    }
    
    draw() {
        this.app.scene.add(this);
        
        const light = new THREE.PointLight(0xe8b63b, 1.5, 100);  
        light.position.set(0.3, this.height + 0.3, 0.3);             
        
        
                
        this.app.scene.add(light);
    }
    
}

export { Candle };
