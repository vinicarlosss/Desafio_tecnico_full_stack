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

CREATE TABLE IF NOT EXISTS Customer (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Criação da tabela Corrida
CREATE TABLE IF NOT EXISTS Ride (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    distance FLOAT NOT NULL,
    duration INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    rating FLOAT DEFAULT NULL,
    id_driver BIGINT,
    id_customer BIGINT,
    car VARCHAR(255),
    origin_latitude FLOAT,
    origin_longitude FLOAT,
    destination_latitude FLOAT,
    destination_longitude FLOAT,
    FOREIGN KEY (id_driver) REFERENCES Driver(id),
    FOREIGN KEY (id_customer) REFERENCES Customer(id)
);