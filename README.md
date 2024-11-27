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
git clone https://github.com/vinicarlosss/Desafio_tecnico_full_stack.git
cd Desafio_tecnico_full_stack
```
### 2. Configure as váriaveis de ambiente

Crie um arquivo .env na raiz do projeto e configure as variáveis necessárias para a aplicação funcionar corretamente. Aqui está um exemplo do conteúdo que você precisa adicionar:
```bash
GOOGLE_API_KEY: A sua chave da API do Google Routes
```
**Aviso:** Para que o projeto funcione corretamente, é necessário possuir uma chave de API do Google com as seguintes bibliotecas ativas: **Geocoding API**, **Routes API** e **Maps Static API**.

### 3. Suba o ambiente Docker

Com o Docker e Docker Compose instalados, execute o comando abaixo para construir e rodar os containers:

```bash
docker compose up
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
A aplicação consulta a Google Routes API para calcular a melhor rota entre a origem e o destino, o usuário também poderá ver visualmente a rota a ser percorrida através de um mapa estático.
O valor da corrida é estimado com base na distância da viagem.
### 2. Exibir motoristas disponíveis:

A aplicação consulta os motoristas registrados no banco de dados.
Para cada motorista, a interface exibe o nome, a avaliação, o veículo e o valor estimado da corrida.
### 3. Confirmar a corrida:

O usuário escolhe um motorista disponível e confirma a corrida.
A confirmação da corrida é processada pela API, que também registra a escolha no banco de dados.
### 4. Histórico de corridas:

O usuário terá a possibilidade de consultar o histórico de corridas realizadas, com a opção de visualizar todas as corridas ou filtrar apenas aquelas realizadas com um motorista específico.
