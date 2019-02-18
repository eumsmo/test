// This file needs "scene_func.js" and "Hitbox.js" to work!
// Tiled file converted by "compiler.html"
// All made by "jv_eumsmo" (https://github.com/eumsmo)

sceneSet("width","800px");
sceneSet("height","480px");
sceneSet("backgroundColor","#ffffff");
const IMAGES = {
	"1": "src/img/forest.png",
	"2": "src/img/dirt.png",
	"3": "src/img/coracaum.png",
	"4": "src/img/batatas.png",
	"6": "src/img/laser-grosso.png",
	"7": "src/img/sprite_1.png",
	"8": "src/img/sprite_2.png",
	"9": "src/img/sprite_0.png",
	"10": "src/img/forest.png",
	"11": "src/img/dirt.png",
	"12": "src/img/coracaum.png",
	"13": "src/img/batatas.png",
	"15": "src/img/laser-grosso.png"
};
window.IMAGES = IMAGES;
const TRACKS = {
	"track": [
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 0,
			"y": 128
		},
		{
			"x": 96,
			"y": 128
		},
		{
			"x": 96,
			"y": 192
		},
		{
			"x": 0,
			"y": 192
		},
		{
			"x": 0,
			"y": 256
		},
		{
			"x": 32,
			"y": 256
		},
		{
			"x": 32,
			"y": 320
		},
		{
			"x": 0,
			"y": 320
		},
		{
			"x": 0,
			"y": 384
		},
		{
			"x": 96,
			"y": 384
		},
		{
			"x": 96,
			"y": 256
		},
		{
			"x": 160,
			"y": 256
		},
		{
			"x": 160,
			"y": 384
		},
		{
			"x": 160,
			"y": 64
		},
		{
			"x": 64,
			"y": 64
		},
		{
			"x": 64,
			"y": -32
		},
		{
			"x": 64,
			"y": 0
		},
		{
			"x": 160,
			"y": 0
		},
		{
			"x": 160,
			"y": -32
		},
		{
			"x": 224,
			"y": -32
		},
		{
			"x": 224,
			"y": 416
		}
	],
	"track1": [
		{
			"x": 0,
			"y": 0
		},
		{
			"x": -96,
			"y": -96
		},
		{
			"x": 96,
			"y": 96
		},
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 96,
			"y": -96
		},
		{
			"x": -96,
			"y": 96
		},
		{
			"x": 0,
			"y": 0
		},
		{
			"x": -96,
			"y": 0
		},
		{
			"x": 0,
			"y": 96
		},
		{
			"x": -64,
			"y": -32
		},
		{
			"x": 32,
			"y": 64
		},
		{
			"x": -32,
			"y": -64
		},
		{
			"x": 64,
			"y": 32
		},
		{
			"x": 0,
			"y": -96
		},
		{
			"x": 96,
			"y": 0
		},
		{
			"x": -64,
			"y": 32
		},
		{
			"x": 32,
			"y": -64
		},
		{
			"x": -32,
			"y": 64
		},
		{
			"x": 64,
			"y": -32
		},
		{
			"x": 0,
			"y": 0
		}
	],
	"track_h": [
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 128,
			"y": 0
		}
	],
	"track_v": [
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 0,
			"y": 96
		}
	],
	"track_vh": [
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 128,
			"y": 96
		}
	]
};
window.TRACKS = TRACKS;
const SPAWNS = {};
window.SPAWNS = SPAWNS;
let aux;
new Decoration({x:0,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:32,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:96,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:128,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:160,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:224,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:288,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:320,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:352,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:384,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:416,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:0,y:448,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:32,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:32,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:32,y:320,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:32,y:448,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:64,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:64,y:32,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:64,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:64,y:96,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:64,y:128,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:64,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:64,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:64,y:384,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:64,y:448,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:96,y:128,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:96,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:96,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:96,y:288,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:96,y:320,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:96,y:352,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:96,y:384,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:96,y:448,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:128,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:128,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:128,y:128,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:128,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:128,y:448,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:160,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:160,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:160,y:128,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:160,y:160,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:160,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:160,y:224,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:160,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:160,y:320,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:160,y:352,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:160,y:384,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:160,y:416,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:160,y:448,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:192,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:192,y:448,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:32,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:96,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:128,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:160,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:224,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:288,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:320,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:352,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:384,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:416,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:224,y:448,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:288,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:288,y:32,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:288,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:288,y:96,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:288,y:128,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:288,y:160,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:288,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:288,y:224,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:288,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:288,y:320,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:288,y:416,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:320,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:320,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:320,y:96,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:320,y:160,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:320,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:320,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:320,y:288,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:320,y:448,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:352,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:352,y:32,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:352,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:352,y:128,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:352,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:352,y:224,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:352,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:384,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:384,y:32,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:384,y:96,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:384,y:128,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:384,y:160,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:384,y:224,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:384,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:416,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:416,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:416,y:96,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:416,y:160,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:416,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:416,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:448,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:448,y:32,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:448,y:96,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:448,y:128,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:448,y:160,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:448,y:224,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:448,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:448,y:288,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:448,y:448,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:480,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:480,y:32,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:480,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:480,y:128,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:480,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:480,y:224,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:480,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:480,y:320,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:480,y:416,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:512,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:512,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:512,y:96,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:512,y:160,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:512,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:512,y:256,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:544,y:0,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:544,y:32,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:544,y:64,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:544,y:96,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:544,y:128,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:544,y:160,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:544,y:192,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:544,y:224,width:32,height:32,src:IMAGES["9"]});
new Decoration({x:544,y:256,width:32,height:32,src:IMAGES["9"]});
window.char = new Char({x:547,y:364,width:24,height:24,src:IMAGES["3"]});
aux=new MovableSprite({x:32,y:32,width:32,height:32,src:IMAGES["7"]});
eventElementInit(aux,{"#":"$setTrack(\"track\")"});
aux=new MovableSprite({x:416,y:128,width:32,height:32,src:IMAGES["7"]});
eventElementInit(aux,{"#":"$setTrack(\"track1\")"});
aux=new MovableSprite({x:320,y:320,width:32,height:32,src:IMAGES["7"]});
eventElementInit(aux,{"#":"$setTrack(\"track_vh\")"});
aux=new MovableSprite({x:448,y:320,width:32,height:32,src:IMAGES["7"]});
eventElementInit(aux,{"#":"$setTrack(\"track_v\")"});
aux=new MovableSprite({x:320,y:416,width:32,height:32,src:IMAGES["7"]});
eventElementInit(aux,{"#":"$setTrack(\"track_h\")"});
