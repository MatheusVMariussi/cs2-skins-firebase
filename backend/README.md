# MinhasSkins API - Backend

API RESTful para o marketplace de skins de Counter-Strike "MinhasSkins".

## Funcionalidades

- CRUD completo para anúncios de skins
- Filtros por arma, raridade e faixa de preço
- Paginação de resultados
- Validação de dados

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- CORS
- dotenv

## Requisitos

- Node.js
- MySQL

### Anúncios

- `GET /api/anuncios` - Listar todos os anúncios
  - Suporta parâmetros de query: `page`, `limit`, `arma`, `raridade`, `minPrice`, `maxPrice`
- `GET /api/anuncios/:id` - Buscar um anúncio específico
- `POST /api/anuncios` - Criar um novo anúncio
- `PUT /api/anuncios/:id` - Atualizar um anúncio existente
- `DELETE /api/anuncios/:id` - Excluir um anúncio

## Estrutura do Banco de Dados

```sql
CREATE TABLE anuncios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome_skin VARCHAR(100) NOT NULL,
  arma VARCHAR(50) NOT NULL,
  raridade VARCHAR(30) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  floatSkin DECIMAL(5,4) NOT NULL,
  descricao TEXT,
  imagem_url VARCHAR(255) NOT NULL,
  vendedor VARCHAR(100) NOT NULL,
  data_anuncio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Autor

Matheus Vinicius Mariussi
