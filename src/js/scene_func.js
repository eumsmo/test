let sv_cond_callbacks = {};

let sv = {},
    scene_variables = new Proxy(sv,{
    set(obj, prop, value){
      obj[prop] = value;
      if(!sv_cond_callbacks[prop]) return obj[prop];

      sv_cond_callbacks[prop].forEach(option=>{
        let [caller,cond,to_fire] = option;
        if(eval(cond))
          sv_func.fire(caller,to_fire);
      });

      return obj[prop];
    }, get(t,n){return t[n]}
});

let sv_func = {
  set(caller,prop,val){scene_variables[prop] = val},
  add(caller,prop,val){
    if(scene_variables[prop]!=undefined) scene_variables[prop] +=val;
    else this.set(caller,prop,val);
  },
  fire(caller,res_name){
    if(res_name=="delete") caller.destroySelf();
  }
};

function eventElementInit(element,obj){
  const breakIntoArgs = (obj,prop)=> {
    let arr = prop.slice(1).split('_');
    arr.push(obj[prop]);
    return arr;
  };
  let prop = obj,
      active_with = (prop.active_with)? [prop.active_with] : ["char"],
      events = [];

  element.setGroup("main");
  element.type = "event";

  for (let p in prop){
    if(p.startsWith("$")){
      let args = breakIntoArgs(prop,p);
      args = args.map(arg=> isNaN(arg)? arg: Number(arg));
      events.push(args);
    } else if(p.startsWith("#")){
      let args = breakIntoArgs(prop,p), props = {};
      args[0] = args[0].replace(/\${([^}]*)}/g,(a,prop)=>{
        props[prop] = true;
        return `scene_variables["${prop}"]`;
      });

      let params = [element,args[0],args[1]];
      for(let pp in props) {
        if(sv_cond_callbacks[pp])
          sv_cond_callbacks[pp].push(params.slice());
        else sv_cond_callbacks[pp] = [params.slice()];
      }

      console.log(args);
    }
  }

  function whenActive(el,events){
    events.forEach(evt=> sv_func[evt[0]](el,...evt.slice(1)) );
  }

  active_with.forEach(type=>{
    element.setCollisionEvent(type,()=>{
      whenActive(element,events);
    });
  });
}
