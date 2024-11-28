import * as THREE from 'three';
import { MyNurbsBuilder } from "../helpers/MyNurbsBuilder.js";
import { Triangle } from '../objects/Triangle.js';


export const loadObjects = {
    execute: function(data, materials) {
        const root = data[data.rootid];
        root.name = data.rootid;

        const scene = dfs(data, materials, root, null, false, true);
        
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
const dfs = (data, materials, node, materialref=null, isLod=false, debug=false, depth=1) => {        
    if (debug) console.log(`[${isLod ? 'L' : 'G'}]`, " ".repeat(depth*2), node.name);
    
    let material = null;
    if (node.materialref !== undefined) material = materials[node.materialref.materialId];
    else if (materialref) material = materialref;
    
    let object = null
    if (isLod) {
        object = new THREE.LOD()
        object.name = node.name;

        node.lodNodes.forEach(lodNode => {
            const child = data[lodNode.nodeId];
            child.name = lodNode.nodeId;

            const newNode = dfs(data, materials, child, material, false, debug, depth+1);
            object.addLevel(newNode, lodNode.mindist)
        })
    } else {
        object = new THREE.Group()
        object.name = node.name;

        for (let key in node.children) {                    
            switch (key) {
                case "nodesList":
                    const nodesList = node.children[key];
                    nodesList.forEach(key => {
                        const child = data[key];
                        
                        child.name = key;
    
                        const newNode = dfs(data, materials, child, material, false, debug, depth+1);
                        object.add(newNode);
                    });
                    break;
                case "lodsList":
                    const lodsList = node.children[key];
                    lodsList.forEach(key => {
                        const child = data[key];
                        child.name = key;

                        const newNode = dfs(data, materials, child, material, true, debug, depth+1);
                        object.add(newNode);
                    });
                    break;
                default:
                    const info = node.children[key];
    
                    switch (info.type) {
                        case 'pointlight':
                            if(info.enabled !== false){
                                const pointlight = buildPointLight(info.color, info.intensity, info.distance, info.decay, info.castshadow, info.position);
                                object.add(pointlight);                            
                            }
                            break;
                        case 'spotlight':
                            if(info.enabled !== false){
                                const spotlight = buildSpotLight(info.color, info.intensity, info.distance, info.angle, info.decay, info.penumbra, info.position, info.target, info.castshadow, info.shadowfar, info.shadowmapsize)
                                object.add(spotlight)
                            }
                            break
                        case 'directionallight':
                            if (info.enabled !== false) {
                                const directionallight = buildDirectionalLight()
                                object.add(directionallight)
                            }
                            break
                        case 'rectangle':
                            const rectangle = buildRectangle(info, material);
                            object.add(rectangle);
                            break;
                        case 'triangle':
                            const triangle = buildTriangle(info, material);
                            object.add(triangle);
                            break;
                        case 'box':
                            const box = buildBox(info, material);
                            object.add(box);
                            break;
                        case 'cylinder':
                            const cylinder = buildCylinder(info, material);
                            object.add(cylinder);
                            break;
                        case 'sphere':
                            const sphere = buildSphere(info, material);
                            object.add(sphere);
                            break;
                        case 'cone':
                            const cone = buildCone(info, material)
                            object.add(cone)
                            break
                        case 'nurbs':
                            const nurb = buildNurbs(info, material)
                            object.add(nurb)
                            break
                        case 'polygon':
                            const polygon = buildPolygon(info)
                            object.add(polygon)
                            break
                        default:
                            throw new Error('Unknown object type: ' + node.children[key].type);
                    }        
    
                    break;
            }
        }    
    }

    transform(object, node.transforms);

    return object;
}


/**
 * Build a rectangle mesh
 * @param {*} xy1 bottom left corner
 * @param {*} xy2 top right corner
 * @param {*} material Material to be applied to the rectangle
 * @returns the rectangle mesh
 */
const buildRectangle = ({ xy1, xy2, parts_x = 1, parts_y = 1 }, material) => {
    const width = Math.abs(xy1.x - xy2.x);
    const height = Math.abs(xy1.y - xy2.y);

    if (material.material.map && material.material.map.repeat) {
        const repeatX = width / material.texlength_s;
        const repeatY = height / material.texlength_t;
        material.material.map.repeat.set(repeatX, repeatY);
    }

    const geometry = new THREE.PlaneGeometry(width, height, parts_x, parts_y);
    const mesh = new THREE.Mesh(geometry, material.material);
    return mesh;    
};


const buildTriangle = ({ xyz1, xyz2, xyz3 }, material) => {
    const vertices = [
        new THREE.Vector3(xyz1.x, xyz1.y, xyz1.z),
        new THREE.Vector3(xyz2.x, xyz2.y, xyz2.z),
        new THREE.Vector3(xyz3.x, xyz3.y, xyz3.z),
    ];

    const width = Math.abs(
        Math.max(vertices[0].x, vertices[1].x, vertices[2].x) - 
        Math.min(vertices[0].x, vertices[1].x, vertices[2].x)
    );

    const edge = new THREE.Vector3().subVectors(vertices[1], vertices[0]); 
    const pointToEdge = new THREE.Vector3().subVectors(vertices[2], vertices[0]); 
    const edgeLength = edge.length();
    const projectionLength = edge.dot(pointToEdge) / edgeLength; 
    const projection = edge.clone().setLength(projectionLength); 
    const perpendicular = pointToEdge.sub(projection); 
    const height = perpendicular.length();

    if (material.material.map && material.material.map.repeat) {
        const repeatX = width / material.texlength_s;
        const repeatY = height / material.texlength_t;
        material.material.map.repeat.set(repeatX, repeatY);
    }

    const triangle = new Triangle(...vertices)
    console.log(material.material.map)
    return new THREE.Mesh(triangle, material.material);
};


const buildBox = ({xyz1, xyz2, parts_x=1, parts_y=1, parts_z=1}, material) => {
    const width = Math.abs(xyz1.x - xyz2.x);
    const height = Math.abs(xyz1.y - xyz2.y);
    const depth = Math.abs(xyz1.z - xyz2.z);

    const geometry = new THREE.BoxGeometry(width, height, depth, parts_x, parts_y, parts_z);
    const mesh = new THREE.Mesh(geometry, material.material);
    return mesh;
}

const buildCylinder = ({base, top, height, slices = 32, stacks = 1, capsclose=false, thetastart=0, thetalength=360}, material) => {
    const geometry = new THREE.CylinderGeometry(base, top, height, slices, stacks, !capsclose, degreesToRadians(thetastart), degreesToRadians(thetalength));
    const mesh = new THREE.Mesh(geometry, material.material);
    return mesh;
}

const buildSphere = ({radius, slices=32, stacks=16, thetastart=0, thetalength=180, phistart=0, philength=360}, material) => {
    const geometry = new THREE.SphereGeometry(radius, slices, stacks, phistart, degreesToRadians(philength), thetastart, degreesToRadians(thetalength))
    const mesh = new THREE.Mesh(geometry, material.material);
    return mesh;
}

const buildCone = ({radius, height, radialSegments = 32, heightSegments = 1, thetastart = 0, thetalength = 2*Math.PI}, material) => {
    const geometry = new THREE.ConeGeometry(radius, height, radialSegments, heightSegments, thetastart, thetalength)
    const mesh = new THREE.Mesh(geometry, material.material)
    return mesh
}

const buildPolygon = ({radius, stacks, slices, color_c, color_p}) => {
    const geometry = new THREE.BufferGeometry();

    const vertices = [0, 0, 0]
    const indices = [] 
    const colors = [color_c.r, color_c.g, color_c.b]
    const normals = []

    const centerColor = new THREE.Color(color_c.r, color_c.g, color_c.b)
    const peripheralColor = new THREE.Color(color_p.r, color_p.g, color_p.b)

    for (let i = 0; i < stacks; i++) {
        const angle = Math.PI * 2 / slices
        const sliceRadius = radius * (i + 1) / stacks

        for (let j = 0; j < slices; j++) {
            const sliceAngle = angle * j + Math.PI / 2
            const color = new THREE.Color().lerpColors(centerColor, peripheralColor, (i + 1) / stacks)
            
            vertices.push(
                Math.cos(sliceAngle) * sliceRadius,
                Math.sin(sliceAngle) * sliceRadius,
                0
            )
            colors.push(color.r, color.g, color.b)            

            normals.push([0,0,1])

            if (i > 0) {
                const a = i * slices + j + 1
                const b = i * slices + (j + 1) % slices + 1
                const c = a - slices
                const d = b - slices

                indices.push(a, b, c, b, d, c)
            } else {
                const a = j + 1
                const b = (j + 1) % slices + 1
                const c = 0

                indices.push(a, b, c)
            }
        }
    }        
    
    geometry.setIndex( indices );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ) );
    geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array(colors), 3 ) );

    const material = new THREE.MeshBasicMaterial( { vertexColors: true } );
    let mesh = new THREE.Mesh( geometry, material );
    return mesh
}


const buildNurbs = ({ degree_u, degree_v, parts_u, parts_v, controlPoints }, material) => {
    let controlPointsNormalized = [];
    for (let i = 0; i <= degree_u; i++) {
      let points = [];
      let startIndex = i * (degree_v + 1);

      for (let j = 0; j <= degree_v; j++) {
        let point = controlPoints[startIndex + j];
        points.push([point.x, point.y, point.z, 1]);
      }
      controlPointsNormalized.push(points);
    }

    let builder = new MyNurbsBuilder()
  
    let surfaceData = builder.build(
      controlPointsNormalized,
      degree_u,
      degree_v,
      parts_u,
      parts_v,
      material
    );
  
    let mesh = new THREE.Mesh(surfaceData, material.material)
    return mesh
};


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
const buildPointLight = (color, intensity, distance, decay, castshadow, position) => {
    const light = new THREE.PointLight(color, intensity, distance, decay);
    light.castShadow = castshadow;
    light.position.set(position.x, position.y, position.z);
    return light;
}

const buildSpotLight = (color, intensity = 1, distance = 10, angle, decay = 2, penumbra = 1, position, target, castshadow = false, shadowfar = 500, shadowmapsize = 512) => {
    const light = new THREE.SpotLight(color, intensity, distance, degreesToRadians(angle), penumbra, decay)
    light.castShadow = castshadow
    light.position.set(position.x, position.y, position.z)
    light.target.position.set(target.x, target.y, target.z)
    light.shadowfar = shadowfar
    light.shadowmapsize = shadowmapsize

    return light
}

const buildDirectionalLight = (color, intensity = 1, position, castshadow = false, shadowleft = -5, shadowright = 5, shadowbottom = -5, shadowtop = 5, shadowfar = 500.0, shadowmapsize = 512) => {
    const light = new THREE.DirectionalLight(color, intensity)
    light.castShadow = castshadow
    light.position.set(position.x, position.y, position.z)
    light.shadowfar = shadowfar
    light.shadowmapsize = shadowmapsize
    light.shadow.camera.left = shadowleft
    light.shadow.camera.right = shadowright
    light.shadow.camera.top = shadowtop
    light.shadow.camera.bottom = shadowbottom
    return light
}


const buildLightHelper = (light) => {
    return new THREE.PointLightHelper(light);
}

const buildSpotLightHelper = (light) => {
    return new THREE.SpotLightHelper(light);
}

const buildDirectionalLightHelper = (light) => {
    return new THREE.DirectionalLightHelper(light)
}

const transform = (object, transforms) => {
    for (let key in transforms) {
        let transform = transforms[key];
        
        switch (transform.type) {
            case 'translate':
                object.translateX(transform.amount.x);
                object.translateY(transform.amount.y);
                object.translateZ(transform.amount.z);
                break;
            case 'rotate':
                object.rotation.set(degreesToRadians(transform.amount.x),
                                    degreesToRadians(transform.amount.y),
                                    degreesToRadians(transform.amount.z))
                break;
            case 'scale':
                object.scale.set(transform.amount.x, transform.amount.y, transform.amount.z);
                break;
        }
    }
}

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);