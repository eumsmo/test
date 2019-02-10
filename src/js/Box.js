/* THIS CODE ISN'T UP TO DATE AND WILL BE REMOVED SOON */
/* LOOK UP TO "Hitbox.js" FOR THE UPDATED FILE! */

class Teclado {
  constructor(){
    this.pressedKeys = {
      up: false,
      left: false,
      down: false,
      right: false
    };
    this.keys = {
      up: ["w","W","ArrowUp"],
      left: ["a","A","ArrowLeft"],
      down: ["s","S","ArrowDown"],
      right: ["d","D","ArrowRight"]
    };
    this.chars = [];
    this._updTime = 1000;

    document.addEventListener("keydown",evt=>this._pressed(evt.key));
    document.addEventListener("keyup",evt=>this._unpressed(evt.key));

    this.ups = 1000;
    this._updatePressed();
  }

  set ups(times){
    this._updTime = 1000/times; // 1 Sec = 1000 mil
  }

  get ups(){ // x = 1000/y
    return 1000/this._updTime;
  }

  _updatePressed(){
    if(this.isKeyPress())
      this.chars.forEach(char=>char.move());

    setTimeout(()=> this._updatePressed(),this._updTime);
  }

  _keyIs(pKey){
    for( let direction in this.keys){
      let dKeys = this.keys[direction];
      for(let key of dKeys){
        if(pKey==key)
          return direction;
      }
    }

    return null;
  }

  _pressed(key){
    let direction = this._keyIs(key);

    switch (direction) {
      case "up":
        this._setDir(undefined,-1);
        break;
      case "left":
        this._setDir(-1,undefined);
        break;
      case "down":
        this._setDir(undefined,1);
        break;
      case "right":
        this._setDir(1,undefined);
        break;

    }

    if(direction!=null)
      this.pressedKeys[direction] = true;


    this._callback(key);

  }

  _unpressed(key){
    let direction = this._keyIs(key);

    switch (direction) {
      case "up":
        if(!this.isKeyPress("down"))
          this._setDir(undefined,0);
        break;
      case "down":
        if(!this.isKeyPress("up"))
          this._setDir(undefined,0);
        break;
      case "left":
        if(!this.isKeyPress("right"))
          this._setDir(0,undefined);
          break;
      case "right":
        if(!this.isKeyPress("left"))
          this._setDir(0,undefined);
        break;

    }

    if(direction!=null)
      this.pressedKeys[direction] = false;

  }

  _setDir(dx,dy){
    this.chars.forEach(char=>char.setDir(dx,dy));
  }

  _callback(key){
    this.chars.forEach(char=>{
      if(char.keyPressed) char.keyPressed(key);
    })
  }

  isKeyPress(key){
    if(key==undefined){
      let anyPressed = false;
      for( let direction in this.pressedKeys){
        if(this.isKeyPress(direction))
          anyPressed=true;
      }
      return anyPressed;
    } else {
      return this.pressedKeys[key];
    }
  }
}
let Groups = {}, Societies = {};
class Subscribe{
  constructor(){
    this.in = [];
  }

  _insert(el,index){
    this.in[index] = el;
    return index;
  }

  insert(el){
    let i;
    for(i=0;i<this.in.length;i++)
      if(this.in[i]==null) return this._insert(el,i);
    return this._insert(el,i);
  }

  remove(i){

    this.in[i] = null;
    return this.in[i];
  }

}
class Group extends Subscribe{
  constructor(nome, details={}){
    super();
    this.name = nome;
    this.father = details.father;
    Groups[this.name] = this;

  }

  _insert(el,index){
    if(this.father && el.canChangeFather && el.el.parentElement != this.father){
      el.el.remove();
      this.father.appendChild(el.el);
    }

    el.index = super._insert(el,index);
    el.group = this.name;
    el.id = el.group+'-'+el.index;
  }

  remove(i){
    let el = this.in[i];
    /*if(this.father && el.el.parentElement == this.father)
      el.el.remove();*/
    el.group = undefined;
    el.index = undefined;
    el.id = "";
    super.remove(i);
  }
}
const Observer = new MutationObserver((mutations)=>{
  mutations.forEach(mutation=> {
    if(mutation.type == "attributes"){
      let box = mutation.target.ptr;
      if(box && box.handleMove && box.positionUpdate){
        mutation.target.ptr.handleMove();
      }

    }

  });
});
const RO = new ResizeObserver(entries => {
  for (let entry of entries) {
    let box = entry.target.ptr;
    if(box && box.handleMove && box.resizeUpdate)
    entry.target.ptr.handleMove();
  }
});

const removePX = str=> Number(str.slice(0,-2));
let ALL_HITBOXES = [];

class DOM_Hitbox{
  constructor(el){
    if(!el.parentElement) document.body.appendChild(el);
    this.el = el;
    this.el.ptr = this;
    this.canChangeFather = true;

    RO.observe(this.el);
    this.resizeUpdate = true;
    Observer.observe(this.el,{
      attributes: true,
      attributeFilter: ["style"]
    });
    this.positionUpdate = true;

    this.watchedContexts = ["main"];
    this.lx = this.x;
    this.ly = this.y;
    this.type = "none";

    this._x = 0;
    this._y = 0;

    ALL_HITBOXES.push(this);
  }

  _willChange(...args){
    console.log(args);
  }

/*
  get rect(){return this.el.getBoundingClientRect()}
  get width(){return this.rect.width}
  get height(){return this.rect.height}
  get x(){return this.rect.x}
  get y(){return this.rect.y}
*/

  get rect(){return this.el.getBoundingClientRect()}
  get width(){return this.rect.width}
  get height(){return this.rect.height}
  get x(){return this.el.offsetLeft}
  get y(){return this.el.offsetTop}
  /*
  get x(){return parseFloat(this.el.style.left)}
  get y(){return parseFloat(this.el.style.top)}
  */


  set width(val){ return this.el.style.width = val+'px'}
  set height(val){ return this.el.style.height = val+'px'}
  set x(val){
    return this.el.style.left = val+'px'
  }
  set y(val){
    return this.el.style.top = val+'px'
}

  setGroup(name){
    if(this.group) Groups[this.group].remove(this.index);
    Groups[name].insert(this);
  }
  destroySelf(){
    Groups[this.group].remove(this.index);
    this.el.remove();
  }

  isOverlapingOther(other){
    return !(this.x+this.width < other.x || this.x > other.x+other.width ||
          this.y + this.height < other.y || this.y > other.y + other.height);
  }
  isItself(other){
    return this.id == other.id;
  }
  isOverlapingGroup(groupName,callback){
    let groupItens = Groups[groupName].in;
    for(let el of groupItens){
      if(el && !this.isItself(el) && this.isOverlapingOther(el))
        callback(el);
    }

    return false;
  }
  isOverlaping(callback){
    for(let group of this.watchedContexts){
      let r = this.isOverlapingGroup(group,callback);
      //if(r!=false) return r;
    }
  }

  _handleMove(vorh,coef){
    this.isOverlaping(overlap =>{
      if(this["collision_with_"+overlap.type])
        this["collision_with_"+overlap.type]({o: overlap, d: vorh, t: this, c: coef});
      if(overlap["collision_with_"+this.type])
        overlap["collision_with_"+this.type]({o: this, d: vorh, t: overlap, c: -coef});
    });
  }

  setCollisionEvent(collisionWith,call){
    return this["collision_with_"+collisionWith] = call;
  }

  handleMove(){

    if(this.lx!=this.x){
      this._handleMove('h',this.x-this.lx);
      this.lx = this.x;
    }
    else if(this.ly!=this.y){
      this._handleMove('v',this.y-this.ly);
      this.ly = this.y;
    }
  }

  static selectTransform(slc,call){
    let allElsMatch = document.querySelectorAll(slc), arr = [];
    allElsMatch.forEach(el=>{
      let block = new DOM_Hitbox(el);
      if(call)call(block);
      arr.push(block);
    });

    return arr;
  }
}

class TransHitbox extends DOM_Hitbox{
  constructor(el){
    super(el);
    this.time = 0.01; //segundos por movimento
    this.positionUpdate = true;
    this._transitionisRunning=false;
    this.el.addEventListener("transitionend",()=>this._transitionisRunning=false);
  }

  _setTime(old,novo){
    let dist = old-novo, tempo;
    dist = dist<0? -dist:dist;
    tempo = dist*this.time;
    this.el.style.transitionDuration = tempo+'s';
    this._transitionisRunning = true;
    this._transitionRunningUpdate(this.time*1000);
  }

  _transitionRunningUpdate(every){
    if(this._transitionisRunning){
      this.handleMove();
      setTimeout(()=>this._transitionRunningUpdate(),every);
    }
  }

  set x(val){
    this._setTime(this.x,val);
    super.x=val;
  }

  get x(){return super.x}

  set y(val){
    this._setTime(this.y,val);
    super.y=val;
  }
  get y(){return super.y}
}

class Sprite extends DOM_Hitbox{
  constructor(details={}){
    let holder = document.createElement("figure"),
        img = document.createElement("img");

    holder.appendChild(img);
    holder.classList.add("sprite");

    super(holder);
    if(details.src) img.src = details.src;
    if(details.width!=undefined) this.width = details.width;
    if(details.height!=undefined) this.height = details.height;
    if(details.x!=undefined) this.x = details.x;
    if(details.y!=undefined) this.y = details.y;

    this.type = "sprite";

  }

  collision_with_sprite(details){
    let {t,o,d} = details;
    console.log(t,o,d);
  }
}
class TranSprite extends TransHitbox{
  constructor(details={}){
    let holder = document.createElement("figure"),
        img = document.createElement("img");
    holder.appendChild(img);
    holder.classList.add("sprite");

    super(holder);
    if(details.src) img.src = details.src;
    if(details.width!=undefined) this.width = details.width;
    if(details.height!=undefined) this.height = details.height;
    if(details.x!=undefined) this.x = details.x;
    if(details.y!=undefined) this.y = details.y;

    this.type = "sprite";
    this.setGroup('main');
    this.watchedContexts = ["main"];

  }

  collision_with_sprite(details){
    let {t,o,d} = details;
    console.log(t,o,d);
  }
}

class Char extends Sprite{
  constructor(...args){
    super(...args);
    this.type = "char";

    this.dx = 0;
    this.dy = 0;
    this.speed = 1;

    this.positionUpdate=false;

    this.setGroup("char");
  }

  setDir(dx,dy){
    if(dx!=undefined)this.dx = dx;
    if(dy!=undefined)this.dy = dy;
  }

  move(){
    this.x+=this.speed*this.dx;
    this.handleMove();
    this.y+=this.speed*this.dy;
    this.handleMove();

  }

  collision_with_sprite({t,o,d,c}){
    console.log(t,o,d,c);
    if(d=="v"){
      if(c<0)t.y = o.y+o.height;
      else if(c>0)t.y = o.y-t.height;
    }
    if(d=="h"){
      if(c<0)t.x = o.x+o.width;
      else if(c>0)t.x = o.x-t.width;
    }
  }

  collision_with_block(details){return this.collision_with_sprite(details)}
}

class Projetil extends Sprite {
  constructor(d){
    super(d);
    this.el.classList.add("projetil");
    this.setGroup('main');
    this.time = 0.01; //segundos por movimento
    this.positionUpdate = true;
    this.watchedContexts = ["main"];
    this._transitionisRunning=false;
    this.el.addEventListener("transitionend",()=>this._transitionisRunning=false);
  }

  _setTime(old,novo){
    let dist = old-novo, tempo;
    dist = dist<0? -dist:dist;
    tempo = dist*this.time;
    this.el.style.transitionDuration = tempo+'s';
    this._transitionisRunning = true;
    this._transitionRunningUpdate(this.time*1000);
  }

  _transitionRunningUpdate(every){
    if(this._transitionisRunning){
      this.handleMove();
      setTimeout(()=>this._transitionRunningUpdate(),every);
    }
  }

/*
  collision_with_char({t,o,d}){
      console.log(o,d);
  }
*/

  handleMove(){
    super.handleMove();
  }
  set x(val){
    this._setTime(this.x,val);
    super.x=val;
  }

  get x(){return super.x}

  set y(val){
    this._setTime(this.y,val);
    super.y=val;
  }
  get y(){return super.y}
//this.el.style.transitionDuration = val+'s';
}

class Father extends TransHitbox{
  constructor(name,el){
    super(el);
    this.watchedContexts = [];
    this.name = name;
    this.el.classList.add("group");
    this.type = "group";
  }

  childrenSpec(el){
      el.el.style.position = "static";
  }

  insert(el){
    this.el.appendChild(el.el);
    el.el.style.position = "static";

    //Object.defineProperties(el,this.novas);
  }

  remove(el){
    //super.remove(el._$proxyId);
    el.el.remove();
  }

}


// Tiled_Manager Classes
class InvisibleWall extends DOM_Hitbox{
  constructor(details){
    let div = document.createElement('div');
    super(div);

    this.type = "block";
    this.setGroup("main");
    this.watchedContexts = ['char'];
    div.classList.add("col");

    if(details.width!=undefined) this.width = details.width;
    if(details.height!=undefined) this.height = details.height;
    if(details.x!=undefined) this.x = details.x;
    if(details.y!=undefined) this.y = details.y;
  }
}
class Decoration extends Sprite{
  constructor(details){
    super(details);
    this.setGroup('decoration');
    this.watchedContexts = [];
  }
}
