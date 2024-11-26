import * as THREE from 'three';

export const loadMaterials = {
    execute: function(data, textures) {
        let materials = {}

        for (let key in data) {
            let material_data = data[key] 

            let material = new THREE.MeshPhongMaterial({
                color: new THREE.Color(material_data.color.r, material_data.color.g, material_data.color.b), //color - mandatory
                emissive: new THREE.Color(material_data.emissive.r, material_data.emissive.g, material_data.emissive.b), //color - mandatory
                specular: new THREE.Color(material_data.specular.r, material_data.specular.g, material_data.specular.b), //color - mandatory 
                shininess: material_data.shininess, //float - mandatory
                side: material_data.twosided ? THREE.DoubleSide : THREE.FrontSide, //default false -> FrontSide - optional
                transparent: material_data.transparent, //boolean - mandatory
                opacity: material_data.opacity, //float - mandatory
                wireframe: material_data.wireframe ? material_data.wireframe : false, //Boolean - optional
                flatShading: material_data.shading === 'flat', 
            })

            if (material_data.textureref) {
                let texlength_s = material_data.texlength_s ? material_data.texlength_s : 1 
                let texlength_t = material_data.texlength_t ? material_data.texlength_t : 1   
                
                let texture = textures[material_data.textureref]                
                material.map = texture  

                //Do we generate mipmaps for this automatically ? 
                if (material_data.bumpref){
                    material.bumpScale = material_data.bumpscale ? material_data.bumpscale : 1
                    material.bumpMap =  textures[material_data.bumpref]
                    texture.wrapS = texlength_s
                    texture.wrapT = texlength_t
                }
                if(material_data.specularref){
                    let texture_ = textures[material_data.specularref]
                    material.specularMap = textures[material_data.specularref]
                    texture.wrapS = texlength_s
                    texture.wrapT = texlength_t
                }

                if (texlength_s != 1){
                    materials[key].map.repeat.set(texlength_s, texlength_t)
                    materials[key].map.wrapS = THREE.RepeatWrapping
                    materials[key].map.wrapT = THREE.RepeatWrapping
                }


            }
            materials[key] = material
        }
        
        return materials
    }
}