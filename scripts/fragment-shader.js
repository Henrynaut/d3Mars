precision mediump float;

uniform sampler2D u_image;
uniform vec2 u_translate;  /*  width/2, height/2 */
uniform float u_scale;  /* in pixels ! */
uniform vec3 u_rotate;  /* rotation in degrees ! */

const float c_pi = 3.14159265358979323846264;
const float c_halfPi = c_pi * 0.5;
const float c_twoPi = c_pi * 2.0;

// Inclination of the equator on Mars = 25.19°  (earth= 23.44)
const float declination = 25.19  / 90.0 * c_halfPi;

float phi0 = -u_rotate.y / 90.0 * c_halfPi;

float cosphi0 = cos(phi0);
float sinphi0 = sin(phi0);

void main(void) {
  float x = (gl_FragCoord.x - u_translate.x) / u_scale;
  float y = (u_translate.y - gl_FragCoord.y) / u_scale;

  // inverse orthographic projection
  float rho = sqrt(x * x + y * y);

  // color if the point (px, py) does not exist in the texture
  if (rho >= 1.0) {
      gl_FragColor = texture2D(u_image, vec2(0.0, 0.0));
      gl_FragColor[0] = 0.1*(rho-1.0+0.1);
      gl_FragColor[1] = 0.06*(rho-1.0+0.1);
      gl_FragColor[2] = 0.2*(rho-1.0+0.1);
  }
  
  
  else {


  float c = asin(rho);
  float sinc = sin(c);
  float cosc = cos(c);
  float lambda = atan(x * sinc, rho * cosc);
  float phi = asin(y * sinc / rho);

  // inverse rotation
  float cosphi = cos(phi);
  float x0 = cos(lambda) * cosphi;
  float y0 = sin(lambda) * cosphi;
  float cosgamma = cos(u_rotate.z / 90.0 * c_halfPi);
  float singamma = sin(u_rotate.z / 90.0 * c_halfPi);
  float x1 = x0 * cosgamma - y0 * singamma;
  float y1 = y0 * cosgamma + x0 * singamma;
  float z1 = y * sinc / rho;
  lambda = atan(y1, x1 * cosphi0 + z1 * sinphi0) - u_rotate.x / 90.0 * c_halfPi;
  phi = asin(z1 * cosphi0 - x1 * sinphi0);
  
  // pixels
  float px = (lambda + c_pi) / c_twoPi;
  float py = (phi + c_halfPi) / c_pi;
  
  gl_FragColor = texture2D(u_image, vec2(px, py));
  
  // terminator ?? see https://github.com/joergdietrich/Leaflet.Terminator/blob/master/L.Terminator.js
  // float sinh = sin(lambda)*sin(declination) + cos(lambda)*cos(declination)*cos(1.0);
  // float intensity = (sinh > 0.0) ? 1.0 + 0.1*sinh : 0.2 + 0.8 * exp(6.0*sinh);
  
  float intensity = 1.1; // boost the pixel by some factor
    gl_FragColor[0] = intensity * gl_FragColor[0] * (1.3 - 0.3 * sqrt(gl_FragColor[0]));
    gl_FragColor[1] = intensity * gl_FragColor[1];
    gl_FragColor[2] = intensity * gl_FragColor[2];

  }
}
