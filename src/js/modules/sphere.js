const glslify = require('glslify');

export default class Sphere {
  constructor() {
    this.radius = 200;
    this.uniforms = null;
    this.mesh = this.createMesh();
  }
  createMesh() {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0,
      },
      radius: {
        type: 'f',
        value: this.radius,
      },
    };
    return new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/sphere.vs'),
        fragmentShader: glslify('../../glsl/sphere.fs'),
      })
    );
  }
  render(time) {
    this.uniforms.time.value += time * this.time;
  }
}
