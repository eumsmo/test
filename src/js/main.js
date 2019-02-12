// File needs Hitbox.js
const getFileEl = document.querySelector("#settings");
const fileInput = document.querySelector("#file_receiver");
const gameEl = document.querySelector("#game");
const mapsEl = document.querySelector("#existent_maps");

let game_running = false;
const run_scene = str => {
  getFileEl.remove();
  mapsEl.remove();
  eval(str);
  game_running = true;
  resize_scene();
}

let game_size = {};
window.scene = {};
Object.defineProperties(window.scene,{
  width:{
    set(val){
      game_size.width = val;
      return gameEl.style.width = val+'px';
    },
    get(){return gameEl.style.width}
  }, height:{
    set(val){
      game_size.height = val;
      return gameEl.style.height = val+'px';
    },
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
  if(!game_running)return;
  let dw = window.screen.width, dh = window.screen.height,
      ww = window.innerWidth, wh = window.innerHeight,
      w,h, pw, ph, perc;

  w = (dw>ww)? ww : dw;
  h = (dh>wh)? wh : dh;

  pw = w/parseFloat(window.scene.width);
  ph = h/parseFloat(window.scene.height);

  console.log(pw,ph);

  perc = pw<ph? pw : ph;
  perc = perc>1? 1: perc;
  console.log("scale("+perc+")");
  change_scale(perc);

  gameEl.style.width = game_size.width*perc+'px';
  gameEl.style.height = game_size.height*perc+'px';

}
//window.addEventListener("resize",resize_scene);

/* Mobile Section */
const mod = num=>num>=0?num:-num;
let sx,sy, dir=[], touchRunning = false,
    fsEl = document.querySelector("#toFullscreen"),
    touchEl = document.querySelector("#touch_visual"), touchSize = 35,
    mTouchEl = document.querySelector("#moving_touch"), mTouchSize = 25;
document.addEventListener("touchstart",e=>{

  let t = e.touches[0], offset = touchSize/2;
  sx = t.pageX;
  sy = t.pageY;
  console.log(sx,sy);

  touchEl.style.left = mTouchEl.style.left = sx-offset+'px';
  touchEl.style.top = mTouchEl.style.top = sy-offset+'px';
  touchEl.classList.remove("dnone");
  mTouchEl.classList.remove("dnone");

  touchRunning = true;
  if(game_running)
  touchMove();
})
document.addEventListener("touchmove",e=>{
  let t = e.touches[0], offset = mTouchSize/2;
  let x = t.pageX, y = t.pageY;

  if(mod(x-sx)>offset) dir[0] = x-sx>0? 1:-1;
  else dir[0] = 0;
  if(mod(y-sy)>offset) dir[1] = y-sy>0? 1:-1;
  else dir[1] = 0;

  if(game_running) char.setDir(...dir);

  mTouchEl.style.left = x-offset+'px';
  mTouchEl.style.top = y-offset+'px';
});
document.addEventListener("touchend",()=>{

  touchEl.classList.add("dnone");
  mTouchEl.classList.add("dnone");
  touchRunning = false;
});
function touchMove(){
  if(dir.length>0)
  char.setDir(...dir);

  if(touchRunning)
  setTimeout(()=> touchMove(),CE);
}

if(navigator.maxTouchPoints>0){
  fsEl.classList.remove("dnone");
  fsEl.addEventListener('click',()=>document.body.requestFullscreen());
}
