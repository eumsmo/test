const getFileEl = document.querySelector("#settings");
const fileInput = document.querySelector("#file_receiver");
const gameEl = document.querySelector("#game");

const run_scene = str => {
  getFileEl.remove();
  eval(str);
}

window.scene = {};
Object.defineProperties(window.scene,{
  width:{
    set(val){return gameEl.style.width = val+'px'},
    get(){return gameEl.style.width}
  }, height:{
    set(val){return gameEl.style.height = val+'px'},
    get(){return gameEl.style.height}
  }
});

// Get file by argument
let file = localStorage.getItem("call_arg");
if(file){
  localStorage.removeItem("call_arg");
  run_scene(file);
}


// Get file by input
file_receiver.addEventListener("change",getFileByInput);

function getFileByInput(evt){
  let el = evt.currentTarget, file = el.files[0];
  let reader = new FileReader();

  reader.addEventListener("load",evt=>{
    let str = evt.target.result;
    if(str!=undefined)
      run_scene(str);
  });

  reader.readAsText(file);
}

// Get file by saved
const github_owner = "eumsmo";
const github_repo_name = "test";
const github_path = "src/js_maps";
const github_api = `https://api.github.com/repos/${github_owner}/${github_repo_name}/contents/${github_path}`;
const mapsEl = document.querySelector("#existent_maps");

async function get_maps_github(){
  let obj = await fetch(github_api).then(res=>res.json()),
      maps = {};
  for(let i=0;i<obj.length;i++){
    let link = github_api+'/'+obj[i].name,
        file = await fetch(link).then(res=>res.json()),
        content = atob(file.content);

    maps[file.name] = content;
  }

  console.log(maps);
}
