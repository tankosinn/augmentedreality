import {GLTFLoader} from "./libs/three.js/examples/jsm/loaders/GLTFLoader.js";
import {VRMLLoader} from "./libs/three.js/examples/jsm/loaders/VRMLLoader.js";
import * as THREE from "./libs/three.js/build/three.module.js";

export const loadGLTF = (path) => {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(path, (gltf) => {
            resolve(gltf);
        });
    });
};


export const loadVRML = (path) => {
    return new Promise((resolve, reject) => {
        const loader = new VRMLLoader();
        loader.load(path, (vrml) => {
            resolve(vrml);
        });
    });
};

export const loadAudio = (path) => {
    return new Promise((resolve, reject) => {
        const loader = new THREE.AudioLoader();
        loader.load(path, (buffer) => {
            resolve(buffer);
        });
    });
};

export const loadVideo = (path) => {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        video.addEventListener('loadeddata', () => {
            video.setAttribute('playsinline', '');
            resolve(video);
        });
        video.src = path;
    });
};

export const loadTexture = (path) => {
    return new Promise((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        loader.load(path, (texture) => {
            resolve(texture);
        });
    });
};

export const loadTextures = (paths) => {
    const loader = new THREE.TextureLoader();
    const promises = [];
    for (let i = 0; i < paths.length; i++) {
        promises.push(new Promise((resolve, reject) => {
            loader.load(paths[i], (texture) => {
                resolve(texture);
            });
        }));
    }
    return Promise.all(promises);
};