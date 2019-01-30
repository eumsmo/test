const relatifySpeech = example => `Considerando que as imagens utilizadas pelo Tiled se encontram em um diretório filho do diretório mestre, podemos relativar o endereço das imagens!
Exemplo de endereço: "${example}"
Insira onde se encontra o diretório mestre:`;

let file_modal = document.querySelector("#settings"),
    file_input = document.querySelector("#file_receiver"),
    file_list = document.querySelector("#settings ul"),
    map_obj = {};


function relatify(name){
  let scene = MANAGER.scenes[name], example ,main_folder;

  for(let image of scene.images){
    if(image!=null){
      example=image;
      break;
    }
  }

  main_folder = window.prompt(relatifySpeech(example));

  if(main_folder==null)return;

  for(let i=0; i< scene.images.length;i++){
    if(scene.images[i]!=null)
      scene.images[i] = scene.images[i].replace(main_folder,"");
    console.log(scene.images[i]);
  }
}

function download(name){
  let file = MANAGER.generateFile(name),
      a = document.createElement('a');

  a.href = "data:text/javascript;charset=utf-8,"+file;
  a.download = name.slice(0,-2);
  a.click();
}

function test_scene(name){
  let file = MANAGER.generateFile(name),scene = MANAGER.scenes[name];

  localStorage.setItem("call_arg",file);
  let w = window.open("index.html",'_blank',`location,width=${scene.width},height=${scene.height}`);
}

function fileReady(name,evt){
  let str = evt.target.result;
  if(str!=undefined){
    MANAGER.addScene(name,JSON.parse(str));

    let li = document.createElement("li"),
        span = document.createElement("span"),
        convert = document.createElement("a"),
        test = document.createElement("a"),
        make_relative = document.createElement("a");


    span.innerHTML = name;
    convert.innerHTML = "Download!";
    make_relative.innerHTML = "Relatify!";
    test.innerHTML = "Test!";

    convert.href = make_relative.href = test.href = "#";

    make_relative.addEventListener("click",()=>relatify(name));
    convert.addEventListener("click",()=>download(name));
    test.addEventListener("click",()=>test_scene(name));

    li.appendChild(span);
    li.appendChild(make_relative);
    li.appendChild(convert);
    li.appendChild(test);
    file_list.appendChild(li);
  }
}

function file2String(evt){
  let el = evt.currentTarget;

  for(let file of el.files){
    let reader = new FileReader();
    reader.addEventListener("load",evt=>fileReady(file.name,evt));
    reader.readAsText(file);
  }

}

file_input.addEventListener("change",file2String);

class SceneManager {
  constructor(){
    this.scenes = {};

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
    scene.width = scene.info.width * scene.tiles_size.width;
    scene.height = scene.info.height * scene.tiles_size.height;


    // Preload Images
    obj.tilesets.forEach(tset=>{
      let i = tset.firstgid;

      if(tset.tilecount==1)
        scene.images[i] = tset.image;
      else
        for(let gid in tset.tiles)
          scene.images[Number(gid)+i] = tset.tiles[gid].image;
    });

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
    c = {x:0,y:0};
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



    let file = `// This file needs "scene_func.js" and "Box.js" to work!
// Tiled file converted by "tiled_scene.html"
// All made by "jv_eumsmo" (https://github.com/eumsmo)

window.scene.width = ${scene.width};
window.scene.height = ${scene.height};

let aux;
let game_block = document.querySelector("#game");
const Keyboard = new Teclado();

new Group("decoration",{father: game_block});
new Group("main",{father: game_block});
new Group("char",{father: game_block});

`;

    layers.forEach(layer=> file += this._layerOrganize(layer));

    console.log(file);
    return file;
  }
}
const MANAGER = new SceneManager();
