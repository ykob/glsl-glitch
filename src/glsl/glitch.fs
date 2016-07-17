uniform float time;
uniform vec2 resolution;
uniform sampler2D render_target;

varying vec3 vPosition;
varying vec2 vUv;

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);

void main() {
  vec4 texture = texture2D(render_target, vUv);
  float wave_noise = pow(smoothstep(0.4, 0.6,
    cnoise3(vec3(
      0.0,
      vPosition.y * 3.0 + time * 2.0,
      0.0
    ))
  ), 2.0);
  float wave_noise_r = texture2D(render_target, vUv + vec2(gl_FragCoord.x * wave_noise, 0.0) / resolution * 0.2).r;
  float wave_noise_g = texture2D(render_target, vUv + vec2(gl_FragCoord.x * wave_noise, 0.0) / resolution * 0.4).g;
  float wave_noise_b = texture2D(render_target, vUv + vec2(gl_FragCoord.x * wave_noise, 0.0) / resolution * 0.6).b;
  float noise_x = cnoise3(vec3(
      vPosition.x + time * 100.0,
      0.0,
      time
    ));
  float noise_y = cnoise3(vec3(
      0.0,
      vPosition.y + time * 100.0,
      0.0
    ));
  gl_FragColor = vec4(
    vec3(
      wave_noise_r,
      wave_noise_g,
      wave_noise_b
      ) - floor(smoothstep(0.4, 0.40001, noise_x) * smoothstep(0.4, 0.4001, noise_y)), texture.a);
}
