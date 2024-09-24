import * as THREE from 'three';

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
  