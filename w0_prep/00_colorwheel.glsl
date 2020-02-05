#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

// hsb to rgb function
vec3 hsb2rgb(in vec3 c){
    vec3 rgb=clamp(abs(mod(c.x*6.+vec3(0.,4.,2.),
6.)-3.)-1.,
0.,
1.);
rgb=rgb*rgb*(3.-2.*rgb);
return c.z*mix(vec3(1.),rgb,c.y);
}

void main(){
vec2 st=gl_FragCoord.xy/u_resolution;
vec2 toCenter=vec2(.5,.5)-st;
float angle=atan(toCenter.x,toCenter.y)/TWO_PI;
float radius=length(toCenter)*1.;

vec3 color=vec3(hsb2rgb(vec3(angle,radius,1.)));
gl_FragColor=vec4(color,1.);
}

