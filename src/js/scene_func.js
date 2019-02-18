let sv_cond_callbacks = {};

let sv = {},
    scene_variables = new Proxy(sv,{
    set(obj, prop, value){
      obj[prop] = value;
      if(!sv_cond_callbacks[prop]) return obj[prop];

      sv_cond_callbacks[prop].forEach(sv_func_caller);

      return obj[prop];
    }, get(t,n){return t[n]}
});

function delay(time){
    return new Promise(resolve=>setTimeout(resolve,time));
}

let sv_func = {
  $this: null, $other: null,
  set(prop,val){scene_variables[prop] = val},
  add(prop,val){
    console.log(this.$other);
    if(scene_variables[prop]!=undefined) scene_variables[prop] +=val;
    else this.set(prop,val);
  },
  fire(func){
    func(this.$this);
  },
  delete(caller = this.$this){
    if(caller) caller.destroySelf();
  },
  async end(){
    if(window.opener){
      let p = window.opener;
      p.child = window;
      await delay(100);
      p.child.close();
    } else {
      await delay(100);
      window.alert("END!");
    }
  },

};

function sv_func_caller(option){
  let [caller,cond,to_fire] = option;
  console.log(option);
  if(eval(cond)){
    sv_func.$this = caller;
    to_fire.forEach(t=> {
      let a = eval(t);
      if(typeof a == "function") a();
    });
    sv_func.$this = null;
  }
}

function eventElementInit(element,obj){
  let prop = obj,
      active_with = (prop.active_with)? [prop.active_with] : ["char"],
      events = [];

  if(!element.type) element.type = "event";
  const parseVariables = line => line.replace(/\${([^}]*)}/g,(a,prop)=>`scene_variables["${prop}"]`);
  const getVariables = line =>{
    let props = {}, arr =[];
    line.replace(/\${([^}]*)}/g,(a,prop)=>props[prop] = true);
    for(let p in props) arr.push(p);
    return arr;
  }

  const functionExp = /\$[^\(]*(\([^\)]*\))/g;
  function parseFunction(str){
    let params = [];
    str.replace(/\$[^\(]*(\([^\)]*\))/,(a,prop)=>{
      params.push(...prop.slice(1,-1).split(','));
    });
    str = str.replace(/\([^\)]*\)/g,"");
    str = `sv_func["${str.slice(1)}"](${params.join(',')})`;
    return str;
  }

  const ncFunctionExp = /\$([^\,\=\)\(\s]*)/g;
  const parseNCFunction = str => str.replace(ncFunctionExp,(a,prop)=>`sv_func["${prop}"]`);

  for (let p in prop){
    let op = p, arg = prop[p]+'', aux;
    if(p.startsWith("#")) aux = getVariables(p);

    p = parseVariables(p);
    arg = parseVariables(arg);
    arg = parseNCFunction(arg);

    while(functionExp.test(p)) p = p.replace(functionExp,parseFunction);
    while(functionExp.test(arg)) arg = arg.replace(functionExp,parseFunction);
    if(op.startsWith("${")){}
    else if(op.startsWith("$")){ //Starts with function
      p = p.endsWith(')')? p.slice(0,-1) : p+'(';
      p += (p.endsWith('(')? '': ',') +arg+')';

      while(functionExp.test(p)) p = p.replace(functionExp,parseFunction);
      p= parseNCFunction(p);

      events.push(p);
    }
    else if(op.startsWith("#")){ // Starts with a comparison
      p= parseNCFunction(p).slice(1);
      let params = [element,p,arg.split(',')];

      if(p==''){
        params[1]='true';
        return sv_func_caller(params);
      }

      for(let pp of aux) {
        if(sv_cond_callbacks[pp]) sv_cond_callbacks[pp].push(params.slice());
        else sv_cond_callbacks[pp] = [params.slice()];
      }

      console.log(params);
    }
  }

  if(events.length!=0){
    element.setGroup("main");
    function whenActive(details,el,events){
      console.log(details,events);
      events.forEach(evt=> {
        sv_func.$other = details.o;
        sv_func.$this = el;
        eval(evt);
        sv_func.$this = sv_func.$other = null;
      });
    }
    console.log(events);
    active_with.forEach(type=>{
      element.setCollisionEvent(type,details=>whenActive(details,element,events));
    });
  }
}

function setSceneFunction(name,callback){
  if(sv_func[name]!=undefined) return new Error("SceneVariablesFunction named "+name+" already exists!");
  sv_func[name] = callback;
}

setSceneFunction("constWalk",function(d){
  let dir = {"down":[0,1]}, el = this.$this;
  el.setDir(...dir[d]);
  return MainCE.insert(el.move.bind(el));
});

const mod = x=>x>=0?x:-x;
const dist = (x1,x2)=> mod(x1-x2)>mod(x2-x1)? x1-x2:x2-x1;
const dist4 = (x1,y1,x2,y2)=>{

};

setSceneFunction("setTrack",function(trackName){
  let track = TRACKS[trackName], el = this.$this;
  el.speed = 0.5;
  moveTrack(el,track,0);
});

const roundD = (floatNum,casas) => parseFloat(floatNum.toFixed(casas));
const nmod = num=> num>=0? -num:num;

function moveTrack(el,track,currentTrack){
  let ct = track[currentTrack], nn = currentTrack+1==track.length? 0:currentTrack+1,
  nt = track[nn];

  let distx = nt.x-ct.x, nx = roundD(el.x+distx,2),
      disty = nt.y-ct.y, ny = roundD(el.y+disty,2),
      dx,dy;

  if(mod(distx)>mod(disty)){
    dx=1;
    dy=disty/distx;
  } else if(mod(distx)<mod(disty)){
    dy=1;
    dx=distx/disty;
  } else if(distx==disty&&distx==0){
    return moveTrack(el,track,currentTrack+1==track.length? 0:currentTrack+1);
  } else {
    dy=disty/distx;
    dx=distx/disty;
  }

  dx=(distx>=0)?mod(dx):nmod(dx);
  dy=(disty>=0)?mod(dy):nmod(dy);

  el.setDir(dx,dy);

/*
  console.log("current_i: ",currentTrack);
  console.log("track: ",nt.x,nt.y);
  console.log("dists: ",distx,disty);
  console.log(dx,dy,'-',nx,ny);
*/

  let h = setInterval(()=>{
    el.move();
    //console.log(el.x,nx,'-',el.y,ny);
    if(roundD(el.x,2)==nx && roundD(el.y,2)==ny){
      clearInterval(h);
      moveTrack(el,track,currentTrack+1==track.length? 0:currentTrack+1);
    }
  },CE);
}
