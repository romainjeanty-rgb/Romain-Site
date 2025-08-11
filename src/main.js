import * as THREE from 'three';
let scene, camera, renderer, mesh;


const c1 = document.getElementById('fish')
const rect = c1.getBoundingClientRect();

console.log( rect.innerWidth)
console.log( rect.innerHeight)

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 75, 800 / 600, 0.1, 1000 );

renderer = new THREE.WebGLRenderer({
  canvas: c1,
  antialias: true 
});
renderer.setSize( 800, 600 );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x01ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {

	cube.rotation.x += 0.08;
	cube.rotation.y += 0.08;

	renderer.render( scene, camera );

}