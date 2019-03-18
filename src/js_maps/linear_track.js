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
new Decoration(0,0,32,32,IMAGES["9"]);
new Decoration(0,32,32,32,IMAGES["9"]);
new Decoration(0,64,32,32,IMAGES["9"]);
new Decoration(0,96,32,32,IMAGES["9"]);
new Decoration(0,128,32,32,IMAGES["9"]);
new Decoration(0,160,32,32,IMAGES["9"]);
new Decoration(0,192,32,32,IMAGES["9"]);
new Decoration(0,224,32,32,IMAGES["9"]);
new Decoration(0,256,32,32,IMAGES["9"]);
new Decoration(0,288,32,32,IMAGES["9"]);
new Decoration(0,320,32,32,IMAGES["9"]);
new Decoration(0,352,32,32,IMAGES["9"]);
new Decoration(0,384,32,32,IMAGES["9"]);
new Decoration(0,416,32,32,IMAGES["9"]);
new Decoration(0,448,32,32,IMAGES["9"]);
new Decoration(32,0,32,32,IMAGES["9"]);
new Decoration(32,192,32,32,IMAGES["9"]);
new Decoration(32,320,32,32,IMAGES["9"]);
new Decoration(32,448,32,32,IMAGES["9"]);
new Decoration(64,0,32,32,IMAGES["9"]);
new Decoration(64,32,32,32,IMAGES["9"]);
new Decoration(64,64,32,32,IMAGES["9"]);
new Decoration(64,96,32,32,IMAGES["9"]);
new Decoration(64,128,32,32,IMAGES["9"]);
new Decoration(64,192,32,32,IMAGES["9"]);
new Decoration(64,256,32,32,IMAGES["9"]);
new Decoration(64,384,32,32,IMAGES["9"]);
new Decoration(64,448,32,32,IMAGES["9"]);
new Decoration(96,128,32,32,IMAGES["9"]);
new Decoration(96,192,32,32,IMAGES["9"]);
new Decoration(96,256,32,32,IMAGES["9"]);
new Decoration(96,288,32,32,IMAGES["9"]);
new Decoration(96,320,32,32,IMAGES["9"]);
new Decoration(96,352,32,32,IMAGES["9"]);
new Decoration(96,384,32,32,IMAGES["9"]);
new Decoration(96,448,32,32,IMAGES["9"]);
new Decoration(128,0,32,32,IMAGES["9"]);
new Decoration(128,64,32,32,IMAGES["9"]);
new Decoration(128,128,32,32,IMAGES["9"]);
new Decoration(128,256,32,32,IMAGES["9"]);
new Decoration(128,448,32,32,IMAGES["9"]);
new Decoration(160,0,32,32,IMAGES["9"]);
new Decoration(160,64,32,32,IMAGES["9"]);
new Decoration(160,128,32,32,IMAGES["9"]);
new Decoration(160,160,32,32,IMAGES["9"]);
new Decoration(160,192,32,32,IMAGES["9"]);
new Decoration(160,224,32,32,IMAGES["9"]);
new Decoration(160,256,32,32,IMAGES["9"]);
new Decoration(160,320,32,32,IMAGES["9"]);
new Decoration(160,352,32,32,IMAGES["9"]);
new Decoration(160,384,32,32,IMAGES["9"]);
new Decoration(160,416,32,32,IMAGES["9"]);
new Decoration(160,448,32,32,IMAGES["9"]);
new Decoration(192,64,32,32,IMAGES["9"]);
new Decoration(192,448,32,32,IMAGES["9"]);
new Decoration(224,32,32,32,IMAGES["9"]);
new Decoration(224,64,32,32,IMAGES["9"]);
new Decoration(224,96,32,32,IMAGES["9"]);
new Decoration(224,128,32,32,IMAGES["9"]);
new Decoration(224,160,32,32,IMAGES["9"]);
new Decoration(224,192,32,32,IMAGES["9"]);
new Decoration(224,224,32,32,IMAGES["9"]);
new Decoration(224,256,32,32,IMAGES["9"]);
new Decoration(224,288,32,32,IMAGES["9"]);
new Decoration(224,320,32,32,IMAGES["9"]);
new Decoration(224,352,32,32,IMAGES["9"]);
new Decoration(224,384,32,32,IMAGES["9"]);
new Decoration(224,416,32,32,IMAGES["9"]);
new Decoration(224,448,32,32,IMAGES["9"]);
new Decoration(288,0,32,32,IMAGES["9"]);
new Decoration(288,32,32,32,IMAGES["9"]);
new Decoration(288,64,32,32,IMAGES["9"]);
new Decoration(288,96,32,32,IMAGES["9"]);
new Decoration(288,128,32,32,IMAGES["9"]);
new Decoration(288,160,32,32,IMAGES["9"]);
new Decoration(288,192,32,32,IMAGES["9"]);
new Decoration(288,224,32,32,IMAGES["9"]);
new Decoration(288,256,32,32,IMAGES["9"]);
new Decoration(288,320,32,32,IMAGES["9"]);
new Decoration(288,416,32,32,IMAGES["9"]);
new Decoration(320,0,32,32,IMAGES["9"]);
new Decoration(320,64,32,32,IMAGES["9"]);
new Decoration(320,96,32,32,IMAGES["9"]);
new Decoration(320,160,32,32,IMAGES["9"]);
new Decoration(320,192,32,32,IMAGES["9"]);
new Decoration(320,256,32,32,IMAGES["9"]);
new Decoration(320,288,32,32,IMAGES["9"]);
new Decoration(320,448,32,32,IMAGES["9"]);
new Decoration(352,0,32,32,IMAGES["9"]);
new Decoration(352,32,32,32,IMAGES["9"]);
new Decoration(352,64,32,32,IMAGES["9"]);
new Decoration(352,128,32,32,IMAGES["9"]);
new Decoration(352,192,32,32,IMAGES["9"]);
new Decoration(352,224,32,32,IMAGES["9"]);
new Decoration(352,256,32,32,IMAGES["9"]);
new Decoration(384,0,32,32,IMAGES["9"]);
new Decoration(384,32,32,32,IMAGES["9"]);
new Decoration(384,96,32,32,IMAGES["9"]);
new Decoration(384,128,32,32,IMAGES["9"]);
new Decoration(384,160,32,32,IMAGES["9"]);
new Decoration(384,224,32,32,IMAGES["9"]);
new Decoration(384,256,32,32,IMAGES["9"]);
new Decoration(416,0,32,32,IMAGES["9"]);
new Decoration(416,64,32,32,IMAGES["9"]);
new Decoration(416,96,32,32,IMAGES["9"]);
new Decoration(416,160,32,32,IMAGES["9"]);
new Decoration(416,192,32,32,IMAGES["9"]);
new Decoration(416,256,32,32,IMAGES["9"]);
new Decoration(448,0,32,32,IMAGES["9"]);
new Decoration(448,32,32,32,IMAGES["9"]);
new Decoration(448,96,32,32,IMAGES["9"]);
new Decoration(448,128,32,32,IMAGES["9"]);
new Decoration(448,160,32,32,IMAGES["9"]);
new Decoration(448,224,32,32,IMAGES["9"]);
new Decoration(448,256,32,32,IMAGES["9"]);
new Decoration(448,288,32,32,IMAGES["9"]);
new Decoration(448,448,32,32,IMAGES["9"]);
new Decoration(480,0,32,32,IMAGES["9"]);
new Decoration(480,32,32,32,IMAGES["9"]);
new Decoration(480,64,32,32,IMAGES["9"]);
new Decoration(480,128,32,32,IMAGES["9"]);
new Decoration(480,192,32,32,IMAGES["9"]);
new Decoration(480,224,32,32,IMAGES["9"]);
new Decoration(480,256,32,32,IMAGES["9"]);
new Decoration(480,320,32,32,IMAGES["9"]);
new Decoration(480,416,32,32,IMAGES["9"]);
new Decoration(512,0,32,32,IMAGES["9"]);
new Decoration(512,64,32,32,IMAGES["9"]);
new Decoration(512,96,32,32,IMAGES["9"]);
new Decoration(512,160,32,32,IMAGES["9"]);
new Decoration(512,192,32,32,IMAGES["9"]);
new Decoration(512,256,32,32,IMAGES["9"]);
new Decoration(544,0,32,32,IMAGES["9"]);
new Decoration(544,32,32,32,IMAGES["9"]);
new Decoration(544,64,32,32,IMAGES["9"]);
new Decoration(544,96,32,32,IMAGES["9"]);
new Decoration(544,128,32,32,IMAGES["9"]);
new Decoration(544,160,32,32,IMAGES["9"]);
new Decoration(544,192,32,32,IMAGES["9"]);
new Decoration(544,224,32,32,IMAGES["9"]);
new Decoration(544,256,32,32,IMAGES["9"]);
window.char = new Char(547,364,24,24,IMAGES["3"]);
aux=new MovableSprite(32,32,32,32,IMAGES["7"]);
eventElementInit(aux,{"#":"$setTrack(\"track\")"});
aux=new MovableSprite(416,128,32,32,IMAGES["7"]);
eventElementInit(aux,{"#":"$setTrack(\"track1\")"});
aux=new MovableSprite(320,320,32,32,IMAGES["7"]);
eventElementInit(aux,{"#":"$setTrack(\"track_vh\")"});
aux=new MovableSprite(448,320,32,32,IMAGES["7"]);
eventElementInit(aux,{"#":"$setTrack(\"track_v\")"});
aux=new MovableSprite(320,416,32,32,IMAGES["7"]);
eventElementInit(aux,{"#":"$setTrack(\"track_h\")"});
