import * as THREE from 'three';

export const loadTextures = {
    execute: function(data) {
        let textures = new Map()

        for (let key in data) {
            //TODO: Add mipmap
            let texture = new THREE.TextureLoader().load(data[key].filepath)
            textures.set(key, texture)
        }

        return textures
    }
}