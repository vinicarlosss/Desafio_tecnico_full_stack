-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS app_db;

-- Seleção do banco de dados para uso
USE app_db;

-- Criação da tabela Motorista
CREATE TABLE IF NOT EXISTS Motorista (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    carro VARCHAR(255),
    avaliacao VARCHAR(255),
    taxa VARCHAR(255),
    km_minimo INT
);

CREATE TABLE IF NOT EXISTS Usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- Criação da tabela Corrida
CREATE TABLE IF NOT EXISTS Corrida (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    distancia FLOAT NOT NULL,
    tempo_percurso INT NOT NULL,
    valor_corrida DECIMAL(10, 2) NOT NULL,
    avaliacao FLOAT DEFAULT NULL,
    id_motorista BIGINT,
    id_passageiro BIGINT,
    carro VARCHAR(255),
    origem_latitude FLOAT,
    origem_longitude FLOAT,
    destino_latitude FLOAT,
    destino_longitude FLOAT,
    FOREIGN KEY (id_motorista) REFERENCES Motorista(id),
    FOREIGN KEY (id_passageiro) REFERENCES Usuario(id)
);