import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Always need three things

// 1. a Scene
// 2. a Camera
// 3. a Renderer

// 1: a Scene is like a container that holds all of your objects, cameras and lights.
const scene = new THREE.Scene();

// 2: Perspective Camera (Mimic human eye balls).
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 3: Renderer
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);


// Add Object to render
// Geometry = the {x,y,z} points that makeup a shape.
const geometry = new THREE.TorusGeometry(10, 3, 15, 100);

// Add Material
// Material = the wrapping paper fro an object.
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347} );

// Add Mesh
// Mesh = geometry + material 
const torus = new THREE.Mesh(geometry, material);

// Add Mesh to the scene.
scene.add(torus);

// Add lighting
// PointLight is a good beginner light. Like turning on a lightbulb in a room.
const pointLight = new THREE.PointLight(0xffffff);

// Position light.
pointLight.position.set(20, 20, 20);

// Ambient light.
const ambientLight = new THREE.AmbientLight(0xffffff);

// Add light to scene.
scene.add(pointLight,ambientLight);
 
// Helper. Show us the posistion of a pointlight.
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh( geometry, material);

  // Random Star Position
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z);
  scene.add(star);
}

// How Many Stars
Array(200).fill().forEach(addStar);

// Add Background (of space)
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


// Avatar.
const bradTexture = new THREE.TextureLoader().load('bradTexture.png');

const brad = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: bradTexture})
);

scene.add(brad);


// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);


function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


  controls.update();

  renderer.render(scene, camera);
}

// Need to rerender the scene to see newly added Mesh
animate();