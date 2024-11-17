import * as THREE from 'three';

export const loadFog = {
    execute: function(data) {
        return new THREE.Fog(new THREE.Color(data.color.r, data.color.g, data.color.b), data.near, data.far)
    }
}