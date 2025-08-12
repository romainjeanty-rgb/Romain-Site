import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const textureLoader = new THREE.TextureLoader();
let colormapTexture = null;
textureLoader.load('/public/colormap.png', function (texture) {
  colormapTexture = texture;
});

let scene, camera, renderer, loader;



const c1 = document.getElementById('fish')
const rect = c1.getBoundingClientRect();

console.log( rect.innerWidth)
console.log( rect.innerHeight)

scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Light sky blue background

camera = new THREE.PerspectiveCamera( 75, 800 / 600, 0.1, 1000 );


renderer = new THREE.WebGLRenderer({
  canvas: c1,
  antialias: true 
});
renderer.setSize( 800, 600 );
renderer.setAnimationLoop( animate );
// No need to append renderer.domElement, canvas is already in HTML
loader = new GLTFLoader();


let model;
let direction = 1;
let speed = 0.02;
let bounds = 3;

loader.load( '/public/models/character-male-a.glb', function ( gltf ) {
  model = gltf.scene;
  model.position.set(0, 1, -1);
  // Apply the texture to all meshes in the model
  if (colormapTexture) {
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.map = colormapTexture;
        child.material.needsUpdate = true;
      }
    });
  }
  scene.add( model );
}, undefined, function ( error ) {
  console.error( error );
} );


function animate() {
  // Move the model left and right
  renderer.render( scene, camera );
}