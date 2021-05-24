# Web scrapper

Aplicação de web scrapping básica desenvolvida para a disciplina de Programação para a Web II do curso de Ciências da Computação da UNESC.
## A aplicação
A aplicação consiste de um web service que busca as informações de artigos e podcasts do site [Mises Brasil](https://www.mises.org.br/), realizando um scrapping das informações presentes no HTML do site e as retornando de forma estruturada via arrays de objetos JSON.

Para  auxiliar no desenvolvimento da aplicação foram utilizadas as seguintes bibliotecas:

- [axios](https://github.com/axios/axios)
- [cheerio](https://github.com/cheeriojs/cheerio)
- [date-fns](https://github.com/date-fns/date-fns)
- [express](https://github.com/expressjs/express)

## Rotas disponíveis

Para servir as informações, foram disponibilizadas duas rotas.

### `/latest-articles`

Irá trazer as informações dos últimos artigos disponibilizados no site, juntamente de um timestamp identificando o horário da busca das informações.

A rota aceita um único query param, `author` que irá filtrar apenas os artigos cujo o nome do autor contenha a string enviada por parâmetro.

### `/latest-podcasts`

Irá trazer as informações dos últimos podcasts disponibilizados no site, juntamente de um timestamp identificando o horário da busca das informações.

A rota aceita um único query param, `description` que irá filtrar apenas os episódios cuja descrição contenha a string enviada por parâmetro.