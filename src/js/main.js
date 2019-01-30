const getFileEl = document.querySelector("#settings");
const fileInput = document.querySelector("#file_receiver");
const gameEl = document.querySelector("#game");

const run_scene = str => {
  getFileEl.remove();
  eval(str);
}

window.scene = {}


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


//Game temporary adjustment
const toArray = thing => Array.prototype.slice.apply(thing);

// NOT WORKING GRR
/*
function temp_adjust(){
  let beAdjust = toArray(document.querySelectorAll("figure"));
  let x = gameEl.offsetLeft, y = gameEl.offsetTop;
  beAdjust.push(...toArray(document.querySelectorAll(".col")));

  beAdjust.forEach(el=> el.style.transform = `translate(${x}px,${y}px)`);
}

window.addEventListener("resize",temp_adjust);
*/
