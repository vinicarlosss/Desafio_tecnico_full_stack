# API de Gerenciamento de Corridas

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
####Resposta:
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