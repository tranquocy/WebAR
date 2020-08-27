var scene, camera, renderer;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  scene.background = new THREE.Color(0xefefef);

  // Camera

  camera.position.set(10, 20, 10);

  // Lighting

  var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(-12, 10, -8);
  scene.add(directionalLight);

  var light = new THREE.PointLight(0xffffff, 1.5, 0, 2);
  light.position.set(0, 8, 0.5);
  scene.add(light);

  // Render

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('model1').appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  // Resize to the size of the screen
  window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  var chair;
  var chairLoader = new THREE.GLTFLoader();
  chairLoader.load('model/chair/scene.gltf', function (gltf) {
    chair = gltf.scene;
    scene.add(chair);
  });

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  var size = 3;
  var divisions = 10;

  var gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);

  function animate() {
    requestAnimationFrame(animate);

    chair.position.y = 0;

    renderer.render(scene, camera);
  }

  animate();
}

init();
