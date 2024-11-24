-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS app_db;

-- Seleção do banco de dados para uso
USE app_db;

-- Criação da tabela Motorista
CREATE TABLE IF NOT EXISTS Driver (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    car VARCHAR(255),
    rating VARCHAR(255),
    tax VARCHAR(255),
    km_minimum INT
);

INSERT INTO Driver (name, description, car, rating, tax, km_minimum) VALUES
('Dominic Toretto', 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', 'Dodge Charger R/T 1970 modificado', '4/5 - Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!', 'R$ 5,00/km', 5),
('Homer Simpson', 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 'Plymouth Valiant 1973 rosa e enferrujado', '2/5 - Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.', 'R$ 2,50/km', 1),
('James Bond', 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 'Aston Martin DB5 clássico', '5/5 - Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.', 'R$ 10,00/km', 10),
('Mario Mario', 'Sou Mario, aqui para te levar em uma viagem divertida e cheia de aventuras. Cuidado com os cascos de tartaruga!', 'Kart vermelho com asas', '4/5 - Motorista divertido, mas faz algumas curvas perigosas.', 'R$ 3,00/km', 2),
('Lara Croft', 'Exploradora experiente. Comigo, sua viagem será uma jornada emocionante e segura!', 'Jeep Wrangler 1998 com acessórios de exploração', '5/5 - Motorista extremamente profissional, com uma condução impecável.', 'R$ 8,00/km', 10),
('Tony Stark', 'Sou Tony, seu motorista visionário. Experiência de luxo e tecnologia em cada curva.', 'Audi R8 customizado', '5/5 - Serviço excelente e o carro é um espetáculo à parte.', 'R$ 15,00/km', 20),
('Ellen Ripley', 'Aqui é Ripley. Nenhum alienígena ou trânsito irá atrapalhar a sua viagem.', 'Caminhão espacial modificado', '4.5/5 - Motorista confiável, mas o veículo é um pouco grande.', 'R$ 6,00/km', 5),
('Sarah Connor', 'Viagens rápidas e seguras. Estou pronta para qualquer desafio, até mesmo robôs do futuro.', 'Harley-Davidson Fat Boy', '4/5 - Experiência única, mas o conforto do passageiro pode melhorar.', 'R$ 7,00/km', 7),
('Walter White', 'Preciso de dinheiro para um projeto importante. Garanto uma viagem discreta e eficiente.', 'RV envelhecido, mas funcional', '3/5 - Motorista eficiente, mas o veículo parece suspeito.', 'R$ 2,50/km', 1),
('Bruce Wayne', 'Sou Bruce Wayne. Serviço de luxo garantido, com total discrição.', 'Lamborghini Aventador', '5/5 - Motorista discreto e extremamente profissional.', 'R$ 20,00/km', 15),
('Leia Organa', 'Viagens com classe e determinação. Sempre pronta para ajudar.', 'Speeder elegante', '4.8/5 - Condução impecável e um ótimo papo.', 'R$ 10,00/km', 10),
('Han Solo', 'Ei, é o Han. Não pergunte sobre o passado, só aproveite a viagem.', 'Millennium Falcon em modo terrestre', '4/5 - Motorista habilidoso, mas às vezes se distrai com histórias.', 'R$ 5,00/km', 5),
('Diana Prince', 'Sou Diana, sua motorista amazona. Força, graça e segurança em cada viagem.', 'Aston Martin vintage', '5/5 - Condução tranquila e elegante. Experiência excelente.', 'R$ 12,00/km', 12);


-- Criação da tabela Corrida Confirmada
CREATE TABLE IF NOT EXISTS Ride (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    distance FLOAT NOT NULL,
    duration INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    id_driver BIGINT NOT NULL,
    id_customer VARCHAR(50) NOT NULL,
    car VARCHAR(255) NOT NULL,
    origin_name VARCHAR(255) NOT NULL,
    destination_name VARCHAR(255) NOT NULL,
    origin_latitude FLOAT NOT NULL,
    origin_longitude FLOAT NOT NULL,
    destination_latitude FLOAT NOT NULL,
    destination_longitude FLOAT NOT NULL,
    FOREIGN KEY (id_driver) REFERENCES Driver(id)
);