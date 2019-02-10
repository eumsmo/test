const relatifySpeech = example => `Considerando que as imagens utilizadas pelo Tiled se encontram em um diretório filho do diretório mestre, podemos relativar o endereço das imagens!
Exemplo de endereço: "${example}"
Insira onde se encontra o diretório mestre:
(PS: O endereço ficará salvo como padrão até que você edite novamente)`;

let file_modal = document.querySelector("#settings"),
    file_input = document.querySelector("#file_receiver"),
    file_list = document.querySelector("#settings ul"),
    map_obj = {}, was_relatified = false;


function relatify(name, byPrompt){
  let scene = MANAGER.scenes[name], example ,main_folder;

  for(let image in scene.images){
    if(scene.images[image]!=null){
      example=scene.images[image];
      break;
    }
  }

  main_folder =  byPrompt? window.prompt(relatifySpeech(example),example) : localStorage.getItem("main_folder");
  localStorage.setItem("main_folder",main_folder);

  if(main_folder==null)return;

  for(let id in scene.images) {
    if(scene.images[id]!=null)
      scene.images[id] = scene.images[id].replace(main_folder,"");
    console.log(scene.images[id]);
  }

  was_relatified = true;
}

function download(name){
  if(!was_relatified) relatify(name);

  let file = MANAGER.generateFile(name),
      a = document.createElement('a');

  a.href = "data:text/javascript;charset=utf-8,"+file;
  a.download = name.slice(0,-2);
  a.click();
}

function test_scene(name){
  if(!was_relatified) relatify(name);

  let file = MANAGER.generateFile(name),scene = MANAGER.scenes[name],
      w = scene.width, h = scene.height,
      left = (screen.width/2)-(w/2),
      top = (screen.height/2)-(h/2);

  localStorage.setItem("call_arg",file);
  let newWindow = window.open("index.html",'_blank',`location,width=${w},height=${h},left=${left},top=${top}`);
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

    make_relative.addEventListener("click",()=>relatify(name,true));
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
    scene.images = {};
    scene.tiles_size = {
      width: obj.tilewidth,
      height: obj.tileheight
    };
    scene.width = scene.info.width * scene.tiles_size.width;
    scene.height = scene.info.height * scene.tiles_size.height;

    // Load images
    obj.tilesets.forEach(tset=>{
      let i = tset.firstgid;

      if(tset.tilecount==1)
        scene.images[i] = tset.image;
      else
        for(let gid in tset.tiles)
          scene.images[(Number(gid)+i)+""] = tset.tiles[gid].image;
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
  _genLine(type,details){
    let line = `new ${type}({`;
    for(let d in details){
      line+=d+':';
      if(d=='src') line += 'IMAGES["'+details[d]+'"]';
      else line+=details[d];
      line+=',';
    }
    return line.slice(0,-1) + "});\n";
  }
  _objectOrganize(object,layer){
    let nextLine = "", beforeLine="", details, type;

    details = {
      x: object.x , y: object.y - object.height,
      width: object.width, height: object.height
    };

    if(object.gid) details.src = object.gid;

    if(!object.type){
      if(object.gid)type = "Decoration";
      else{
        type = "InvisibleWall";
        details.y += object.height;
      }

    } else if(object.type){
      type = object.type;
      if(type == "Char") beforeLine = "window.char = ";
    }

    if(object.properties) nextLine+='eventElementInit(aux,'+JSON.stringify(object.properties)+');\n';

    return beforeLine+ ((nextLine!="")? "aux=" + this._genLine(type,details) + nextLine : this._genLine(type,details));
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

    let file = "";

    const header = `// This file needs "scene_func.js" and "Hitbox.js" to work!
// Tiled file converted by "compiler.html"
// All made by "jv_eumsmo" (https://github.com/eumsmo)

window.scene.width = ${scene.width};
window.scene.height = ${scene.height};
`;
    const important = `let aux;
`;

    file = important;
    layers.forEach(layer=> file += this._layerOrganize(layer));

    file = `const IMAGES = ${JSON.stringify(this.actualScene.images,null,'\t')};
window.IMAGES = IMAGES;
` + file;

    file = header + file;

    console.log(file);
    return file;
  }
}
const MANAGER = new SceneManager();
