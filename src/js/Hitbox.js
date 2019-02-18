const CE = 10;
class Subscribe{
  constructor(name){
    this.in = [];
    this.name = name;
  }

  _insert(el,index){
    this.in[index] = el;
    el["subscribed_"+this.name+"_id"] = index;
    el["unsubscribe_"+this.name] = ()=> this.remove(index);
    return index;
  }

  insert(el){
    let i;
    for(i=0;i<this.in.length;i++)
      if(this.in[i]==null) return this._insert(el,i);
    return this._insert(el,i);
  }

  remove(i){return (this.in[i] = null)}

  each(callback){
    for(let el of this.in)
      if(el!=null) callback(el);
  }
}

class CEManager extends Subscribe{
  constructor(){
    super("CEAffected");
    this.ce = CE;
    this._updateSubs();
  }

  _updateSubs(){
    this.each(function(sub){sub()});
    setTimeout(()=> this._updateSubs(),this.ce);
  }
}
const MainCE = new CEManager();

class Teclado extends Subscribe{
  constructor(){
    super("keyboard");
    this.pressedKeys = {};
    document.addEventListener("keydown",evt=>this._pressed(evt.key));
    document.addEventListener("keyup",evt=>this._unpressed(evt.key));
    document.addEventListener("onfocusout",evt=>this._unpressed());

    MainCE.insert(this._updateSubs.bind(this));
  }
  _pressed(key){
    this.pressedKeys[key] = true;
  }
  _unpressed(key){
    if(key!=undefined) delete this.pressedKeys[key];
    else for(let key in this.pressedKeys) delete this.pressedKeys[key];
  }

  _updateSubs(){
    let keys = Object.keys(this.pressedKeys);
    this.each(sub=>sub.keyPressed(keys));
  }

}
const Keyboard = new Teclado();

class GroupsManager{
  constructor(){
    this.groups = {};
  }

  create(name){
    this.groups[name] = new Subscribe("group_"+name);
    return this.groups[name];
  }
  get(name){return this.groups[name].in}
  add(name,el){
    if(this.groups[name]){
      el.group = name;
      return this.groups[name].insert(el);
    }
  }
}
const GROUPS = new GroupsManager();
GROUPS.create("decoration");
GROUPS.create("main");
GROUPS.create("char");


let DISPLAY_SCALE = 1;
let HITBOXES_last_id = 0;
const ALL_HITBOXES = {};
class Hitbox{
  constructor(o){
    this.x = o.x || 0;
    this.y = o.y || 0;
    this.width = o.width || 0;
    this.height = o.height || 0;

    this.lx = 0;
    this.ly = 0;
    this.watchedContexts = [];

    this.type = "none";
    this.el;
    this.$hitbox_id = HITBOXES_last_id;
    ALL_HITBOXES[this.$hitbox_id] = this;
    HITBOXES_last_id++;
  }

  display(){
    this.el.style.left = DISPLAY_SCALE*this.x+'px';
    this.el.style.top = DISPLAY_SCALE*this.y+'px';
    this.el.style.height = DISPLAY_SCALE*this.height+'px';
    this.el.style.width = DISPLAY_SCALE*this.width+'px';
  }
  setDisplay(el){
    this.el = el;
    this.display();
  }

  update(){
    this.handleMove();
    this.display();
  }

  // Collsion Stuff
  isOverH(o){
    let reg = this.y+this.height>o.y && this.y<o.y+o.height,
        a = this.x<o.x&&this.x+this.width>o.x,
        b = this.x<o.x+o.width&&this.x+this.width>o.x+o.width;

    return reg&&a || reg&&b;
  } //is overlapping verticaly
  isOverV(o){
    let reg = this.x+this.width>o.x && this.x<o.x+o.width,
        a = this.y<o.y&&this.y+this.height>o.y,
        b = this.y<o.y+o.height&&this.y+this.height>o.y+o.height;

    return reg&&a || reg&&b;
  }// is overlapping horizontaly

  isOverlapingOther(other,vorh){

    return vorh=='h'? this.isOverH(other) : this.isOverV(other);
  }
  isItself(other){
    return this.$hitbox_id == other.$hitbox_id;
  }
  isOverlapingGroup(groupName,vorh,callback){
    let groupItens = GROUPS.get(groupName);
    for(let el of groupItens)
      if(el && !this.isItself(el) && this.isOverlapingOther(el,vorh))
        callback(el);
  }
  isOverlaping(vorh,callback){
    for(let group of this.watchedContexts)
      this.isOverlapingGroup(group,vorh,callback);
  }
  _handleMove(vorh,coef){
    this.isOverlaping(vorh,o =>{
      if(this["collision_with_"+o.type])
        this["collision_with_"+o.type]({o: o, d: vorh, t: this, c: coef});
      if(o["collision_with_"+this.type])
        o["collision_with_"+this.type]({o: this, d: vorh, t: o, c: -coef});
    });
  }
  setCollisionEvent(collisionWith,call){
    return this["collision_with_"+collisionWith] = call;
  }
  handleMove(dir){

    if(this.x!=this.lx){
      this._handleMove('h',this.x-this.lx);
      this.lx = this.x;
    }
    else if(this.y!=this.ly){
      this._handleMove('v',this.y-this.ly);
      this.ly = this.y;
    }
  }

  // Group Stuff
  setGroup(name){
    if(this.group) this["unsubscribe_group_"+this.group]();
    GROUPS.add(name,this);
  }
  destroySelf(){
    for(let prop in this)
      if(prop.startsWith("unsubscribe_")) this[prop]();
    delete ALL_HITBOXES[this.$hitbox_id];
    this.el.remove();
  }
}
const change_scale = scale=> {
  DISPLAY_SCALE = scale;
  for(let h in ALL_HITBOXES) ALL_HITBOXES[h].display();
};

const game_block = document.querySelector("#game");
class Sprite extends Hitbox{
  constructor(o){
    super(o); // x, y, width, height
    let img = new Image(o.width,o.height);
    img.src = o.src;
    img.classList.add("sprite");
    this.setDisplay(img);
    game_block.appendChild(img);

    this.type = "sprite";
  }
}
class MovableSprite extends Sprite{
  constructor(o){
    super(o);

    this.dx = 0;
    this.dy = 0;
    this.speed = 1;
    this.watchedContexts = ['char'];

    this.setGroup("main");
  }

  setDir(x,y){
    this.dx = x;
    this.dy = y;
    this.move();
  }
  move(){
    this.x += this.speed*this.dx;
    this.update();
    this.y += this.speed*this.dy;
    this.update();
  }
}
class Char extends MovableSprite{
  constructor(o){
    super(o);

    this.speed = 1.5;
    this.watchedContexts = ["main"];
    this.type = "char";
    this.setGroup("char");
    Keyboard.insert(this);
  }

  _keyTranslate(key){
    let controls = {
      up: ["w","W","ArrowUp"],
      left: ["a","A","ArrowLeft"],
      down: ["s","S","ArrowDown"],
      right: ["d","D","ArrowRight"]
    };

    for(let d in controls)
      for(let k of controls[d])
        if(k==key) return d;
    return null;
  }
  keyPressed(keys){
    let directions = keys.map(k=>this._keyTranslate(k));
    let dx=0, dy=0;
    directions.forEach(d=>{
      if(d=='left') dx--;
      else if(d=='right') dx++;
      else if(d=='up') dy--;
      else if(d=='down') dy++;
    });

    this.setDir(dx,dy);
  }

  collision_with_sprite({t,o,d,c}){
    console.log(t,o,d,c);
    if(d=="v"){
      if(c<0)t.y = o.y+o.height;
      else if(c>0)t.y = o.y-t.height;
    }
    else if(d=="h"){
      if(c<0)t.x = o.x+o.width;
      else if(c>0)t.x = o.x-t.width;
    }
  }

  collision_with_block(details){return this.collision_with_sprite(details)}

}

// Tiled_Manager Classes
class InvisibleWall extends Hitbox{
  constructor(details){
    super(details);
    let div = document.createElement('div');
    this.setDisplay(div);

    this.type = "block";
    this.setGroup("main");
    this.watchedContexts = ['char'];
    div.classList.add("col");
    game_block.appendChild(div);
  }
}
class Decoration extends Sprite{
  constructor(details){
    super(details);
    this.setGroup('decoration');
    this.watchedContexts = [];
  }
}
