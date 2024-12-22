import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

let camera, scene, renderer;

init();
render();

function init() {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  camera.position.set(-1.8, 0.6, 2.7);

  scene = new THREE.Scene();

  // Light
  const light = new THREE.AmbientLight('#FFFFFF', 0.55);
  scene.add(light);

  const dirLight = new THREE.DirectionalLight(0x8888ff, 10);
  dirLight.position.set(0, 3, 0);
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0x8888ff, 10);
  pointLight.position.set(3, 0, 0);
  scene.add(pointLight);

  ///////////////////----------------------------------------------

  const loader = new GLTFLoader().setPath('/assets/');

  // Load model 1

  loader.load('back_outside 1.glb', function (gltf) {
    scene.add(gltf.scene);

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 'red',
        });
      }
    });

    console.log(gltf);

    render();
  });

  // Load model 2
  loader.load('front_outside 1.glb', function (gltf) {
    scene.add(gltf.scene);

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 'green',
        });
      }
    });

    console.log(gltf);

    render();
  });

  ///////////////////----------------------------------------------

  /// Renderer and default configs

  renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const container = document.getElementById('three-container');
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render); // use if there is no animation loop
  controls.minDistance = 1;
  controls.maxDistance = 10;
  controls.target.set(0, 0, -0.2);
  controls.update();

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

//

function render() {
  renderer.renderAsync(scene, camera);
}
