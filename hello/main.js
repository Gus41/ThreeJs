import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getPlanets } from '../utils/planet';

const PLANETS = getPlanets()

// initialize the scene
const scene = new THREE.Scene();

// initialize the camera
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 30);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limita o valor para 2, evitando sobrecarga em dispositivos com alta densidade de pixels

// controls
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
control.autoRotate = true; // enable auto-rotation

// Main sphere (central)
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);


for(let i = 0 ; i < PLANETS.length ; i++){
  scene.add(PLANETS[i].getPlanet())
}


// Orbital radius and speed
let orbitRadius = 2.5;
let angle = 0;
let speed = 0.01; // Speed of orbit

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

renderer.setSize(window.innerWidth, window.innerHeight);

const renderLoop = () => {

  for(let i = 0 ; i < PLANETS.length ; i++){
    PLANETS[i].rotate()
  }
  // Render the scene and update controls
  renderer.render(scene, camera);
  control.update();
  
  window.requestAnimationFrame(renderLoop);
};
renderLoop();
