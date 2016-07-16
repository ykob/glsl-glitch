import Glitch from './modules/glitch.js';
import Sphere from './modules/sphere.js';

const canvas = document.getElementById('canvas-webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
const scene = new THREE.Scene();
const sub_scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const clock = new THREE.Clock();

const glitch = new Glitch();
const sphere = new Sphere();

const resizeWindow = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  glitch.render_target.setSize(window.innerWidth, window.innerHeight);
}
const setEvent = () => {
  $(window).on('resize', () => {
    resizeWindow();
  });
}
const initDatGui = () => {
  const gui = new dat.GUI();
  const controller = {
    // radius: gui.add(sphere, 'radius', 0, 1000).name('Sphere Radius')
  };
  // controller.radius.onChange((value) => {
  // });
}
const render = () => {
  const delta = clock.getDelta();
  sphere.render(delta);
  renderer.render(sub_scene, camera, glitch.render_target);
  glitch.render(delta);
  renderer.render(scene, camera);
}
const renderLoop = () => {
  render();
  requestAnimationFrame(renderLoop);
}

const init = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xeeeeee, 1.0);
  camera.position.set(1000, 1000, 1000);
  camera.lookAt(new THREE.Vector3());

  scene.add(glitch.mesh);
  sub_scene.add(sphere.mesh);

  setEvent();
  initDatGui();
  resizeWindow();
  renderLoop();
}
init();
