import * as THREE from 'three';

export const loadGlobals = {
    execute: function(data) {
        let {fog, ambient, background, skybox} = data

        //https://stackoverflow.com/questions/23330269/how-to-create-multiple-box-and-only-change-the-texture-on-one-side
        let skyboxMaterials = []
        let textureRefs = [skybox.right, skybox.left, skybox.up, skybox.down, skybox.front, skybox.back]

        
        const skyboxGeometry = new THREE.BoxGeometry(
            skybox.size.x, skybox.size.y, skybox.size.z 
        )

        for (let texture of textureRefs){
            let material = new THREE.MeshStandardMaterial({
                map:  new THREE.TextureLoader().load(texture),
                side: THREE.BackSide, 
                emissive: new THREE.Color(skybox.emissive.r, skybox.emissive.g, skybox.emissive.b),
                emissiveIntensity: skybox.intensity
            })
            skyboxMaterials.push(material)
        } 

        let globals = {
            background: new THREE.Color(background.r, background.g, background.b),
            ambient: new THREE.AmbientLight(new THREE.Color(ambient.r, ambient.g, ambient.b)),
            fog : new THREE.Fog(new THREE.Color(fog.color.r, fog.color.g, fog.color.b), fog.near, fog.far),
            skybox: new THREE.Mesh(skyboxGeometry, skyboxMaterials)
        }

        return globals;
    }
}