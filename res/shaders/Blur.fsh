precision mediump float;
uniform float radius;
uniform float tx;
uniform float ty;
varying vec2 v_texCoord;

void main(void) {
    vec4 sumCoolor = texture2D(CC_Texture0, v_texCoord);
    if (radius > 0.0) {
        const float maxRadius = 20.0;
        float count = 0.0;
        vec2 coord;
        for (float i=-maxRadius; i<maxRadius; i += 1.0 ) {
            if (i < -radius || i > radius) continue;
            for (float j=-maxRadius; j<maxRadius; j += 1.0 ) {
                if (j < -radius || j > radius) continue;
                float cx = i * tx + v_texCoord.x;
                float cy = j * ty + v_texCoord.y;
                sumCoolor += texture2D(CC_Texture0, vec2(cx, cy));
                count += 1.0;
            }
        }
        sumCoolor /= count;
    }
    //
    gl_FragColor = sumCoolor;
}