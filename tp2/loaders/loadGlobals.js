import * as THREE from 'three';

export const loadGlobals = {
    execute: function(data) {

        let globals = {
            background: new THREE.Color(data.background.r, data.background.g, data.background.b),
            ambient: new THREE.AmbientLight(new THREE.Color(data.ambient.r, data.ambient.g, data.ambient.b))
        }

        return globals;
    }
}