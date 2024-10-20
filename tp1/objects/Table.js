import * as THREE from 'three'

class Table extends THREE.Object3D {
    constructor(app, width, height, table_top_height, table_leg_height, table_leg_radius, table_top_color, table_leg_color, position) {
        super();
        this.app = app;

        this.width = width 
        this.height = height 
        this.table_top_height = table_top_height 
        this.table_leg_height = table_leg_height 
        this.table_leg_radius = table_leg_radius
        this.tablePosition = position
        
        this.table_top_material = new THREE.MeshPhongMaterial({ 
            color: table_top_color,
            specular: table_top_color,
            emissive: table_top_color,
            shininess: 0,
        }); 

        this.table_leg_material = new THREE.MeshPhongMaterial({ 
            color: table_leg_color,
            specular: table_leg_color,
            emissive: table_leg_color,
            shininess: 0,
        }); 
        
        this.init();
    }

    init() {
        this.buildTable()

        this.table = new THREE.Group();
        this.table.add(this.table_top_mesh)
        this.table.add(this.tl_leg_mesh)
        this.table.add(this.tr_leg_mesh)
        this.table.add(this.bl_leg_mesh)
        this.table.add(this.br_leg_mesh)
        this.table.position.set(this.tablePosition.x, this.tablePosition.y, this.tablePosition.z)
        
    }   

    buildTable() {
        this.table_top_geometry = new THREE.BoxGeometry(this.width, this.table_top_height, this.height)
        this.table_leg_geometry = new THREE.CylinderGeometry(this.table_leg_radius, this.table_leg_radius, this.table_leg_height)

        this.table_top_mesh = new THREE.Mesh(this.table_top_geometry, this.table_top_material)
        this.table_top_mesh.position.y = this.table_top_height / 2 + this.table_leg_height

        this.tl_leg_mesh = new THREE.Mesh(this.table_leg_geometry, this.table_leg_material)
        this.tl_leg_mesh.position.x = - this.width / 2 + this.table_leg_radius * 2
        this.tl_leg_mesh.position.y = this.table_leg_height / 2
        this.tl_leg_mesh.position.z = - this.height / 2 + this.table_leg_radius * 2

        this.tr_leg_mesh = new THREE.Mesh(this.table_leg_geometry, this.table_leg_material)
        this.tr_leg_mesh.position.x = this.width / 2 - this.table_leg_radius * 2
        this.tr_leg_mesh.position.y = this.table_leg_height / 2
        this.tr_leg_mesh.position.z = - this.height / 2 + this.table_leg_radius * 2

        this.bl_leg_mesh = new THREE.Mesh(this.table_leg_geometry, this.table_leg_material)
        this.bl_leg_mesh.position.x = - this.width / 2 + this.table_leg_radius * 2
        this.bl_leg_mesh.position.y = this.table_leg_height / 2
        this.bl_leg_mesh.position.z = this.height / 2 - this.table_leg_radius * 2

        this.br_leg_mesh = new THREE.Mesh(this.table_leg_geometry, this.table_leg_material)
        this.br_leg_mesh.position.x = this.width / 2 - this.table_leg_radius * 2
        this.br_leg_mesh.position.y = this.table_leg_height / 2
        this.br_leg_mesh.position.z = this.height / 2 - this.table_leg_radius * 2
    }

    draw() {
        this.app.scene.add(this.table)
    }
}

export { Table }
