#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_time;
uniform vec2 u_mouse;

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    st=fract(st/.5);
    float left=step(.2,st.x);
    float bottom=step(.2,st.y);
    float right=step(.2,1.-st.x);
    float top=step(.2,1.-st.y);
    float shape=(left*bottom*right*top);
    
    vec3 color=vec3(mix(sin(st.x),sin(1.-st.x),shape));
    gl_FragColor=vec4(color,1.);
}