var camera, scene, renderer;
var controls;
var block;
var mouse = new THREE.Vector2(-2, -2);

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

  // block
  var block1 = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({color: 0x0080ff, overdraw: 0.5})
  );
  block1.position.set(0, 50, 0);
  var block2 = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({color: 0x0080ff, overdraw: 0.5})
  );
  block2.position.set(0, 0, 0);
  var block3 = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({color: 0x0080ff, overdraw: 0.5})
  );
  block3.position.set(50, 0, 0);
  var block4 = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({color: 0x0080ff, overdraw: 0.5})
  );
  block4.position.set(50, -50, 0);

  block_group = new THREE.Group();
  block_group.position.y = 500;
  block_group.add(block1);
  block_group.add(block2);
  block_group.add(block3);
  block_group.add(block4);
  scene.add(block_group);

  var block5 = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({color: 0x0080ff, overdraw: 0.5})
  );
  block5.position.set(150, 150, 0);
  scene.add(block5);

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

  document.addEventListener('click', onClick);

  // helper
  var gridHelper = new THREE.GridHelper(200, 50);
  var axisHlper = new THREE.AxisHelper(1000);
  var lightHelper = new THREE.DirectionalLightHelper(light, 20);
  scene.add(gridHelper);
  scene.add(axisHlper);
  scene.add(lightHelper);
}

function onClick(e) {
  // 1. マウス座標の取得
  var rect = e.target.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;

  // 2. WebGLの座標系に変換
  mouse.x = (e.clientX - rect.left) / window.innerWidth * 2 - 1;
  mouse.y = -(e.clientY - rect.top) / window.innerHeight * 2 + 1;

  var raycaster = new THREE.Raycaster();
  var objs;

  // 3. マウスから3D空間に光線を射出
  raycaster.setFromCamera(mouse, camera);

  // 4. 光線にあたった物体を取得、操作
  objs = raycaster.intersectObjects(block_group.children);
  // objs = raycaster.intersectObjects(scene.children);
  if (objs.length > 0) {
    objs[0].object.material.emissive = new THREE.Color(0x999999);
  }
}

function render() {
  requestAnimationFrame(render);
  controls.update();

  if (block_group.position.y > 0) {
    block_group.position.y -= 10;
  }
  renderer.render(scene, camera);
}