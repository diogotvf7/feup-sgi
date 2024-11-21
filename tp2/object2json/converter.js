import * as THREE from 'three';

const matrix_to_transformations = (object) => {
    const matrix = new THREE.Matrix4();
    matrix.fromArray(object.matrix);

    const position = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    matrix.decompose(position, rotation, scale);

    console.log("Position:", position);
    console.log("Rotation:", new THREE.Euler().setFromQuaternion(rotation));
    console.log("Scale:", scale);
}

const convert = (object) => {
    const json = {}
    

}

export { matrix_to_transformations };