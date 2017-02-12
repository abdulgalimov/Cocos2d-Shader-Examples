/**
 * Created by Zaur abdulgalimov@gmail.com on 12.02.17.
 */



var Programs = function() {
};

Programs.getGrayScale = function() {
    var program = new cc.GLProgram(res['shaders/GrayScale.vsh'], res['shaders/GrayScale.fsh']);
    program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
    program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
    program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
    program.link();
    program.updateUniforms();
    return program;
};


Programs.getBlur = function(w, h, radius) {
    //
    var tx = 1/w;
    var ty = 1/h;
    //
    radius = radius!=undefined ? radius : 5;
    radius = Math.min(Math.max(0, radius), 20);
    //
    var program = new cc.GLProgram(res['shaders/Blur.vsh'], res['shaders/Blur.fsh']);
    program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
    program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
    program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
    program.link();
    program.updateUniforms();
    program.setUniformLocationWith1f(program.getUniformLocationForName('radius'), radius);
    program.setUniformLocationWith1f(program.getUniformLocationForName('tx'), tx);
    program.setUniformLocationWith1f(program.getUniformLocationForName('ty'), ty);
    return program;
};


Programs.getDropShadow = function (w, h, options) {
    options = options||{};
    var angle = options.hasOwnProperty('angle') ? +options.angle : Math.PI/4;
    var radius = options.hasOwnProperty('radius') ? +options.radius : 5;
    var alpha = options.hasOwnProperty('alpha') ? +options.alpha : 0.6;
    var distance = options.hasOwnProperty('distance') ? +options.distance : 20;
    var threshold = options.hasOwnProperty('threshold') ? +options.threshold : 1;
    var color = options.hasOwnProperty('color') ? +options.color : 0x0;
    //
    var tx = 1/w;
    var ty = 1/h;
    var x = tx * distance*Math.cos(angle+Math.PI);
    var y = ty * distance*Math.sin(angle+Math.PI);
    var red = (color >> 16 & 0xff)/255;
    var green = (color >> 8 & 0xff)/255;
    var blue = (color & 0xff)/255;
    //
    var program = new cc.GLProgram(res['shaders/DropShadow.vsh'], res['shaders/DropShadow.fsh']);
    program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
    program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
    program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
    program.link();
    program.updateUniforms();
    program.setUniformLocationWith1f(program.getUniformLocationForName('radius'), radius);
    program.setUniformLocationWith1f(program.getUniformLocationForName('x'), x);
    program.setUniformLocationWith1f(program.getUniformLocationForName('y'), y);
    program.setUniformLocationWith1f(program.getUniformLocationForName('tx'), tx);
    program.setUniformLocationWith1f(program.getUniformLocationForName('ty'), ty);
    program.setUniformLocationWith1f(program.getUniformLocationForName('alpha'), alpha);
    program.setUniformLocationWith1f(program.getUniformLocationForName('threshold'), threshold);
    program.setUniformLocationWith1f(program.getUniformLocationForName('red'), red);
    program.setUniformLocationWith1f(program.getUniformLocationForName('green'), green);
    program.setUniformLocationWith1f(program.getUniformLocationForName('blue'), blue);
    //
    return program;
};


