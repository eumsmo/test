const ladoCaixa = 10;
class Box{
  constructor() {
    this.el = document.querySelector("#box");

    this.speed = 1;

    this._itemsToMove = [];
    this._shouldItemsMove = false;
  }

  get pos(){return this.el.getBoundingClientRect()}

  get _speedMili(){
    return this.speed * 10;
  }

  get border(){
    // return {
    // let pos = this.pos;
    //   top: pos.top+ladoCaixa,
    //   left: pos.left+ladoCaixa,
    //   right: pos.left+pos.width-ladoCaixa,
    //   bottom: pos.top+pos.height-ladoCaixa
    // }
    let pos = document.body;
    return {
      top: pos.scrollTop,
      left: pos.scrollLeft,
      right: pos.scrollLeft+pos.scrollWidth,
      bottom: pos.scrollTop+pos.scrollHeight
    }
  }

  get middle(){
    let pos = this.pos;
    return {
      x: pos.left+(pos.width/2),
      y: pos.top+(pos.height/2)
    };
  }

  insertItem(item){
    this._itemsToMove[item.id] = item;
  }

  removeItem(id){
    this._itemsToMove[id] = null;
  }

  _moveItems(){
    if(this._shouldItemsMove){
      this._itemsToMove.forEach(item=> {
        if(item!=null){
          if(item.exists){
            item.move();
            item.outBounds(this.border);
          }
          else this.removeItem(item.id);
        }
      });

      setTimeout(()=>this._moveItems(),this._speedMili);
    }
  }


}

const randInt = (min,max)=> Math.floor(Math.random() * (max - min)) + min;
class Battle{
  constructor({box,main}){
    this.atacks = [];
    this._projeteisReg = {};
    this.box = box;
    this.main = main;

    this.running = true;
  }

  randDir(){
    let dir = ["top","left","down","right"];
    return dir[randInt(0,4)];
  }

  registerProj(name,img,call){
    this._projeteisReg[name] = {
      img,
      call
    };
  }

  generateProj(name,every){
    let reg = this._projeteisReg[name],
      proj = new Projetil(100,100,{
        width: 15,
        height: 15,
        imgs: {default: reg.img}
      });

    reg.call(proj,{
      box: this.box,
      main: this.main
    });

    if(every!=undefined && this.running){
      setTimeout(()=>this.generateProj(name,every),every*1000);
    }
  }

  foo(){
    setTimeout(()=>this.end(),30*1000);

    this.registerProj("test1","src/img/spr_bulletmd_0.png",(proj,{box, main})=>{
      let dir = this.randDir(), border = box.border;
      //console.log(border);
      //console.log(dir);
      //dir = "down";
      switch(dir){
        case "right":
          proj.x = border.right;
          proj.y = main.y;
          proj.setDir(-1,0);
          break;
        case "left":
          proj.x = border.left-proj.height;
          proj.y = main.y;
          proj.setDir(1,0);
          break;
        case "top":
          proj.y = border.top-proj.width;
          proj.x = main.x;
          proj.setDir(0,1);
          break;
        case "down":
          proj.y = border.bottom;
          proj.x = main.x;
          proj.setDir(0,-1);
          break;
      }

      box.insertItem(proj);
    });

    this.generateProj("test1",1);
  }

  end(){
    //alert("its over");
  }
}
