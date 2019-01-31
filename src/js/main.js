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
