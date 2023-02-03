# Projeto API RESTful com NodeJS, Docker, MySQL e MSC

Este projeto é uma implementação de uma API RESTful usando a arquitetura MSC (Model-Service-Controller), padrão REST, Docker, MySQL e NodeJS.

## Requisitos

- Docker
- Docker Compose
- NodeJS
- MySQL


## Instalação

### Clone este repositório

```bash
git clone https://github.com/pedroayresb/StoreManagerAPI
```

### Navegue até a pasta do projeto

```bash
cd StoreManagerAPI
```

### Inicie o Docker Compose

```bash
docker-compose up
```

### Instale as dependências do NodeJS

```bash
npm install
```

## Uso

A API estará disponível em http://localhost:3000.

## Testes

Para rodar os testes da API, execute o seguinte comando:

```bash
npm run test
```

## Documentação da API

Esta API é responsável por gerenciar produtos, que possuem apenas nome e id.

### Rotas

#### Listar todos os produtos

Método HTTP: GET

Rota: /products

Exemplo de resposta:

``` json
[  
    {    
        "id": 1,   
        "name": "Martelo de Thor"  
    },  
    {    
        "id": 2,   
        "name": "Traje de encolhimento"  
    },  ...
]
```

#### Procurar produtos por nome

Método HTTP: GET

Rota: /products/search?<nome_do_produto>

Exemplo de resposta:

``` json
[ 
    {    
        "id": 1,    
        "name": "Martelo de Thor"  
    }   
]
```

#### Cadastrar um produto

Método HTTP: POST

Rota: /products

Exemplo de requisição:

```json
{
  "name": "Novo Produto"
}
```

Exemplo de resposta:

```json
{
  "id": 3,
  "name": "Novo Produto"
}
```

#### Consultar um produto específico

Método HTTP: GET

Rota: /products/:id

Exemplo de resposta:

``` json
{
  "id": 1,
  "name": "Martelo de Thor"
}
```

#### Editar um produto

Método HTTP: PUT

Rota: /products/:id

Exemplo de requisição:

``` json
{
  "name": "Produto Atualizado"
}
```

Exemplo de resposta:

``` json
{
  "id": 1,
  "name": "Produto Atualizado"
}
```

#### Deletar um produto

Método HTTP: DELETE

Rota: /products/:id
Exemplo de resposta:

```json
{
  "message": "Produto deletado com sucesso"
}
```

#### Fazer uma venda

Método HTTP: POST 

Rota: /sales

Exemplo de requisição:

```json
[  
    {    
        "productId": 1,    
        "quantity": 1 
    },  
    {    
        "productId": 2,   
        "quantity": 5 
    }
]
```

Exemplo de resposta:

```json
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}
```

#### Consultar todas venda

Método HTTP: GET 

Rota: /sales

Exemplo de resposta:

```json
[
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }

  /* ... */
]
```

#### Consultar uma venda

Método HTTP: GET 

Rota: '/sales/:id'

Exemplo de resposta:
```json
[
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  /* ... */
]
```

#### Deletar uma venda

Método HTTP: DELETE 

Rota: '/sales/:id'

Retorna um status 204 (No Content).

#### Atualizar uma venda

Método HTTP: PUT 

Rota: '/sales/:id'

Esta rota permite atualizar uma venda existente por meio do ID da venda.

Entrada (corpo da requisição):

```json
[  
    {    
        "productId": 1,    
        "quantity": 10  
    },  
    {    
        "productId": 2,    
        "quantity": 50  
    }
]
```

Exemplo de resposta:

```json
{
  "saleId": 1,
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity":10
    },
    {
      "productId": 2,
      "quantity":50
    }
  ]
}
```

## Considerações finais

Este projeto é apenas um exemplo de como criar uma API RESTful usando a tecnologia acima mencionada. Sinta-se à vontade para personalizar e melhorar este projeto de acordo com suas necessidades.
