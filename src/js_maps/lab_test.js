// This file needs "scene_func.js" and "Hitbox.js" to work!
// Tiled file converted by "compiler.html"
// All made by "jv_eumsmo" (https://github.com/eumsmo)

sceneSet("width","800px");
sceneSet("height","480px");
sceneSet("backgroundColor","#101010");
const IMAGES = {
	"1": "src/img/balloon.png",
	"2": "src/img/logo.png",
	"3": "src/img/balloon.gif",
	"7": "src/img/sprite_0.png",
	"8": "src/img/sprite_1.png",
	"9": "src/img/sprite_2.png"
};
window.IMAGES = IMAGES;
const TRACKS = {};
window.TRACKS = TRACKS;
const SPAWNS = {};
window.SPAWNS = SPAWNS;
let aux;
aux=new Decoration({x:253,y:-22,width:300,height:620,src:IMAGES["1"]});
eventElementInit(aux,{"#${ballons}>=4":"$delete, $end"});
aux=new Decoration({x:149.333333333333,y:370.4888888888885,width:22.6666666666667,height:46.8444444444445,src:IMAGES["3"]});
eventElementInit(aux,{"$add(\"ballons\")":1,"$fire":"$delete"});
aux=new Decoration({x:723.333316666667,y:380.400066666667,width:22.6667,height:46.8444,src:IMAGES["3"]});
eventElementInit(aux,{"$add(\"ballons\")":1,"$fire":"$delete"});
aux=new Decoration({x:721.333316666667,y:53.066733333333,width:22.6667,height:46.8444,src:IMAGES["3"]});
eventElementInit(aux,{"$add(\"ballons\")":1,"$fire":"$delete"});
aux=new Decoration({x:591.333316666667,y:169.7334,width:22.6667,height:46.8444,src:IMAGES["3"]});
eventElementInit(aux,{"$add(\"ballons\")":1,"$fire":"$delete"});
new Decoration({x:0,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:32,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:64,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:96,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:128,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:160,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:192,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:256,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:288,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:352,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:384,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:416,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:0,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:32,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:32,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:64,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:64,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:96,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:128,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:160,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:192,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:256,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:288,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:352,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:384,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:416,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:96,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:128,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:128,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:128,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:160,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:160,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:160,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:192,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:192,y:32,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:192,y:64,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:192,y:96,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:192,y:128,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:192,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:192,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:192,y:352,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:192,y:384,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:192,y:416,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:192,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:224,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:224,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:224,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:256,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:256,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:256,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:288,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:288,y:96,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:288,y:128,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:288,y:160,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:288,y:192,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:288,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:288,y:256,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:288,y:288,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:288,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:288,y:352,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:288,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:320,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:320,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:352,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:352,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:384,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:384,y:96,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:384,y:128,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:384,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:384,y:256,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:384,y:288,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:384,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:384,y:352,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:384,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:416,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:416,y:96,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:416,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:416,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:448,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:448,y:96,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:448,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:448,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:480,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:480,y:96,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:480,y:192,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:480,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:480,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:480,y:352,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:480,y:384,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:480,y:416,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:480,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:512,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:512,y:96,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:512,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:512,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:544,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:544,y:96,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:544,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:544,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:576,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:576,y:96,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:576,y:128,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:576,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:576,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:576,y:352,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:576,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:608,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:608,y:128,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:608,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:608,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:608,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:640,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:640,y:128,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:640,y:160,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:640,y:192,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:640,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:640,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:640,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:672,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:672,y:32,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:672,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:672,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:672,y:416,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:672,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:704,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:704,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:704,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:736,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:736,y:128,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:736,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:736,y:448,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:0,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:32,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:64,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:96,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:128,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:160,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:192,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:224,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:256,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:288,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:320,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:352,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:384,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:416,width:32,height:32,src:IMAGES["7"]});
new Decoration({x:768,y:448,width:32,height:32,src:IMAGES["7"]});
new InvisibleWall({x:0,y:0,width:32,height:480.086956521739});
new InvisibleWall({x:32,y:0,width:768,height:32});
new InvisibleWall({x:32,y:448,width:768,height:32});
new InvisibleWall({x:768,y:32,width:32,height:416});
new InvisibleWall({x:192,y:32,width:32,height:128});
new InvisibleWall({x:96,y:96,width:32,height:352});
new InvisibleWall({x:192,y:320,width:32,height:128});
new InvisibleWall({x:128,y:224,width:160,height:32});
new InvisibleWall({x:288,y:96,width:32,height:288});
new InvisibleWall({x:384,y:224,width:32,height:160});
new InvisibleWall({x:384,y:96,width:32,height:64});
new InvisibleWall({x:416,y:96,width:192,height:32});
new InvisibleWall({x:576,y:128,width:96,height:32});
new InvisibleWall({x:480,y:192,width:32,height:32});
new InvisibleWall({x:640,y:160,width:32,height:64});
new InvisibleWall({x:480,y:320,width:32,height:128});
new InvisibleWall({x:576,y:320,width:32,height:64});
new InvisibleWall({x:608,y:320,width:160,height:32});
new InvisibleWall({x:672,y:416,width:32,height:32});
new InvisibleWall({x:672,y:32,width:32,height:32});
new InvisibleWall({x:736,y:128,width:32,height:32});
new InvisibleWall({x:416,y:224,width:288,height:32});
window.char = new Char({x:37.3333333333333,y:375.3333333333337,width:53.3333333333333,height:53.3333333333333,src:IMAGES["2"]});
