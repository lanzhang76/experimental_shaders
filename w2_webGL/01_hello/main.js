//////////////////////////////////////////////
// vertext setup
const VS_SOURCE = `
    precision highp float;
    
    attribute vec4 aVertexPosition;
    
    void main(void) {
        // mandatory to pass the position value
      gl_Position = aVertexPosition;
    }
`;

//////////////////////////////////////////////
// fragment setup
const FS_SOURCE = `
    precision highp float;
    
    void main(void) {
      gl_FragColor = vec4(gl_FragCoord.x/640., 0.0, 0.0, 1.0);
    }
`;

main();
function main() {
    console.log('Hello, WebGL!');

    //////////////////////////////////////////////
    // create the context
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl');


    //////////////////////////////////////////////
    // compile/link the shader program

    // compile vertex shader
    const vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertex_shader, VS_SOURCE);
    gl.compileShader(vertex_shader);

    // compile fragment shader
    const fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment_shader, FS_SOURCE);
    gl.compileShader(fragment_shader);

    // link fragment and vertex shader
    const shader_program = gl.createProgram();
    gl.attachShader(shader_program, vertex_shader);
    gl.attachShader(shader_program, fragment_shader);
    // making sure symbols from both shaders are matched
    gl.linkProgram(shader_program);


    //////////////////////////////////////////////
    // query the shaders for attibute and uniform locations
    const vertex_position_location = gl.getAttribLocation(shader_program, 'aVertexPosition');


    //////////////////////////////////////////////
    // buffer the vertex data

    // vertex position data
    // a buffer is like an array on gpu, and we get the buffer# back
    const position_buffer = gl.createBuffer();
    // tells gl to activate/select the current buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
    const positions = [ // it's 8 numbers, not four points
        1.0, 1.0, // right top
        -1.0, 1.0, // left top
        1.0, -1.0, // bottom right
        -1.0, -1.0, // bottom left
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    // pass pos, 2 is double for pos (3 for rgb), type of data, don't skip, skip 0, skip 0
    gl.vertexAttribPointer(vertex_position_location, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertex_position_location);


    //////////////////////////////////////////////
    // configure gl
    // DEPTH_TEST would test if one frag is behind another. In this case, it's unncessary
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL); // Less Equal


    //////////////////////////////////////////////
    // draw

    // clear the background
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    // binary OR 0001 | 0100 => 0101
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // draw the geometry with our shaders
    gl.useProgram(shader_program);
    gl.drawArrays(
        // gl.TRIANGLE_STRIP: 
        gl.TRIANGLE_STRIP, // the third point always connects with the previous two points
        0, // 0 is offset(how many vertices is skipped)
        4 //  4 is the total amount of vertex in the geomerty we are passing
    );

    // there are other drawing modes such as:
    // gl_triangles: individual triangles are drawn
    // gl_triangle_FAN: drawing in four 

}
