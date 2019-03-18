## Inline code syntax
`*name*` onde *name* indica um parâmetro

- `$*varName*`
-- **varName**: String
Retorna variável de cena com o nome *varName*.

- `@*func*(*args*)` ou `@*func*` = `*args*`
-- **func**: String
-- **args**: lista de argumentos separados por ','
Chama função com nome *func* com os argumentos *args*

- `#*cond*` = `*callback*`
-- **cond**: expressão JS
-- **callback**: lista de funções separadas por ','
Chama funções da lista *callback* quando a condição em *cond* for cumprida.
