import * as THREE from 'three';

export const loadMaterials = {
    execute: function(data, textures){
        let materials = new Map()

        for (let key in data){
            let material = data[key]

            //TODO: Dont know what do with this
            let texlength_s = material.texlength_s ? material.texlength_s : 1 
            let texlength_t = material.texlength_t ? material.texlength_t : 1   

            //Is it MeshPhong ? 
            materials.set(material, new THREE.MeshPhongMaterial({ 
                color: new THREE.Color(material.color.r, material.color.g, material.color.b), //color - mandatory
                specular: new THREE.Color(material.specular.r, material.specular.g, material.specular.b), //color - mandatory 
                emissive: new THREE.Color(material.emissive.r, material.emissive.g, material.emissive.b), //color - mandatory
                shininess: material.shininess, //float - mandatory
                side: material.twosided ? THREE.DoubleSide : THREE.FrontSide, //default false -> FrontSide - optional
                transparent: material.transparent, //boolean - mandatory
                opacity: material.opacity, //float - mandatory
                wireframe: material.wireframe ? material.wireframe : false, //Boolean - optional
                //TODO: Not sure here either
                flatShading: material.shading === 'flat', 
                bumpScale : material.bumpscale ? material.bumpscale : 1, //Float - optional
                bumpMap : material.bumpref ? new THREE.TextureLoader().load(material.bumpref) : null, //Object - optional
                map : material.textureref ? textures[material.textureref] : null, //Object - optional
            })
        )
        }
        return materials
    }
}