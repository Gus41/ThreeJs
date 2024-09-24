import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene();

// initialize the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setPixelRatio(window.devicePixelRatio);

// controls
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
control.autoRotate = true; // enable auto-rotation

// Main sphere (central)
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Smaller sphere (satellite)
const smallSphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const smallSphereMaterial = new THREE.MeshBasicMaterial({ color: 'gray', wireframe: true });
const smallSphere = new THREE.Mesh(smallSphereGeometry, smallSphereMaterial);
scene.add(smallSphere);

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
  // Update orbital position
  angle += speed;
  smallSphere.position.x = Math.cos(angle) * orbitRadius;
  smallSphere.position.z = Math.sin(angle) * orbitRadius;

  // Render the scene and update controls
  renderer.render(scene, camera);
  control.update();
  
  window.requestAnimationFrame(renderLoop);
};
renderLoop();
