uniform float time;
uniform sampler2D render_target;

varying vec3 vPosition;
varying vec2 vUv;

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);

void main() {
  vec4 texture = texture2D(render_target, vUv);
  float noise_x = cnoise3(vec3(
      vPosition.x,
      0.0,
      time * 20.0
    ));
  float noise_y = cnoise3(vec3(
      0.0,
      vPosition.y * 2.0,
      time * 20.0
    ));
  gl_FragColor = vec4(texture.xyz - floor(smoothstep(0.6, 0.60001, noise_x)) * floor(smoothstep(0.55, 0.55001, noise_y)), texture.a);
}
