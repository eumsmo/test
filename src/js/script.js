const Keyboard = new Teclado();
const Caixa = new Box();

DOMBlock.selectTransform("#box .spawn");
Caixa._shouldItemsMove = true;
Caixa._moveItems();

let meio = Caixa.middle;
let main = new Personagem(meio.x-12.5,meio.y-12.5,{
  width: 25,
  height: 25,
  imgs:{
    default: "src/img/coracaum.png"
  }
});

main.dirControl(Keyboard);
const test = new Battle({box: Caixa,main});
test.foo();
