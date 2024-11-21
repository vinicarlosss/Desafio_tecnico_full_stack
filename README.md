# 🚗 Desafio Técnico Full Stack

Bem-vindo ao repositório do **Desafio Técnico Full Stack**! 🚀

Esta aplicação permite que os usuários consultem o valor de uma corrida, vejam os motoristas disponíveis e confirmem a corrida. O cálculo do valor da corrida e as rotas são realizados utilizando a **Google Routes API**, enquanto a interface do usuário é desenvolvida com **React** e **TypeScript**.

## 🔧 Tecnologias Utilizadas

- **Node.js** com **TypeScript** 🟩
- **Express.js** para a estruturação do back-end 🚀
- **Axios** para chamadas HTTP 🔌
- **Google Routes API** para cálculo de rotas 🗺️
- **React** com **TypeScript** para o front-end 💻
- **Docker** para containerização 🐳
- **MySQL** para armazenamento de dados 💾

## 📦 Como Subir o Docker

Para rodar o ambiente de desenvolvimento completo, com back-end e front-end, siga os passos abaixo:

### 1. **Clone o repositório**

Primeiro, clone o repositório e acesse a pasta do projeto no seu terminal:

```bash
git clone https://github.com/seu-usuario/estimate-ride-app.git
cd estimate-ride-app
```
### 2. Configure as váriaveis de ambiente

Crie um arquivo .env na raiz do projeto e configure as variáveis necessárias para a aplicação funcionar corretamente. Aqui está um exemplo do conteúdo que você precisa adicionar:
```bash
GOOGLE_API_KEY: A sua chave da API do Google Routes
```

### 3. Suba o ambiente Docker

Com o Docker e Docker Compose instalados, execute o comando abaixo para construir e rodar os containers:

```bash
docker-compose up --build
```

Isso irá:

 - Construir as imagens Docker para o back-end (API) e o front-end.
 - Subir o banco de dados MySQL, a API e o front-end, tudo rodando em containers Docker.

 ### 4. Verifique se tudo está funcionando
Após o Docker iniciar os containers, acesse o seguinte para testar a aplicação localmente:

- API (back-end): http://localhost:8080
- Front-end (interface): http://localhost:80
Se os containers subirem corretamente, você verá a interface do usuário no navegador e poderá interagir com a aplicação!

## 🚀 Funcionalidades
Como funciona a aplicação:
### 1. Consultar o valor da corrida:

O usuário informa a origem e o destino da viagem.
A aplicação consulta a Google Routes API para calcular a melhor rota entre a origem e o destino.
O valor da corrida é estimado com base na distância e no tempo de viagem.
### 2. Exibir motoristas disponíveis:

A aplicação consulta os motoristas registrados no banco de dados.
Para cada motorista, a interface exibe o nome, a avaliação, o veículo e o valor estimado da corrida.
### 3. Confirmar a corrida:

O usuário escolhe um motorista disponível e confirma a corrida.
A confirmação da corrida é processada pela API, que também registra a escolha no banco de dados.
### 4. Mostrar detalhes da rota:

Ao confirmar a corrida, o usuário pode visualizar os detalhes da rota, incluindo a distância, duração e o caminho a ser seguido.
### 5. Exibir avaliações dos motoristas:

Cada motorista tem uma média de avaliações que é mostrada na interface.
O usuário pode ver as avaliações feitas por outros clientes para tomar uma decisão informada.