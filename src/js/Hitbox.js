const SYSTEM = new Collisions(),
      RESULT = new Result(),
      ALL_HITBOXES = {}, GROUPS = {};

let pressedLog = [], lastPressed, main;
const pressedKeys = ()=> Object.keys(pressedLog);
const rand = (min,max) =>Math.floor(Math.random()*(max-min+1)+min);

document.body.addEventListener("keydown",evt=>{
  let k = evt.key;
  lastPressed = k;
  pressedLog[k] = true;
});
document.body.addEventListener("keypress",()=> keyPressed(pressedKeys()));
document.body.addEventListener("keyup",evt=>{
  let k = evt.key;
  delete pressedLog[k];
  keyPressed(pressedKeys())
});
function animationSetup(...args){
  draw(...args);
  window.requestAnimationFrame(animationSetup);
}
window.requestAnimationFrame(animationSetup);

let DISPLAY_SCALE = 1;
const change_scale = scale=> {
  DISPLAY_SCALE = scale;
  for(let h in ALL_HITBOXES) ALL_HITBOXES[h].display();
};
const game_block = document.querySelector("#game");


function everySymbolObj(obj,call){

  Object.getOwnPropertySymbols(obj).forEach(s=>call(obj[s]));
}
const everyHitbox = (call)=> everySymbolObj(ALL_HITBOXES,call);

const CONSTANT_UPDATE = {};
function addConstantUpdate(call){
  let s = Symbol();
  CONSTANT_UPDATE[s] = call;
  return s;
}
function removeConstantUpdate(s){
  return delete CONSTANT_UPDATE[s];
}

function draw(){
  everyHitbox(hitbox=> hitbox.update());
  everySymbolObj(CONSTANT_UPDATE,x=>x());
  SYSTEM.update();
}
function keyPressed(keys){
  let res = [0,0];//[x,y]
  keys.forEach(k=>{
    if(k=='a') res[0]--;
    if(k=='d') res[0]++;
    if(k=='w') res[1]--;
    if(k=='s') res[1]++;
  });

  main.dx = res[0];
  main.dy = res[1];
}

// args: x, y, is, args
class Hitbox{
  constructor(x,y,is,arg){
    if(is=="polygon") this.object = SYSTEM.createPolygon(x,y,arg);
    else if(is=="circle") this.object = SYSTEM.createCircle(x,y,arg);

    this.dx = 0;
    this.dy = 0;
    this.s = 1;

    this.watchedContexts = [];
    this.group = "main";
    this.type = "none";
    this.$id = Symbol();
    this.el;

    this.responses = [];

    this.object.self = this;
    ALL_HITBOXES[this.$id] = this;
  }


    get x(){return this.object.x}
    get y(){return this.object.y}
    set x(val){return this.object.x=val}
    set y(val){return this.object.y=val}

    display(){
      //CONTEXT.strokeStyle = "#008b8b";
      //drawu(()=>this.object.draw(CONTEXT));
      /*
      this.el.style.left = DISPLAY_SCALE*this.x+'px';
      this.el.style.top = DISPLAY_SCALE*this.y+'px';
      this.el.style.height = DISPLAY_SCALE*this.height+'px';
      this.el.style.width = DISPLAY_SCALE*this.width+'px';
      */
    }
    move(){
      this.x += this.s*this.dx;
      this.y += this.s*this.dy;
    }
    collisionResponse(){
      this.x -= RESULT.overlap * RESULT.overlap_x;
      this.y -= RESULT.overlap * RESULT.overlap_y;
    }
    collide(){
      const obj = this.object;
      const potentials = obj.potentials();

      for(const body of potentials) {
          if(this.watchedContexts.includes(body.self.group) && obj.collides(body,RESULT)) {
            for(let res of this.responses) res(RESULT);
            for(let res of body.self.responses) res(RESULT);
            this.collisionResponse(RESULT);
          }
      }
    }
    update(){
      this.move();
      this.collide();
      this.display();
    }
    setCollisionEvent(call){
      this.responses.push(call);
    }
    destroySelf(){
      if(this.el) this.el.remove();
      this.object.remove();
      delete ALL_HITBOXES[this.$id];
    }
}
// args: x, y, w, h
class Box extends Hitbox{
  constructor(x,y,w,h){
    super(x,y,"polygon",[[0,0],[w,0],[w,h],[0,h]]);
  }

  display(){
    this.el.style.width = this.w+"px";
    this.el.style.height = this.h+"px";
    this.el.style.top = this.y+"px";
    this.el.style.left = this.x+"px";
  }
}
// args: x, y, r
class HitC extends Hitbox{
  constructor(x,y,r){
    super(x,y,"circle",r);
    this.el = document.createElement("div");
    this.el.style.position = "fixed";
    this.el.style.border = "1px solid red";
    this.el.style.boxSizing = "border-box";
    this.el.style.borderRadius = "50%";
    this.r = r;
    this.w = r*2;
    this.h = r*2;
    document.body.appendChild(this.el);
  }

  display(){
    super.display();
    this.el.style.width = this.w+"px";
    this.el.style.height = this.h+"px";
    this.el.style.top = (this.y)-this.r+"px";
    this.el.style.left = (this.x)-this.r+"px";
  }
}
// args: x, y, w, h
class Wall extends Box{
  constructor(...args){
    super(...args);

    this.type = "block";
    this.watchedContexts = ['char'];

    this.el = document.createElement('div');
    this.el.classList.add("col");

    game_block.appendChild(this.el);
  }

  collide(){}

  display(){
    super.display();
    this.el.style.left = DISPLAY_SCALE*this.x+'px';
    this.el.style.top = DISPLAY_SCALE*this.y+'px';
    this.el.style.height = DISPLAY_SCALE*this.height+'px';
    this.el.style.width = DISPLAY_SCALE*this.width+'px';
  }
}

// args: x, y, w, h, src
class Sprite extends Box{
  constructor(x,y,w,h,src){
    super(x,y,w,h);

    this.type = "sprite";
    this.watchedContexts = ['char'];

    this.el = new Image(w,h);
    this.el.src = src;
    this.el.classList.add("sprite");

    game_block.appendChild(this.el);
  }

  display(){
    super.display();
    this.el.style.left = DISPLAY_SCALE*this.x+'px';
    this.el.style.top = DISPLAY_SCALE*this.y+'px';
    this.el.style.height = DISPLAY_SCALE*this.height+'px';
    this.el.style.width = DISPLAY_SCALE*this.width+'px';
  }

}
class Decoration extends Sprite{

  constructor(...args){
    super(...args);

    this.group = "decoration";
    this.watchedContexts = [];
  }

  collide(){}

}
class Char extends Sprite{
  constructor(...args){
    super(...args);

    this.group = "char";
    this.type = "char";
    this.watchedContexts = ["main"];
    this.speed = 1.5;

    main = this;
  }
}
class MovableSprite extends Sprite{
  constructor(...args){super(...args)}
  collide(){}
}
