#ifdef GL_ES
precision lowp float;
#endif

varying vec2 v_texCoord;

void main(void) {
	vec4 texColor = texture2D(CC_Texture0, v_texCoord);
	float gray = texColor.r * 0.299 + texColor.g * 0.587 + texColor.b * 0.114;
	gl_FragColor = vec4(gray, gray, gray, texColor.a);
}