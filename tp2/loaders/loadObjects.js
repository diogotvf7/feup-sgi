import * as THREE from 'three';

export const loadObjects = {
    execute: function(data, materials) {
        const root = data[data.rootid];
        root.name = data.rootid;

        const scene = dfs(data, materials, root, null);
        
        return scene.children;
    }
}

/**
 * Dfs algorithm to parse the scene tree
 * @param {*} data Object with all the objects
 * @param {*} materials Object with all the materials
 * @param {*} node Object with the node to be parsed
 * @param {*} materialref Material reference passed by the parent node (will be used if the node does not have a materialref itself)
 * @returns 
 */
const dfs = (data, materials, node, materialref) => {    
    console.log(`[NODE]: ${node.name}`);
    
    const object = new THREE.Group();
    object.name = node.name;

    let material = null;
    if (node.materialref !== undefined) material = materials[node.materialref.materialId];
    else if (materialref) material = materialref;
    

    for (let key in node.children) {
        const info = node.children[key];
        const child = data[key];
        if (child) {
            child.name = key;
        }

        console.log(`[CHILD]: ${key}`);
        

        switch (info.type) {
            case 'noderef':
                let newNode = dfs(data, materials, child, material);
                object.add(newNode);
                break;
            case 'pointlight':
                const pointlight = buildPointLight(info.enabled, info.color, info.intensity, info.distance, info.decay, info.castshadow, info.position);
                object.add(pointlight);
                
                const lightHelper = buildLightHelper(pointlight);
                object.add(lightHelper);
                break;
            case 'rectangle':
                const rectangle = buildRectangle(info.xy1, info.xy2, material);
                object.add(rectangle);
                break;
            default:
                throw new Error('Unknown object type: ' + node.children[key].type);
        }
    }

    transform(object, node.transforms);

    return object;
}

const transform = (object, transforms) => {
    for (let key in transforms) {
        let transform = transforms[key];
        
        console.log(`[TRANSFORM]: ${key}-${transform.type}`);
        switch (transform.type) {
            case 'translate':
                object.translateX(transform.amount.x);
                object.translateY(transform.amount.y);
                object.translateZ(transform.amount.z);
                break;
            case 'rotate':                
                // object.rotateX(transform.amount.x);
                // object.rotateY(transform.amount.y);
                // object.rotateZ(transform.amount.z);
                break;
            case 'scale':
                object.scale.set(transform.amount.x, transform.amount.y, transform.amount.z);
                break;
        }
    }
}

/**
 * Build a rectangle mesh
 * @param {*} xy1 bottom left corner
 * @param {*} xy2 top right corner
 * @param {*} material Material to be applied to the rectangle
 * @returns the rectangle mesh
 */
const buildRectangle = (xy1, xy2, material) => {
    const width = Math.abs(xy1.x - xy2.x);
    const height = Math.abs(xy1.y - xy2.y);

    const geometry = new THREE.PlaneGeometry(width, height);
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;    
}

/**
 * Build a point light
 * @param {*} enabled 
 * @param {*} color {r, g, b}
 * @param {*} intensity 
 * @param {*} distance 
 * @param {*} decay 
 * @param {*} castshadow 
 * @param {*} position 
 * @returns 
 */
const buildPointLight = (enabled, color, intensity, distance, decay, castshadow, position) => {
    if (!enabled) return null;
    const light = new THREE.PointLight(color, intensity, distance, decay);
    light.castShadow = castshadow;
    light.position.set(position.x, position.y, position.z);
    return light;
}

const buildLightHelper = (light) => {
    return new THREE.PointLightHelper(light);
}