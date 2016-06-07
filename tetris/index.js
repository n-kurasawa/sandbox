var camera, scene, renderer;
var controls;
var block;

init();
render();

function init() {
  var container = document.createElement('div');
  document.body.appendChild(container);

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(400, 800, 1300);
  camera.lookAt(scene.position);

  // mesh
  var mesh = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({color: 0x00ff80, overdraw: 0.5})
  );
  mesh.position.set(0, 0, 0);
  scene.add(mesh);

  // block
  block1 = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({color: 0x0080ff, overdraw: 0.5})
  );
  block1.position.set(0, 50, 0);
  block2 = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({color: 0x0080ff, overdraw: 0.5})
  );
  block2.position.set(0, 0, 0);
  block3 = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({color: 0x0080ff, overdraw: 0.5})
  );
  block3.position.set(50, 0, 0);
  block4 = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({color: 0x0080ff, overdraw: 0.5})
  );
  block4.position.set(50, -50, 0);

  block = new THREE.Group();
  block.position.y = 1000;
  block.add(block1);
  block.add(block2);
  block.add(block3);
  block.add(block4);
  scene.add(block);

  // light
  // - 平行光
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 100, 30);
  scene.add(light);
  // - 自然光
  var ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xefefef);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // controls
  controls = new THREE.OrbitControls(camera);

  // helper
  var gridHelper = new THREE.GridHelper(200, 50);
  var axisHlper = new THREE.AxisHelper(1000);
  var lightHelper = new THREE.DirectionalLightHelper(light, 20);
  scene.add(gridHelper);
  scene.add(axisHlper);
  scene.add(lightHelper);
}

function render() {
  requestAnimationFrame(render);
  controls.update();

  // block.position.y -= 10;
  if (block.position.y > 0) {
    block.position.y -= 10;
  }

  renderer.render(scene, camera);
}