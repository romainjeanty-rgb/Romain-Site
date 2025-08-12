import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


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
document.body.appendChild( renderer.domElement );
loader = new GLTFLoader();


let model;
let direction = 1;
let speed = 0.02;
let bounds = 3;

loader.load( '/public/models/character-male-a.glb', function ( gltf ) {
  model = gltf.scene;
  model.position.set(0, 0, 0);
  scene.add( model );
}, undefined, function ( error ) {
  console.error( error );
} );


function animate() {
  // Move the model left and right
  if (model) {
    model.position.x += speed * direction;
    if (model.position.x > bounds || model.position.x < -bounds) {
      direction *= -1;
      model.rotation.y += Math.PI; // Turn around
    }
  }
  renderer.render( scene, camera );
}