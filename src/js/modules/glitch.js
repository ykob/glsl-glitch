const glslify = require('glslify');

export default class Glitch {
  constructor() {
    this.uniforms = null;
    this.mesh = this.createMesh();
    this.render_target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
  }
  createMesh() {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0,
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      render_target: {
        type: 't',
        value: null,
      },
    };
    return new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/glitch.vs'),
        fragmentShader: glslify('../../glsl/glitch.fs'),
        transparent: true,
      })
    );
  }
  render(time) {
    this.uniforms.time.value += time;
    this.uniforms.render_target.value = this.render_target.texture;
  }
  resize() {
    this.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    this.render_target.setSize(window.innerWidth, window.innerHeight);
  }
}
