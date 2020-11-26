import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'https://threejsfundamentals.org/3rdparty/dat.gui.module.js';


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
        let geometry = new THREE.BoxGeometry(50, 50, 50),
          material = new THREE.MeshNormalMaterial({
            //color: 0x2299ff,
          });
        let mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
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


        addShape();

        //window resize
        window.addEventListener("resize", onWindowResize, false);
      }

      function animate() {
        requestAnimationFrame(animate);
        controls.update();
      }

      function render() {
        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width / height);
        controls.handleResize();
      }