import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export default class Planet {
  constructor(radius, color, distance, speed) {
    this.geometry = new THREE.SphereGeometry(radius, 32, 32);
    this.material = new THREE.MeshBasicMaterial({ color: color, wireframe: true });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.distance = distance;
    this.speed = speed;
    this.angle = Math.random() * Math.PI * 2; // Ângulo inicial aleatório para evitar que todos comecem no mesmo lugar

    // Definindo a posição inicial do planeta
    this.mesh.position.x = Math.cos(this.angle) * this.distance;
    this.mesh.position.z = Math.sin(this.angle) * this.distance;
  }

  getPlanet() {
    return this.mesh;
  }

  rotate() {
    // Atualiza o ângulo para a órbita
    this.angle += this.speed;
    
    this.mesh.position.x = Math.cos(this.angle) * this.distance;
    this.mesh.position.z = Math.sin(this.angle) * this.distance;
  }
}

// Função para popular os planetas
export function getPlanets() {
  return [
    new Planet(0.2, 0xff0000, 2, 0.01),  // Planeta pequeno com órbita pequena
    new Planet(0.3, 0x00ff00, 3, 0.02),  // Planeta médio com órbita maior
    new Planet(0.4, 0x0000ff, 4, 0.03),  // Planeta grande com órbita maior
  ];
}



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
