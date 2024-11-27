# 🚗 API de Gerenciamento de Corridas

Esta API é responsável por estimar, confirmar e recuperar o histórico de corridas de clientes. Abaixo estão descritos os endpoints disponíveis, suas respectivas requisições e respostas.

---

## Endpoints

### 1. **POST /ride/estimate**

#### Descrição:
Calcula uma estimativa de corrida com base nos dados fornecidos.

#### Requisição:
```json
{
  "customer_id": "string",
  "origin": "string",
  "destination": "string"
}
```
#### Resposta:
```json
{
    {
  "origin": {
    "latitude": "number",
    "longitude": "number"
  },
  "destination": {
    "latitude": "number",
    "longitude": "number"
  },
  "distance": "number",
  "duration": "string",
  "options": [
    {
      "id": "number",
      "name": "string",
      "description": "string",
      "vehicle": "string",
      "review": {
        "rating": "number",
        "comment": "string"
      },
      "value": "number"
    }
  ],
  "routeResponse": "object"
}
}
```
- Campos principais:
    - distance: Distância total da corrida em quilômetros.
    - duration: Duração estimada da corrida.
    - options: Lista de opções de motoristas disponíveis.
    - routeResponse: Um objeto com dados referentes a rota passada pelo usuário, retornados da api do google.

#### Possíveis erros:

##### Código de erro: 400 - Dados inválidos

```json
{
    "error_code": "INVALID_DATA",
    "error_description": "string"
}
```

### 2. PATCH /ride/confirm

#### Descrição:
Confirma a corrida com os dados do cliente, motorista e estimativa fornecida.

#### Requisição:
```json
{
  "customer_id": "string",
  "origin": "string",
  "destination": "string",
  "distance": "number",
  "duration": "string",
  "driver": {
    "id": "number",
    "name": "string"
  },
  "value": "number"
}
```

#### Resposta:
```json
{
  "success": true
}
```

- Campos principais:
    - driver: Dados do motorista que realizou a corrida.
    - value: Valor final da corrida.

#### Possíveis erros:

##### Código de erro: 400 - Dados inválidos

```json
{
    "error_code": "INVALID_DATA",
    "error_description": "string"
}
```

##### Código de erro: 404 - Motorista não encontrado

```json
{
    "error_code": "INVALID_DATA",
    "error_description": "string"
}
```

##### Código de erro: 406 - Quilometragem inválida

```json
{
    "error_code": "INVALID_DISTANCE",
    "error_description": "string",
}
```


### 3. GET /ride/{customer_id}?driver_id={id do motorista}

#### Descrição:
Recupera o histórico de corridas de um cliente, podendo filtrar por motorista.

#### Requisição:
- Parâmetros na URL:
    - {customer_id}: ID do cliente.
    - driver_id (opcional): Filtra as corridas pelo ID do motorista.

#### Resposta:
```json
{
  "customer_id": "string",
  "rides": [
    {
      "id": "number",
      "date": "datetime",
      "origin": "string",
      "destination": "string",
      "distance": "number",
      "duration": "string",
      "driver": {
        "id": "number",
        "name": "string"
      },
      "value": "number"
    }
  ]
}
```
- Campos principais:
    - rides: Lista de corridas realizadas pelo cliente, contendo:
        - id: Identificador único da corrida.
        - date: Data e horário da corrida.
        - driver: Informações sobre o motorista
        - value: Valor pago pela corrida.

#### Possíveis erros:

##### Código de erro: 400 - Motorista inválido

```json
{
    "error_code": "INVALID_DRIVER",
    "error_description": "string"
}
```

##### Código de erro: 404 - Nenhum registro encontrado

```json
{
    "error_code": "NO_RIDES_FOUND",
    "error_description": "string"
}
```