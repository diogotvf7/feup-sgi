import * as THREE from 'three'
import { Window } from './Window.js'

class Wall extends THREE.Object3D {
    constructor(app, width, height, color, windows_data, translate, rotate, bulletHoles) {
        super()
        this.app = app
        this.width = width
        this.height = height        
        this.color = color
        this.windows_data = windows_data
        this.translate = translate
        this.rotate = rotate
        this.bulletHoles = bulletHoles

        this.meshes = []

        this.wall_material = new THREE.MeshLambertMaterial({ 
            color: color,
            side: THREE.FrontSide
        }) 
        
        this.init()
    }

    init() {
        this.buildWall()
        this.windows_data.forEach(window_data => {
            this.buildFrame(
                window_data.x,
                window_data.y,
                window_data.width,
                window_data.height,
                window_data.depth,
                window_data.frame_thickness,
                window_data.color,
            )
        })
        if (this.windows_data.length != 0) this.buildView()
        if (this.bulletHoles.length != 0) this.buildBulletHoles()

        this.wall = new THREE.Group()
        this.meshes.forEach(mesh => {
            this.wall.add(mesh)
        })

        this.wall.receiveShadow = true
        this.wall.castShadow = true

        this.wall.translateX(this.translate.x)
        this.wall.translateY(this.translate.y)
        this.wall.translateZ(this.translate.z)
        this.wall.rotateY(this.rotate)
    }

    buildWall() {       
        const breakpoints = [0]
        this.windows_data.forEach(window => {
            breakpoints.push(window.x)
            breakpoints.push(window.x + window.width)
        })
        breakpoints.push(this.width)

        let i = 0
        let j = 0
        let isWall = true
        while (i < breakpoints.length - 1) {
            const start = breakpoints[i]
            const end = breakpoints[i + 1]
            const width = end - start

            if (isWall) {
                const geometry = new THREE.PlaneGeometry(width, this.height)
                const mesh = new THREE.Mesh(geometry, this.wall_material)
                mesh.position.x += start + width / 2
                mesh.position.y += this.height / 2
                this.meshes.push(mesh)
            } else {
                const window = this.windows_data[j]
                const down_geometry = new THREE.PlaneGeometry(width, window.y)
                const up_geometry = new THREE.PlaneGeometry(width, this.height - window.y - window.height)
                const down_mesh = new THREE.Mesh(down_geometry, this.wall_material)
                const up_mesh = new THREE.Mesh(up_geometry, this.wall_material)
                down_mesh.position.x += start + width / 2
                up_mesh.position.x += start + width / 2
                down_mesh.position.y += window.y / 2
                up_mesh.position.y += window.y + window.height + (this.height - window.y - window.height) / 2
                this.meshes.push(down_mesh, up_mesh)

                j++
            }

            isWall = !isWall
            i++
        }
    }

    buildFrame(x, y, width, height, depth, frame_thickness, color) {
        const divider_thickness = frame_thickness * .4
        const divider_depth = depth * .6

        const frame_material = new THREE.MeshPhongMaterial({ 
            color: color,
            specular: color,
            emissive: color,
        }); 
        
        const horizontal_frame_geometry = new THREE.BoxGeometry(width, frame_thickness, depth)
        const vertical_frame_geometry = new THREE.BoxGeometry(frame_thickness, height, depth)
        const horizontal_divider_geometry = new THREE.BoxGeometry(width, divider_thickness, divider_depth)
        const vertical_divider_geometry = new THREE.BoxGeometry(divider_thickness, height, divider_depth)

        // top frame
        const top_frame_mesh = new THREE.Mesh(horizontal_frame_geometry, frame_material)
        top_frame_mesh.position.x = x + width / 2
        top_frame_mesh.position.y = y + height - frame_thickness / 2
        this.meshes.push(top_frame_mesh)

        // bottom frame
        const bottom_frame_mesh = new THREE.Mesh(horizontal_frame_geometry, frame_material)
        bottom_frame_mesh.position.x = x + width / 2
        bottom_frame_mesh.position.y = y + frame_thickness / 2
        this.meshes.push(bottom_frame_mesh)

        // left frame
        const left_frame_mesh = new THREE.Mesh(vertical_frame_geometry, frame_material)
        left_frame_mesh.position.x = x + frame_thickness / 2
        left_frame_mesh.position.y = y + height / 2
        this.meshes.push(left_frame_mesh)

        // right frame
        const right_frame_mesh = new THREE.Mesh(vertical_frame_geometry, frame_material)
        right_frame_mesh.position.x =  x + width - frame_thickness / 2
        right_frame_mesh.position.y = y + height / 2
        this.meshes.push(right_frame_mesh)

        // top horizontal divider   
        const top_horizontal_divider_mesh = new THREE.Mesh(horizontal_divider_geometry, frame_material)
        top_horizontal_divider_mesh.position.x = x + width / 2
        top_horizontal_divider_mesh.position.y = y + height - frame_thickness / 2 - (height - frame_thickness * 2) / 3 
        top_horizontal_divider_mesh.position.z = - (depth - divider_depth) / 2
        this.meshes.push(top_horizontal_divider_mesh)

        // bottom horizontal divider   
        const bottom_horizontal_divider_mesh = new THREE.Mesh(horizontal_divider_geometry, frame_material)
        bottom_horizontal_divider_mesh.position.x = x + width / 2
        bottom_horizontal_divider_mesh.position.y = y + height - frame_thickness / 2 - (height - frame_thickness * 2) * 2 / 3 
        bottom_horizontal_divider_mesh.position.z = - (depth - divider_depth) / 2
        this.meshes.push(bottom_horizontal_divider_mesh)

        // vertical divider
        const vertical_divider_mesh = new THREE.Mesh(vertical_divider_geometry, frame_material)
        vertical_divider_mesh.position.x = x + width / 2
        vertical_divider_mesh.position.y = y + height / 2
        vertical_divider_mesh.position.z = - (depth - divider_depth) / 2
        this.meshes.push(vertical_divider_mesh)
    }

    buildView() {  // TODO: Melhorar isto, tornar uma vista panorâmica que se adapta à parede      
        const geometry = new THREE.CylinderGeometry(
            this.width / 2, 
            this.width / 2,
            this.height * 2,
            10,
            10,
            true,
            0,
            Math.PI
        )      
        
        const material = new THREE.MeshStandardMaterial({ 
            side: THREE.BackSide,
            map: new THREE.TextureLoader().load('./texture/view.jpg')
        });

        const view = new THREE.Mesh(geometry, material)
        view.rotateY(Math.PI / 2)
        view.position.x += this.width / 2
        view.position.y += this.height / 2

        this.meshes.push(view)
    }

    buildBulletHoles() {
        const bulletHoleGeometry = new THREE.CircleGeometry(0.1, 8, 8) 
    
        const bulletHoleTexture = new THREE.TextureLoader().load("./texture/bullethole.png")
        
        const bulletHoleMaterial = new THREE.MeshPhongMaterial({
            map: bulletHoleTexture,
            transparent: true
        }) 
    
        this.bulletHoles.forEach(pos => {
            const bulletHoleMesh = new THREE.Mesh(bulletHoleGeometry, bulletHoleMaterial)
            
            bulletHoleMesh.position.set(pos.x, pos.y, pos.z)
            bulletHoleMesh.scale.set(4,4,4)
            bulletHoleMesh.rotateY(Math.PI / 2)
            this.app.scene.add(bulletHoleMesh)
        })
    }
    
    draw() {
        this.app.scene.add(this.wall)
    }
}

export { Wall }
