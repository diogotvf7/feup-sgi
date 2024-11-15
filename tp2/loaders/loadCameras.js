import * as THREE from 'three';

export const loadCameras = {
    execute: function(data){
        let initialCamera = data.initial
        let cameras = []

        const createPerspectiveCamera = (cameraData) => {
            const camera = new THREE.PerspectiveCamera(
                cameraData.angle,
                window.innerWidth / window.innerHeight,
                cameraData.near,
                cameraData.far
            );
            setCameraProperties(camera, cameraData);
            return camera;
        };

        const createOrthographicCamera = (cameraData) => {
            const camera = new THREE.OrthographicCamera(
                cameraData.left,
                cameraData.right,
                cameraData.top,
                cameraData.bottom,
                cameraData.near,
                cameraData.far
            );
            setCameraProperties(camera, cameraData);
            return camera;
        };

        const setCameraProperties = (camera, cameraData) => {
            camera.position.set(
                cameraData.location.x,
                cameraData.location.y,
                cameraData.location.z
            );
            camera.lookAt(
                new THREE.Vector3(
                    cameraData.target.x,
                    cameraData.target.y,
                    cameraData.target.z
                )
            );
        }

        for(let key in data){
            if (key == 'initial') continue

            let cameraData = data[key]
            let camera = cameraData.type === 'perspective' 
                ? createPerspectiveCamera(cameraData) 
                : createOrthographicCamera(cameraData);

            cameras[key] = camera
        }

        return [initialCamera, cameras]
    }
}