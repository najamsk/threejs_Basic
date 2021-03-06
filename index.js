import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js";

let renderer,
  camera,
  canvas,
  controls,
  scene,
  width = window.innerWidth,
  height = window.innerHeight;

init();
animate();
render();

function addShape() {
  let geometry = new THREE.BoxGeometry(15, 15, 15),
    material = new THREE.MeshNormalMaterial({ color: 0xc2ff14 });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -100;
  scene.add(mesh);

  const geometry2 = new THREE.SphereGeometry(50, 16, 16);
  const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const sphereMaterial = new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });
  const sphere = new THREE.Mesh(geometry2, sphereMaterial);
  sphere.position.z = -100;
  sphere.position.x = -100;

  scene.add(sphere);
}

function init() {
  //RENDERER
  canvas = document.getElementById("canvas");
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });
  renderer.setClearColor(0x111111);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  //CAMERA
  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.z = 100;

  //CONTROLS
  controls = new OrbitControls(camera, canvas);
  controls.addEventListener("change", render);

  //SCENE
  scene = new THREE.Scene();

  //LIGHTS
  const light1 = new THREE.AmbientLight(0xffffff, 0.5),
    light2 = new THREE.DirectionalLight(0xffffff);

  light2.position.set(1, 1, 1);

  scene.add(light1);
  scene.add(light2);

  //adding shapes
  addShape();

  //window resize
  window.addEventListener("resize", onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);
  //calling render again and again which will render on new position giving us animation
  // render();

  //controls updating in animation loop
  controls.update();
}

function render() {
  //Moving camera on z-axis: Click oncontrols also making animation. since controls are updating
  // camera.position.z -= 0.4;
  // if (camera.position.z < 18) {
  //     camera.position.z = 100;
  // }

  console.log("scene =z ", scene.position.z);

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width / height);
  controls.handleResize();
}
