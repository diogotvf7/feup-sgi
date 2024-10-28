import * as THREE from 'three'

class Window extends THREE.Object3D {
    constructor(app, width, height, depth, frame_thickness, color, position) {
        super();
        this.app = app;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.frame_thickness = frame_thickness;
        this.window_position = position;

        this.frame_material = new THREE.MeshPhongMaterial({ 
            color: color,
            specular: color,
            emissive: color,
            // side: THREE.BackSide
        }); 
        
        this.init();
    }

    init() {
        this.buildFrame()
        this.buildView()

        this.window = new THREE.Group();
        this.window.add(this.top_frame_mesh)
        this.window.add(this.bottom_frame_mesh)
        this.window.add(this.left_frame_mesh)
        this.window.add(this.right_frame_mesh)
        this.window.add(this.top_horizontal_divider_mesh)
        this.window.add(this.bottom_horizontal_divider_mesh)
        this.window.add(this.vertical_divider_mesh)

        this.window.receiveShadow = true;
        this.window.castShadow = true;
        this.window.position.set(this.window_position.x, this.window_position.y, this.window_position.z)
    }   

    buildFrame() {
        const divider_thickness = this.frame_thickness * .4
        const divider_depth = this.depth * .6

        this.horizontal_frame_geometry = new THREE.BoxGeometry(this.width, this.frame_thickness, this.depth)
        this.vertical_frame_geometry = new THREE.BoxGeometry(this.frame_thickness, this.height, this.depth)
        this.horizontal_divider_geometry = new THREE.BoxGeometry(this.width, divider_thickness, divider_depth)
        this.vertical_divider_geometry = new THREE.BoxGeometry(divider_thickness, this.height, divider_depth)

        // top frame
        this.top_frame_mesh = new THREE.Mesh(this.horizontal_frame_geometry, this.frame_material)
        this.top_frame_mesh.position.y = this.height / 2 - this.frame_thickness / 2

        // bottom frame
        this.bottom_frame_mesh = new THREE.Mesh(this.horizontal_frame_geometry, this.frame_material)
        this.bottom_frame_mesh.position.y = - this.height / 2 + this.frame_thickness / 2

        // left frame
        this.left_frame_mesh = new THREE.Mesh(this.vertical_frame_geometry, this.frame_material)
        this.left_frame_mesh.position.x = - this.width / 2 + this.frame_thickness / 2

        // right frame
        this.right_frame_mesh = new THREE.Mesh(this.vertical_frame_geometry, this.frame_material)
        this.right_frame_mesh.position.x = this.width / 2 - this.frame_thickness / 2

        // top horizontal divider   
        this.top_horizontal_divider_mesh = new THREE.Mesh(this.horizontal_divider_geometry, this.frame_material)
        // this.top_horizontal_divider_mesh.position.y = (this.height - this.frame_thickness) / 5
        this.top_horizontal_divider_mesh.position.y += (this.height / 2 - this.frame_thickness / 2) - (this.height - this.frame_thickness * 2) / 3 
        this.top_horizontal_divider_mesh.position.z = - (this.depth - divider_depth) / 2

        // bottom horizontal divider   
        this.bottom_horizontal_divider_mesh = new THREE.Mesh(this.horizontal_divider_geometry, this.frame_material)
        // this.bottom_horizontal_divider_mesh.position.y = - (this.height - this.frame_thickness) / 5
        this.bottom_horizontal_divider_mesh.position.y += (this.height / 2 - this.frame_thickness / 2) - (this.height - this.frame_thickness * 2) * 2 / 3 
        this.bottom_horizontal_divider_mesh.position.z = - (this.depth - divider_depth) / 2

        // vertical divider
        this.vertical_divider_mesh = new THREE.Mesh(this.vertical_divider_geometry, this.frame_material)
        this.vertical_divider_mesh.position.z = - (this.depth - divider_depth) / 2
    }

    buildView() {
        
    }

    draw() {
        this.app.scene.add(this.window); 
    }
}

export { Window }
