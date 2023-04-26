**API de Produtos**

A API de Produtos é uma aplicação que permite realizar operações CRUD em um banco de dados relacional PostgreSQL e no banco de dados NoSQL Firebase Realtime Database.

**Requisições GET**

**GET /products**

Retorna uma lista com todos os produtos cadastrados.

Parâmetros

Nenhum.

**GET /products/:id**

Retorna o produto com o id especificado.

Parâmetros

- id: número inteiro que representa o id do produto a ser retornado.

**Requisições POST**

**POST /products**

Cria um novo produto.

Parâmetros

- name: string que representa o nome do produto.
- description: string que representa a descrição do produto.

**Requisições PUT**

**PUT /products/:id**

Atualiza as informações de um produto existente.

Parâmetros

- id: número inteiro que representa o id do produto a ser atualizado.
- name: string que representa o novo nome do produto.
- description: string que representa a nova descrição do produto.

**Requisições DELETE**

**DELETE /products/:id**

Remove um produto existente.

Parâmetros

- id: número inteiro que representa o id do produto a ser removido.

