class Hitbox {
  constructor(x,y,width,height,context="main"){
    Object.assign(this,{x, y, width, height});

    this._overlaping = false;
    this._callbacks = []; // callback(other);

    this.watchedContexts = [];
    this.setContext(context);
    this.exists = true;
  }

  _wasOverlapped(other){
    this._overlaping = true;
    console.log(this.id+" e "+other.id);
    this._callbacks.forEach(call=>call(other));
  }

  overlap(callback){
    if(callback.constructor == Function)
      this._callbacks.push(callback);
  }

  isOver(other){
    return !(this.x+this.width < other.x || this.x > other.x+other.width ||
          this.y + this.height < other.y || this.y > other.y + other.height);
  }

  isItself(other){
    return (this.context == other.context && this.id == other.id);
  }

  isOverlaping(sContext){
    if(sContext==undefined){
      for(let context of this.watchedContexts){
        let r = this.isOverlaping(context);
        if(r!=false) return r;
      }
    } else {
      let context = Hitbox.all[sContext];
      for(let box of context){
        if(box && !this.isItself(box) && this.isOver(box))
          return box;
      }
    }

    return false;
  }

  setContext(context){
    if(this.context!=undefined) this.removeContext();

    this.context = context;
    if(Hitbox.all[context] == undefined ){
      //console.log("Registered Context: "+context);
      Hitbox.all[context] = [this];
      this.id = 0;
    } else {
      let arr = Hitbox.all[context],i;
      for(i = 0; i < arr.length; i++)
        if(arr[i]==null){
          arr[i] = this;
          return this.id = i;
        }
      // else like
      arr[i] = this;
      return this.id = i;
    }
  }

  removeContext(){
    Hitbox.all[this.context][this.id] = null;
    this.context = undefined;
    this.id = undefined;
  }

  removeItem(){
    Hitbox.all[this.context][this.id] = null;
    this.exists = false;
  }

  static check(){
    let arr = Hitbox.all, size = arr.length;

    arr.forEach(box=>box._overlaping=false);

    for(let i=0;i<size; i++){
      let h1 = arr[i];

      for(let j=i+1; j<size; j++){
        let h2 = arr[j];
        if(h1.isOver(h2)){
          h1._wasOverlapped(h2);
          h2._wasOverlapped(h1);
        }
      }
    }

    setTimeout(Hitbox.check, Hitbox._mpc);
    //ok.
  }

  static set cps(times){
    Hitbox._mpc = 1000/times; // 1 Sec = 1000 mil
  }
}

Hitbox.all = {};
Hitbox.cps = 10;

const _cfl = str => str.charAt(0).toUpperCase() + str.slice(1);
const dirWhat = dir=> "offset"+_cfl(dir);

class DOM_Hitbox extends Hitbox{
  constructor(element){
    super(0,0,0,0);
    this.el = element;

    Object.defineProperties(this,{
      width: {
        get(){return this.el.getBoundingClientRect().width}, //this.el[dirWhat+"Width"]
        set(val){return this.el.style.width = val+'px'}
      },
      height: {
        get(){return this.el.getBoundingClientRect().height}, //this.el[dirWhat+"Height"]
        set(val){return this.el.style.height = val+'px'}
      },
      x: {
        get(){return this.el.getBoundingClientRect().x}, //this.el[dirWhat+"Left"]
        set(val){return this.el.style.left = val+'px'}
      },
      y: {
        get(){return this.el.getBoundingClientRect().y}, //this.el[dirWhat+"Top"]
        set(val){return this.el.style.top = val+'px'}
      }
    });
  }

  removeItem(){
    this.el.remove();
    super.removeItem();
  }
}

class Div_Hitbox extends DOM_Hitbox{
  constructor(x,y,width,height){
    let div = document.createElement("DIV");
    div.classList.add("div_hitbox");
    super(div);

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}
