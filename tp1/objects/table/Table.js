import * as THREE from 'three'

class Table extends THREE.Object3D {
    constructor(app, radius, table_top_height, table_leg_height, table_leg_radius, color, position) {
        super();
        this.app = app;

        this.radius = radius 
        this.table_top_height = table_top_height 
        this.table_leg_height = table_leg_height 
        this.table_leg_radius = table_leg_radius
        this.tablePosition = position
        
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 512, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter,
            // encoding: THREE.sRGBEncoding,
        });

        this.cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
        this.cubeCamera.position.set(this.tablePosition.x, this.tablePosition.y - 1, this.tablePosition.z); // CubeCamera placed above the table
        this.app.scene.add(this.cubeCamera);

        this.table_top_material = new THREE.MeshPhongMaterial({ 
            shininess: 50,
            color: color,
            reflectivity: 0.7,
            envMap: this.cubeCamera.renderTarget.texture
        });

        this.table_leg_material = new THREE.MeshPhongMaterial({ 
            map : new THREE.TextureLoader().load("./texture/wood.jpg"),
            specular: new THREE.Color(0x555555), 
            shininess: 50
        }); 
        
        this.init();
    }

    init() {
        this.build()

        this.table = new THREE.Group();
        this.table.add(this.table_top_mesh)
        this.table.add(this.tl_leg_mesh)
        this.table.add(this.tr_leg_mesh)
        this.table.add(this.bl_leg_mesh)
        this.table.add(this.br_leg_mesh)
        this.table.position.set(this.tablePosition.x, this.tablePosition.y, this.tablePosition.z)

        // this.table.children.forEach((child) => {
        //     child.castShadow = true;
        //     child.receiveShadow = true;
        // })
    }   

    build() {
        this.table_top_geometry = new THREE.CylinderGeometry(this.radius, this.radius, this.table_top_height)
        this.table_leg_geometry = new THREE.CylinderGeometry(this.table_leg_radius, this.table_leg_radius * 0.6, this.table_leg_height)

        this.table_top_mesh = new THREE.Mesh(this.table_top_geometry, this.table_top_material)
        this.table_top_mesh.position.y = this.table_top_height / 2 + this.table_leg_height

        const table_leg_offset = this.radius * Math.cos(THREE.MathUtils.degToRad(45)) * 1.7

        this.tl_leg_mesh = new THREE.Mesh(this.table_leg_geometry, this.table_leg_material)
        this.tl_leg_mesh.position.x = - table_leg_offset / 2 + this.table_leg_radius * 2
        this.tl_leg_mesh.position.y = this.table_leg_height / 2
        this.tl_leg_mesh.position.z = - table_leg_offset / 2 + this.table_leg_radius * 2

        this.tr_leg_mesh = new THREE.Mesh(this.table_leg_geometry, this.table_leg_material)
        this.tr_leg_mesh.position.x = table_leg_offset / 2 - this.table_leg_radius * 2
        this.tr_leg_mesh.position.y = this.table_leg_height / 2
        this.tr_leg_mesh.position.z = - table_leg_offset / 2 + this.table_leg_radius * 2

        this.bl_leg_mesh = new THREE.Mesh(this.table_leg_geometry, this.table_leg_material)
        this.bl_leg_mesh.position.x = - table_leg_offset / 2 + this.table_leg_radius * 2
        this.bl_leg_mesh.position.y = this.table_leg_height / 2
        this.bl_leg_mesh.position.z = table_leg_offset / 2 - this.table_leg_radius * 2

        this.br_leg_mesh = new THREE.Mesh(this.table_leg_geometry, this.table_leg_material)
        this.br_leg_mesh.position.x = table_leg_offset / 2 - this.table_leg_radius * 2
        this.br_leg_mesh.position.y = this.table_leg_height / 2
        this.br_leg_mesh.position.z = table_leg_offset / 2 - this.table_leg_radius * 2

        this.table_top_mesh.receiveShadow = true;
        this.table_top_mesh.castShadow = true;        
    }

    update() {
        this.table.visible = false;
        this.cubeCamera.update(this.app.renderer, this.app.scene);
        this.table.visible = true;
    }
    
    draw() {
        this.app.scene.add(this.table)
    }
}

export { Table }
