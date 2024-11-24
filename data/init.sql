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

INSERT INTO Driver (id, name, description, car, rating, tax, km_minimum) VALUES
(1, 'Homer Simpson', 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 'Plymouth Valiant 1973 rosa e enferrujado', '2/5 - Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.', 'R$ 2,50/km', 1),
(2, 'Dominic Toretto', 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', 'Dodge Charger R/T 1970 modificado', '4/5 - Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!', 'R$ 5,00/km', 5),
(3, 'James Bond', 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 'Aston Martin DB5 clássico', '5/5 - Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.', 'R$ 10,00/km', 10);

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