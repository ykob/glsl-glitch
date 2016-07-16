varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
