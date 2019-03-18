## Group
Group é um conceito dentro do próprio código. Um grupo basicamente é uma camada de objetos, onde os objetos são organizados.

A totalidade de um grupo é uma entidade fixa que não responde a eventos (um grupo não é um objeto do jogo), e sim o próprio separador para tais eventos. Pode se relacionar um grupo como uma classe em CSS.

No código, quando um objeto de jogo é criado se é determinado um grupo, seja específico ou padrão, para que ele possa sofrer influência de terceiros, o mesmo objeto possui a propriedade `.watchedContexts` que é um vetor listando todos os grupos que possam ter efeito nesse objeto (os grupos que serão testada colisão com cada elemento de si).

## Type
Type é um conceito dentro do próprio código. Um tipo é a essência do objeto, dá nome ao tipo de objeto.

Tipo é apenas uma nomenclatura do objeto, por exemplo, um objeto Sprite tem o tipo `"sprite"`, mas só porque um objeto tem o tipo `"sprite"`  não significa que ele é um objeto Sprite.

No código, o tipo do objeto não faz diferença alguma, porém ajuda a uma melhor organização ao usuário, permitindo acessar/alterar o tipo do objeto através da propriedade `.type`. Certas classes de objetos já definem um tipo padrão, e outras classes podem herdar tipos, mas tipo são sempre mutáveis.

## $id
$id é a sua própria individualidade, é um Simbolo que é utilizado para localizar tal objeto em outras partições. Pode se relacionar um $id como um id em CSS.

No código, o id é utilizado para localizar o elemento no objeto que engloba todos os objetos Hitbox, pode ser acessado através da propriedade `.$id`. Sempre definido na criação do objeto e não deve ser modificado em nenhum momento.

 
