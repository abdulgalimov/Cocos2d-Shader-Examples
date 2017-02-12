/**
 * Created by Zaur abdulgalimov@gmail.com on 12.02.17.
 */



var res = {
    table_png : "res/table.png",
    card_png : "res/card.png",
    "shaders/Blur.fsh" : "res/shaders/Blur.fsh",
    "shaders/Blur.vsh" : "res/shaders/Blur.vsh",
    "shaders/DropShadow.fsh" : "res/shaders/DropShadow.fsh",
    "shaders/DropShadow.vsh" : "res/shaders/DropShadow.vsh",
    "shaders/GrayScale.fsh" : "res/shaders/GrayScale.fsh",
    "shaders/GrayScale.vsh" : "res/shaders/GrayScale.vsh",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
