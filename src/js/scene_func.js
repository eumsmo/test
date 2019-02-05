let sv_cond_callbacks = {};

let sv = {},
    scene_variables = new Proxy(sv,{
    set(obj, prop, value){
      obj[prop] = value;
      if(!sv_cond_callbacks[prop]) return obj[prop];

      sv_cond_callbacks[prop].forEach(option=>{
        let [caller,cond,to_fire] = option;
        if(eval(cond)){
          sv_func.$this = caller;
          to_fire.forEach(t=> sv_func.fire(eval(t)));
          sv_func.$this = null;
        }
      });

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
  }
};

function eventElementInit(element,obj){
  let prop = obj,
      active_with = (prop.active_with)? [prop.active_with] : ["char"],
      events = [];

  element.type = "event";
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

  const ncFunctionExp = /\$([^\,\=\)\s]*)/g;
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
