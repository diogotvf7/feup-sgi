import * as THREE from 'three';

class Candle extends THREE.Object3D {
    constructor(app, radius, height, position) {
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
        this.candlePosition = position;

        this.init();
    }

    init() {

        this.buildCandleBody();
        this.buildCandleTop();
        this.buildCandleWick();
        this.buildFlame();

        this.candle = new THREE.Group();
        this.candle.add(this.candleMesh);
        this.candle.add(this.topMesh);
        this.candle.add(this.wickMesh);
        this.candle.add(this.flame);

        this.candle.position.set(this.candlePosition.x, this.candlePosition.y, this.candlePosition.z);

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
            new THREE.Vector3(0, 0, 0), 
            new THREE.Vector3(0, wickHeight / 2, 0), 
            new THREE.Vector3(this.radius * 0.1, wickHeight, this.radius * 0.05), 
        ]);

        const wickGeometry = new THREE.TubeGeometry(wickCurve, 20, wickRadius, 8, false);
        this.wickMesh = new THREE.Mesh(wickGeometry, this.wickMaterial);
        this.wickMesh.position.y = this.height + (wickHeight / 2);
    }

    
    buildFlame() {
        const flameHeight = this.height * 0.1;
        const flameRadius = this.radius * 0.25;
        
        this.flameGeometry = new THREE.ConeGeometry(flameRadius, flameHeight, 50);
        const flameMesh = new THREE.Mesh(this.flameGeometry, this.flameMaterial);
        flameMesh.position.y = flameHeight / 2;
    
        const sphereGeometry = new THREE.SphereGeometry(flameRadius, 32, 32);
        const sphereMesh = new THREE.Mesh(sphereGeometry, this.bottomFlameMaterial);
        sphereMesh.position.y = -flameHeight * 0.1;
    
        this.flame = new THREE.Group();
        this.flame.add(flameMesh);
        this.flame.add(sphereMesh);
        
        const wickTip = this.height + (this.height * 0.15);
        this.flame.position.set(this.radius * 0.1, wickTip, this.radius * 0.05);
    
        const rotationInDegrees = 15;
        const rotationInRadians = THREE.MathUtils.degToRad(rotationInDegrees);
        this.flame.rotation.x = rotationInRadians;
    }
    
    draw() {
        this.app.scene.add(this.candle);
        
        const lightIntensity = 2 * (this.radius / 0.5);
        const lightDistance = 100 * (this.height / 5);
        const light = new THREE.PointLight(0xe8b63b, lightIntensity, lightDistance);  
        light.position.set(
            this.radius * 0.6 + this.candlePosition.x, 
            this.height + (this.height * 0.15) + this.candlePosition.y, 
            this.radius * 0.6 + this.candlePosition.z
        );             

/* 
        const lightHelperGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const lightHelperMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const lightHelper = new THREE.Mesh(lightHelperGeometry, lightHelperMaterial);
        lightHelper.position.copy(light.position);
        this.app.scene.add(lightHelper); */

        this.app.scene.add(light);
    }
    
}

export { Candle };
