/*
let game_block = document.querySelector("#game");
const Keyboard = new Teclado();

/* Movable Modal Section */
function moveModal(evt){
  let modal = evt.currentTarget,
      coords = modal.getBoundingClientRect();
  modal.style.left = coords.x + evt.movementX + 'px';
  modal.style.top = coords.y + evt.movementY + 'px';

}

let movable_modals = document.querySelectorAll(".modal"),
    modals_close = document.querySelectorAll(".modal > .close");

const modalMoveRemove = modal => () => modal.removeEventListener("mousemove",moveModal);
const modalClose = evt => evt.currentTarget.parentElement.classList.add("closed");
movable_modals.forEach(modal=> {
  modal.addEventListener("mousedown",() => modal.addEventListener("mousemove",moveModal));
  modal.addEventListener("mouseup",modalMoveRemove(modal));
  modal.addEventListener("mouseleave",modalMoveRemove(modal));
});

modals_close.forEach(btn=> btn.addEventListener("click",modalClose));



/* Layers Management */
let layers_list = document.querySelector("#layers_list");

function displayLayerInList(layer){
  let li = document.createElement("li"),
      anchor = document.createElement("a");

  anchor.innerHTML = layer.name;
  anchor.href = '#'+ layer.name;
  li.appendChild(anchor);
  layers_list.appendChild(li);
}



/* Global Variables */
let images = [],
    sprites = [],
    tiles_size = {};

/*
new Group("decoration",{father: game_block});
new Group("main",{father: game_block});

/* Scene Variables */



/* Generate Sprites */
function organizeTilesets(tilesets){
  tilesets.forEach(tset=>{
    let i = tset.firstgid;

    if(tset.tilecount==1) images[i] = tset.image;
    else
      for(let gid in tset.tiles)
        images[Number(gid)+i] = tset.tiles[gid].image;
  });
}
function tilesToSprite(layer){
  let tw = tiles_size.width,
      th = tiles_size.height,
      arr = layer.data, i, j,
      xm = layer.width, ym = layer.height,
      offx = layer.x, offy = layer.y;

  for(i=0;i<xm;i++){
    for(j=0;j<ym;j++){
      console.log(arr[i*xm+j],i*xm+j);
      let opt = {
        gid: arr[j*xm+i],
        x: offx+ i*tw, y:offy+j*th + th,
        width: tw, height: th
      };
      uniqueSpriteGen(opt,layer);
    }
  }

}
function uniqueSpriteGen(sprite,layer){
  if(!sprite.gid || sprite.type) return nonSpriteGen(sprite,layer);

  let c = game_block.getBoundingClientRect();
  sprite.src = images[sprite.gid];
  sprite.x = sprite.x + c.x;
  sprite.y = sprite.y + c.y - sprite.height;
  let s = new Sprite(sprite);
  s.watchedContexts = [];
  s.setGroup("decoration");
  sprites.push(s);

  if(sprite.properties) eventElementInit(s,sprite);
}
function nonSpriteGen(obj,layer){
  let c = game_block.getBoundingClientRect();

  if(obj.type!=""){
    if(obj.type=="char"){
      obj.src = images[obj.gid];
      obj.x = obj.x + c.x;
      obj.y = obj.y + c.y - obj.height;
      let char = new Char(obj);
      sprites.push(char);
      char.setGroup("main");
      Keyboard.chars.push(char);

      if(obj.properties) eventElementInit(char,obj);
    }
  }
  else if(obj.polygon){}
  else if(obj.polyline){}
  else if(obj.point){}
  else if(obj.ellipse){}
  else if(obj.text){}
  else {
    let div = document.createElement("div"),
        hitbox = new DOM_Hitbox(div);

    hitbox.x = obj.x + c.x;
    hitbox.y = obj.y + c.y;
    hitbox.width = obj.width;
    hitbox.height = obj.height;
    hitbox.type = "block";
    hitbox.setGroup("main");
    div.classList.add("col");

    if(obj.properties) eventElementInit(hitbox,obj);

  }
}
function spriteGen(layer){
  if(layer.constructor == Array) return layer.forEach(spriteGen);
  if(layer.type == "group") return layer.layers.forEach(spriteGen);

  if(layer.objects){
    let objs = layer.objects;
    objs.forEach(obj=> uniqueSpriteGen(obj,layer));
  } else {
    tilesToSprite(layer);
  }
}


/* Retrive Files */
let file_input = document.querySelector("#file_receiver"),
    map_obj = {};

function file2String(evt){
  let el = evt.currentTarget,
      file = el.files[0],
      reader = new FileReader();

  reader.addEventListener("load",evt=>{
    let str = evt.target.result;
    if(str!=undefined){
      restartCode();
      manageLayers(JSON.parse(str));
    }
  });

  reader.readAsText(file);
}

file_input.addEventListener("change",file2String);

class SceneManager {
  constructor(){
    this.scenes = {};
    this.file = "";

    // Cache
    this.actualScene = {};
  }

  addScene(name,obj){
    let scene = this.scenes[name] = {};
    scene.info = obj;
    scene.images = [];
    scene.tiles_size = {
      width: obj.tilewidth,
      height: obj.tileheight
    };

    // Preload Images
    obj.tilesets.forEach(tset=>{
      let i = tset.firstgid;

      if(tset.tilecount==1)
        scene.images[i] = this.preloadImage(tset.image);
      else
        for(let gid in tset.tiles)
          scene.images[Number(gid)+i] = this.preloadImage(tset.tiles[gid].image);
    });

  }
  preloadImage(src){
    let img = new Image();
    img.src = src;
    return src;
  }

  _tileOrganize(layer){
    let scene = this.actualScene, lines = "";

    let tw = scene.tiles_size.width,
        th = scene.tiles_size.height,
        arr = layer.data, i, j,
        xm = layer.width, ym = layer.height,
        offx = layer.x, offy = layer.y;

    for(i=0;i<xm;i++){
      for(j=0;j<ym;j++){
        console.log(arr[j*xm+i],i*xm+j);
        let opt = {
          gid: arr[j*xm+i],
          x: offx+ i*tw, y:offy+j*th + th,
          width: tw, height: th
        };
        if(arr[j*xm+i])
          lines+= this._objectOrganize(opt,layer);
      }
    }
    return lines;
  }
  _genLine(type,details){return `new ${type}(${JSON.stringify(details)});\n`}
  _objectOrganize(object,layer){
    let c = game_block.getBoundingClientRect();
    let nextLine = "", details, type;

    details = {
      x: object.x + c.x, y: object.y +c.y - object.height,
      width: object.width, height: object.height
    };

    if(object.gid) details.src = this.actualScene.images[object.gid];

    if(!object.type){
      if(object.gid)type = "Decoration";
      else{
        type = "InvisibleWall";
        details.y += object.height;
      }

    } else if(object.type){
      type = object.type;
      if(type == "Char") nextLine = "Keyboard.chars.push(aux);\n";
    }

    if(object.properties) nextLine+='eventElementInit(aux,'+JSON.stringify(object.properties)+');\n';

    return (nextLine!="")? "aux=" + this._genLine(type,details) + nextLine : this._genLine(type,details);
  }
  _layerOrganize(layer){
    let lines = "";
    if(layer.type == "group") return layer.layers.forEach(l=> lines += this._layerOrganize(l));

    if(layer.objects){
      layer.objects.forEach(obj=> lines+=this._objectOrganize(obj,layer));
    } else {
      lines+= this._tileOrganize(layer);
    }

    return lines;
  }
  generateFile(name){
    let scene, layers;
    scene = this.scenes[name];
    layers = scene.info.layers;
    this.actualScene = scene;

    let file = `
    let aux; //aux is a global pointer
    let game_block = document.querySelector("#game");
    const Keyboard = new Teclado();
    new Group("decoration",{father: game_block});
    new Group("main",{father: game_block});
    new Group("char",{father: game_block});
    `;

    layers.forEach(layer=> file += this._layerOrganize(layer));

    console.log(file);

  }
}

const MANAGER = new SceneManager();
MANAGER.addScene("lab",JSON.parse('{ "height":15, "infinite":false, "layers":[        {         "draworder":"index",         "name":"decoration",         "objects":[                {                 "gid":1,                 "height":620,                 "id":42,                 "name":"",                 "properties":                    {                     "#${ballons}>=4":"delete"                    },                 "propertytypes":                    {                     "#${ballons}>=4":"string"                    },                 "rotation":0,                 "type":"",                 "visible":true,                 "width":300,                 "x":253,                 "y":598                },                {                 "gid":3,                 "height":46.8444444444445,                 "id":6,                 "name":"",                 "properties":                    {                     "$add_ballons":1,                     "$fire":"delete"                    },                 "propertytypes":                    {                     "$add_ballons":"int",                     "$fire":"string"                    },                 "rotation":0,                 "type":"",                 "visible":true,                 "width":22.6666666666667,                 "x":149.333333333333,                 "y":417.333333333333                },                {                 "gid":3,                 "height":46.8444,                 "id":7,                 "name":"",                 "properties":                    {                     "$add_ballons":1,                     "$fire":"delete"                    },                 "propertytypes":                    {                     "$add_ballons":"int",                     "$fire":"string"                    },                 "rotation":0,                 "type":"",                 "visible":true,                 "width":22.6667,                 "x":723.333316666667,                 "y":427.244466666667                },                {                 "gid":3,                 "height":46.8444,                 "id":8,                 "name":"",                 "properties":                    {                     "$add_ballons":1,                     "$fire":"delete"                    },                 "propertytypes":                    {                     "$add_ballons":"int",                     "$fire":"string"                    },                 "rotation":0,                 "type":"",                 "visible":true,                 "width":22.6667,                 "x":721.333316666667,                 "y":99.911133333333                },                {                 "gid":3,                 "height":46.8444,                 "id":9,                 "name":"",                 "properties":                    {                     "$add_ballons":1,                     "$fire":"delete"                    },                 "propertytypes":                    {                     "$add_ballons":"int",                     "$fire":"string"                    },                 "rotation":0,                 "type":"",                 "visible":true,                 "width":22.6667,                 "x":591.333316666667,                 "y":216.5778                }],         "opacity":1,         "type":"objectgroup",         "visible":true,         "x":0,         "y":0        },        {         "data":[7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 7, 7, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 7, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 7, 7, 7, 0, 0, 7, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 7, 7, 0, 0, 7, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 7, 0, 0, 0, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 0, 0, 7, 0, 0, 0, 0, 0, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 7, 0, 0, 0, 0, 0, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 0, 0, 0, 7, 7, 0, 0, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],         "height":15,         "name":"Camada de Tiles 1",         "opacity":1,         "type":"tilelayer",         "visible":true,         "width":25,         "x":0,         "y":0        },        {         "color":"#c50000",         "draworder":"topdown",         "name":"overlap",         "objects":[                {                 "height":480.086956521739,                 "id":11,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":0,                 "y":0                },                {                 "height":32,                 "id":14,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":768,                 "x":32,                 "y":0                },                {                 "height":32,                 "id":15,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":768,                 "x":32,                 "y":448                },                {                 "height":416,                 "id":16,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":768,                 "y":32                },                {                 "height":128,                 "id":17,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":192,                 "y":32                },                {                 "height":352,                 "id":18,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":96,                 "y":96                },                {                 "height":128,                 "id":19,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":192,                 "y":320                },                {                 "height":32,                 "id":20,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":160,                 "x":128,                 "y":224                },                {                 "height":288,                 "id":21,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":288,                 "y":96                },                {                 "height":160,                 "id":22,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":384,                 "y":224                },                {                 "height":64,                 "id":23,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":384,                 "y":96                },                {                 "height":32,                 "id":25,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":192,                 "x":416,                 "y":96                },                {                 "height":32,                 "id":26,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":96,                 "x":576,                 "y":128                },                {                 "height":32,                 "id":28,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":480,                 "y":192                },                {                 "height":64,                 "id":29,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":640,                 "y":160                },                {                 "height":128,                 "id":30,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":480,                 "y":320                },                {                 "height":64,                 "id":31,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":576,                 "y":320                },                {                 "height":32,                 "id":32,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":160,                 "x":608,                 "y":320                },                {                 "height":32,                 "id":33,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":672,                 "y":416                },                {                 "height":32,                 "id":34,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":672,                 "y":32                },                {                 "height":32,                 "id":35,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":32,                 "x":736,                 "y":128                },                {                 "height":32,                 "id":36,                 "name":"",                 "rotation":0,                 "type":"",                 "visible":true,                 "width":288,                 "x":416,                 "y":224                }],         "opacity":1,         "type":"objectgroup",         "visible":true,         "x":0,         "y":0        },        {         "draworder":"topdown",         "name":"Camada de Objetos 1",         "objects":[                {                 "gid":2,                 "height":53.3333333333333,                 "id":1,                 "name":"",                 "rotation":0,                 "type":"Char",                 "visible":true,                 "width":53.3333333333333,                 "x":37.3333333333333,                 "y":429.666666666667                }],         "opacity":1,         "type":"objectgroup",         "visible":true,         "x":0,         "y":0        }], "nextobjectid":43, "orientation":"orthogonal", "renderorder":"right-down", "tiledversion":"1.1.2", "tileheight":32, "tilesets":[        {         "columns":0,         "firstgid":1,         "grid":            {             "height":1,             "orientation":"orthogonal",             "width":1            },         "margin":0,         "name":"lab_sprites",         "spacing":0,         "tilecount":6,         "tileheight":620,         "tiles":            {             "0":                {                 "image":"E:\/Imagens\/balloon.png",                 "imageheight":620,                 "imagewidth":300                },             "1":                {                 "image":"E:\/Imagens\/logo.png",                 "imageheight":200,                 "imagewidth":200                },             "2":                {                 "image":"E:\/Imagens\/balloon.gif",                 "imageheight":620,                 "imagewidth":300                },             "6":                {                 "image":"E:\/Downloads\/piskel)tile32\/sprite_0.png",                 "imageheight":32,                 "imagewidth":32                },             "7":                {                 "image":"E:\/Downloads\/piskel)tile32\/sprite_1.png",                 "imageheight":32,                 "imagewidth":32                },             "8":                {                 "image":"E:\/Downloads\/piskel)tile32\/sprite_2.png",                 "imageheight":32,                 "imagewidth":32                }            },         "tilewidth":300        }], "tilewidth":32, "type":"map", "version":1, "width":25}'));
