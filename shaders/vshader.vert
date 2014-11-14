//Define complex operations
#define product(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)
#define conjugate(a) vec2(a.x,-a.y)
#define division(a, b) vec2(((a.x*b.x+a.y*b.y)/(b.x*b.x+b.y*b.y)),((a.y*b.x-a.x*b.y)/(b.x*b.x+b.y*b.y)))
//#define sum(a, b) vec2(a.x+b.x, a.y+b.y)

uniform float amplitude;
uniform float transRE;
uniform float transIM;
uniform float scale;

attribute float displacement;

//declare vec2 formado por transRE,transIM

void main(){

  gl_PointSize = 10.0;

  vec2 p = vec2(transRE,transIM);
  vec2 z = vec2(position.x,position.y);

  //vec2 n<u></u>m = sum(z,p);
  vec2 num = z + p;
  vec2 pconj = conjugate(p);
  vec2 den = vec2(1.0,0) + product(pconj,z);
  vec2 transformed = division(num,den);

  //float x = transformed.x * 1000.0;
  //float y = transformed.y * 1000.0;
  //vec2 res = vec2(transformed.x,transformed.y);

  //old working stuff
  //vec3 newPosition = position + vec3(displacement * amplitude);
  //vec3 newPosition = vec3(position.x,position.y,0) + vec3(res,0);
  //vec3 newPosition = (transformation(position,vec2(transRE,transIM)),0);
  vec3 newPosition = vec3(transformed,0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  //This is the most basic vertex shader
  //gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}

//Function transformation
//
//@param in vec2 z original point
//@param in vec2 p transformation
//@return vec2 div new point
vec2 transformation(in vec2 z,in vec2 p){
  vec2 num = z+p;
  vec2 den = vec2(1.0,0) + product(conjugate(p),z);
  vec2 div = division(num,den);
  return div;
}

//glEnable( GL_POINT_SMOOTH );
