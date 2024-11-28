import * as THREE from 'three';


class Triangle extends THREE.BufferGeometry {

    constructor(p1, p2, p3){
        super()
        this.v1 = p1
        this.v2 = p2
        this.v3 = p3
        this.ab = new THREE.Vector3();
        this.cb = new THREE.Vector3();

        this.initBuffers()
    }

    initBuffers(){
        let normals = []
        let vertices = new Float32Array([
            ...this.v1.toArray(),
            ...this.v2.toArray(),
            ...this.v3.toArray()
        ])
        let indices = [0, 1, 2]

        let c = this.v1.distanceTo(this.v2)
        let a = this.v2.distanceTo(this.v3)
        let b = this.v1.distanceTo(this.v3)

        let cos_teta = (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c)
        let sin_teta =  Math.sqrt(1 - Math.pow(cos_teta, 2))

        this.cb.subVectors(this.v3, this.v2)
        this.ab.subVectors(this.v1, this.v2)
        this.cb.cross( this.ab )
        this.cb.normalize()

        let nx = this.cb.x 
        let ny = this.cb.y
        let nz = this.cb.z

        normals.push(nx, ny, nz)
        normals.push(nx, ny, nz)
        normals.push(nx, ny, nz)

        let uvs = [
            0,0,
            c , 0,
            b * cos_teta, b *sin_teta 
        ]

        this.setIndex(indices)
        this.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
        this.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
        this.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))        
    }
}

export {Triangle}