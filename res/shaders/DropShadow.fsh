precision mediump float;
uniform float radius;
uniform float x;
uniform float y;
uniform float tx;
uniform float ty;
uniform float alpha;
uniform float threshold;
uniform float red;
uniform float green;
uniform float blue;
varying vec2 v_texCoord;

void main(void) {
    vec4 texColor = texture2D(CC_Texture0, v_texCoord);
    vec4 outColor;
    if (texColor.a == 1.0) {
        outColor = texColor;
    } else {
        vec2 texCoord = v_texCoord + vec2(x, y);
        vec4 shadowColor = texture2D(CC_Texture0, texCoord);
        float _alpha = 0.0;
        if (radius > 0.0) {
            const float maxRadius = 20.0;
            _alpha = 0.0;
            float count = 0.0;
            vec2 tempCoord = vec2(0.0);
            for (float i=-maxRadius; i<maxRadius; i += 1.0 ) {
                if (i <= -radius || i >= radius) continue;
                tempCoord.x = i * tx + texCoord.x;
                for (float j=-maxRadius; j<maxRadius; j += 1.0 ) {
                    if (j <= -radius || j >= radius) continue;
                    tempCoord.y = j * ty + texCoord.y;
                    _alpha += texture2D(CC_Texture0, tempCoord).a;
                    count += 1.0;
                }
            }
            _alpha /= count;
        } else {
            _alpha = shadowColor.a;
        }
        _alpha = min(_alpha*threshold, 1.0) * alpha;
        if (texColor.a+_alpha > 0.0) {
            outColor = vec4(red, green, blue, _alpha);
            outColor = outColor*(1.0-texColor.a) + texColor*texColor.a;
        } else {
            outColor = vec4(red, green, blue, texColor.a);
        }
    }
    gl_FragColor = outColor;
}