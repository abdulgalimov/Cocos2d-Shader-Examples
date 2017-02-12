/**
 * Created by Zaur abdulgalimov@gmail.com on 12.02.17.
 */


var AppLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        //
        var table = new cc.Sprite(res.table_png);
        table.x = cc.winSize.width/2;
        table.y = cc.winSize.height/2;
        this.addChild(table);
        //
        var originalImage = this.createCard(200, 490, 'Original');
        var textureWith = originalImage.getContentSize().width;
        var textureHeight = originalImage.getContentSize().height;
        //
        var grayImage = this.createCard(450, 490, 'Grayscale');
        grayImage.shaderProgram = Programs.getGrayScale();
        //
        var blurImage = this.createCard(700, 490, 'Blur');
        blurImage.shaderProgram = Programs.getBlur(textureWith, textureHeight, 5);
        //
        var outlineImage = this.createCard(200, 170, 'Outline');
        var outlineOptions = {
            distance:0,
            threshold:30,
            radius:7,
            alpha:1,
            color:0xff0000
        };
        outlineImage.shaderProgram = Programs.getDropShadow(textureWith, textureHeight, outlineOptions);
        outlineImage.setBlendFunc(cc.BlendFunc.ALPHA_NON_PREMULTIPLIED);
        //
        var glowImage = this.createCard(450, 170, 'Glow');
        var glowOptions = {
            distance:0,
            radius:15,
            alpha:1,
            color:0xffff00
        };
        glowImage.shaderProgram = Programs.getDropShadow(textureWith, textureHeight, glowOptions);
        glowImage.setBlendFunc(cc.BlendFunc.ALPHA_NON_PREMULTIPLIED);
        //
        var shadowImage = this.createCard(700, 170, 'Drop shadow');
        var shadowOptions = {
            distance:20,
            radius:3,
            alpha:.5,
            color:0x0,
            angle:Math.PI/4
        };
        shadowImage.shaderProgram = Programs.getDropShadow(textureWith, textureHeight, shadowOptions);
        shadowImage.setBlendFunc(cc.BlendFunc.ALPHA_NON_PREMULTIPLIED);
    },

});
AppLayer.prototype.createCard = function(x, y, text) {
    var card = new cc.Sprite(res.card_png); 
    card.x = x;
    card.y = y;
    this.addChild(card);
    //
    var label = new cc.LabelTTF(text, "Arial", 20);
        label.fillStyle = cc.color('#000000');
        label.x = x;
        label.y = y - 140;
        this.addChild(label);
    //
    return card;
}

var AppScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AppLayer();
        this.addChild(layer);
    }
});

