import * as THREE from "https://cdn.skypack.dev/three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import * as dat from "dat.gui";

console.log('OrbitControls',OrbitControls);

const gui = new dat.GUI();
const world = {
  plane: {
    width: 10,
    height: 3,
    widthSegments: 8,
    heightSegments: 5,
  },
};

gui.add(world.plane, "width", 1, 20).onChange(generatePlaneGeometry);
gui.add(world.plane, "height", 1, 20).onChange(generatePlaneGeometry);
gui.add(world.plane, "widthSegments", 1, 50).onChange(generatePlaneGeometry);
gui.add(world.plane, "heightSegments", 1, 50).onChange(generatePlaneGeometry);

function generatePlaneGeometry() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );
  const { array } = planeMesh.geometry.attributes.position;

  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    array[i + 2] = z + Math.random();
    // console.log(array[i]);
  }
}
console.log(gui);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera,renderer.domElement)

camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

const { array } = planeMesh.geometry.attributes.position;

for (let i = 0; i < array.length; i += 3) {
  const x = array[i];
  const y = array[i + 1];
  const z = array[i + 2];
  array[i + 2] = z + Math.random();
  // console.log(array[i]);
}

// Proving lighting to MeshPhongMaterial
// front light
const frontLight = new THREE.DirectionalLight(0xffffff, 1);
frontLight.position.set(0, 0, 1);
scene.add(frontLight);
// back light
const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
