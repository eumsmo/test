
# Scene Variables
Scene variables foi uma forma eficaz de controlar eventos no mapa sem precisar de muito esforço. A proposta de SV é que a partir de propriedades personalizadas no Tiled, seja possível controlar eventos, reduzindo ou substituindo o próprio código JS da cena.

# Sintaxe

- ${variableName}
-- Selecionar variáveis de cena
 - $functionName(args,separed,by,commas)
 -- Chama função com determinados argumentos
 - #condição
 --

### [something] = [other_thing]
 - Se [something] for uma chamada de função, [other_thing] será o ultimo argumento da função

 - Se [something] for uma condição, [other_thing] será executada quando a condição for cumprida

- Se [something] for uma variável, [other_thing] será .. [WORK IN PROGRESS]
