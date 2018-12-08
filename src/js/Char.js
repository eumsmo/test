class Movable extends DOM_Hitbox{
  constructor(x,y,options){
    let figure = document.createElement("figure");
    super(figure);
    //this.type="char";

    this.x = x;
    this.y = y;
    this.width = options.width || 75;
    this.height = options.height || 75;
    this.dx = 0;
    this.dy = 0;
    this.speed = 1;
    this.looker = false;

    this.allImg = options.imgs || {};
    this.actual_img = this.allImg.default || null;

    this.img = new Image();
    this.img.src = this.actual_img;
    this.el.appendChild(this.img);
    document.body.appendChild(this.el);
  }

  setDir(dx,dy){
    if(dx!=undefined) this.dx=dx;
    if(dy!=undefined) this.dy=dy;
  }

  _handleOverlap(other,dir){

    let func = this["$"+other.type];
    let details = {
      trigger: this.type,
      direction: dir,
      [this.type]: this,
      [other.type]: other
    };
    //console.log(func);
    if(func) func.bind(this)(other,details);
  }

  move(){
    //let cx = this.x, xy = this.y;
    this.x+=this.speed*this.dx;
    if(this.looker){
      let overlap = this.isOverlaping();
      if(overlap) this._handleOverlap(overlap,"h");
    }

    this.y+=this.speed*this.dy;
    if(this.looker){
      let overlap = this.isOverlaping();
      if(overlap) this._handleOverlap(overlap,"v");
    }

  }

  dirControl(what){
    what.chars.push(this);
  }
}
Movable.overlapTypes = {};

class Personagem extends Movable{
  constructor(x,y,options){
    super(x,y,options);
    this.type= "char";
    this.looker = true;
    this.watchedContexts = ["block","projeteis"];
  }

  ["proj"](o,d){
    //console.log("ouch");
  }

  ["$!pass"](o,d){
    let {direction, trigger} = d;
    //console.log(direction);
    if(direction=="v"){

      if(this.dy==-1)this.y = o.y+o.height+0.5;
      else if(this.dy==1)this.y = o.y-this.height-0.5;


      //Solução para dentro do bloco
      /*
      if(this.dy==-1  && this.y<o.y+o.height) this.y = o.y+o.height+0.5;
      else if(this.dy==1  && this.y+this.height>o.y) this.y = o.y-this.height-0.5;
      */
      //this.y-=this.speed*this.dy;
    }
    else if(direction=="h"){

      if(this.dx==-1)this.x = o.x+o.width+0.5;
      else if(this.dx==1)this.x = o.x-this.width-0.5;


      //Solução para dentro do bloco
      /*
      if(this.dx==-1  && this.x<o.x+o.width) this.x = o.x+o.width+0.5;
      else if(this.dx==1  && this.x+this.width>o.x) this.x = o.x-this.width-0.5;
      */
      //this.x-=this.speed*this.dx;
    }

  }
}

class Projetil extends Movable{
  constructor(x,y,options){
    super(x,y,options);
    this.type= "proj";
    this.looker = true;
    this.setContext("projeteis");
    this.watchedContexts = ["main"];
  }

  $char(o,d){
    o.proj(this,d);
    this.removeItem();
  }

  ["$!pass"](){
    this.removeItem();
  }

  outBounds(box){
    let comp = [
      (this.x < box.left - this.width),
      (this.x > box.right),
      (this.y < box.top - this.height),
      (this.y > box.bottom)
    ];
    //console.log(comp);
    if(comp[0]||comp[1]||comp[2]||comp[3]){
      console.log('a');
      this.removeItem();
    }
  }
}

class Block extends Div_Hitbox {
  constructor(...args){
    super(...args);
    this.type = "!pass";
    document.body.appendChild(this.el);
  }
}

class DOMBlock extends DOM_Hitbox{
  constructor(el){
    super(el);
    this.type = "!pass";
    this.setContext("block");
  }

  static selectTransform(slc,call){
    let allElsMatch = document.querySelectorAll(slc), arr = [];
    allElsMatch.forEach(el=>{
      let block = new DOMBlock(el);
      if(call)call(block);
      arr.push(block);
    });

    return arr;
  }
}

class Effect extends Div_Hitbox{
  constructor(...args){
    super(...args);
    this.type = "effect";
    document.body.appendChild(this.el);

  }
}

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
