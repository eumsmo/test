const getFileEl = document.querySelector("#settings");
const fileInput = document.querySelector("#file_receiver");
const gameEl = document.querySelector("#game");
const mapsEl = document.querySelector("#existent_maps");

const run_scene = str => {
  getFileEl.remove();
  mapsEl.remove();
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



/* --- GET FILE SECTION --- */

// Get file by input
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

// Get file by Github
const github_owner = "eumsmo";
const github_repo_name = "test";
const github_path = "src/js_maps";
const github_api = `https://api.github.com/repos/${github_owner}/${github_repo_name}/contents/${github_path}`;
let githubMaps = {};
async function get_maps_github(){
  let obj = await fetch(github_api).then(res=>res.json());
  for(let i=0;i<obj.length;i++){
    let link = github_api+'/'+obj[i].name,
        file = await fetch(link).then(res=>res.json()),
        content = atob(file.content);


    githubMaps[file.name] = content;
  }
  generate_github_maps_el();
}
function generate_github_maps_el(){
  let listEl = mapsEl.querySelector("ul");
  for(let name in githubMaps) {
    let li = document.createElement('li'),
        a = document.createElement('a');

    a.href = "#"+name;
    a.innerHTML = name;
    a.addEventListener("click",()=>run_scene(githubMaps[name]));

    li.appendChild(a);
    listEl.appendChild(li);
  }
}

// Get file by everything
function getFile(){

  // Get file by argument
  let file = localStorage.getItem("call_arg");
  if(file){
    localStorage.removeItem("call_arg");
    return run_scene(file);
  }

  // Get file by input
  file_receiver.addEventListener("change",getFileByInput);

  // Get file by Github
  get_maps_github();
}

getFile();



/* --- HELLO WORLD --- */

function resize_scene(){
  let dw = window.screen.width, dh = window.screen.height,
      ww = window.innerWidth, wh = window.innerHeight,
      w,h, pw, ph, perc;

  w = (dw>ww)? ww : dw;
  h = (dh>wh)? wh : dh;

  pw = 100*w/parseFloat(window.scene.width);
  ph = 100*h/parseFloat(window.scene.height);

  console.log(pw,ph);

  perc = pw<ph? pw : ph;
  perc = perc>100? 100: perc;


  ALL_HITBOXES.forEach(e=>{
    e.width = e.width/100*perc;
    e.height = e.height/100*perc;
	  e.x = e.x/100*perc;
	  e.y = e.y/100*perc;
  });

  gameEl.style.height = parseFloat(gameEl.style.height)/100 * perc + 'px';
  gameEl.style.width = parseFloat(gameEl.style.width)/100 * perc + 'px';
}
