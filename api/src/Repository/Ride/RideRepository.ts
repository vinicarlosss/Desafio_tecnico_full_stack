import axios from "axios";
import mysql from "mysql2/promise";
import { RideRepositoryInterface } from "../../Models/Ride/RideRepositoryInterface";
import { EstimateRideResponse } from "../../Controller/Ride/response/EstimatedRideResponse";

const dbConfig = {
    host: "127.0.0.1", 
    user: "app_user",
    password: "app_password", 
    database: "app_db",
};

class RideRepository implements RideRepositoryInterface{

    private connection;
    private apiKey: string;

    constructor(){
        this.connection = mysql.createPool(dbConfig);
        this.apiKey = process.env.GOOGLE_API_KEY as string;
    };

    // Função para obter as coordenadas (latitude e longitude) de um endereço
  private async getCoordinatesFromAddress(address: string): Promise<{ latitude: number; longitude: number }> {

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    try {
      const response = await axios.get(geocodeUrl);
      if (response.data.results && response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng
        };
      } else {
        throw new Error('Não foi possível encontrar as coordenadas para o endereço informado.');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao acessar a API de Geocodificação.');
    }
  }

    // Função para calcular a rota entre a origem e o destino
  public async calculateRoute(requestBody: { customer_id: string; origin: string; destination: string }): Promise<EstimateRideResponse> {
    // Obtendo as coordenadas para a origem e destino usando a Geocoding API
    const originCoords = await this.getCoordinatesFromAddress(requestBody.origin);
    const destinationCoords = await this.getCoordinatesFromAddress(requestBody.destination);

    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes?key=' + this.apiKey;

    // Corpo da requisição para a API Routes
    const body = {
      origin: {
        location: {
          latLng: {
            latitude: originCoords.latitude,
            longitude: originCoords.longitude
          }
        }
      },
      destination: {
        location: {
          latLng: {
            latitude: destinationCoords.latitude,
            longitude: destinationCoords.longitude
          }
        }
      }
    };

    try {
      const response = await axios.post(url, body);

      // Verificando a resposta e retornando os dados necessários
      if (response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0];

        const distance = route.legs[0].distanceMeters / 1000; // Convertendo metros para quilômetros
        const duration = route.legs[0].duration;
        const options = [
          {
            id: 1,
            name: 'Homer Simpson',
            description: 'Motorista camarada, relaxe e aproveite o passeio.',
            vehicle: 'Plymouth Valiant 1973',
            review: {
              rating: 2.5,
              comment: 'Motorista simpático, mas errou o caminho algumas vezes.',
            },
            value: 5.00,
          },
          {
            id: 2,
            name: 'Dominic Toretto',
            description: 'Motorista rápido e seguro.',
            vehicle: 'Dodge Charger R/T 1970',
            review: {
              rating: 4.5,
              comment: 'Carro rápido, o motorista é ótimo!',
            },
            value: 10.00,
          },
        ];
        const result: EstimateRideResponse = {
          origin: {
            latitude: originCoords.latitude,
            longitude: originCoords.longitude,
          },
          destination: {
            latitude: destinationCoords.latitude,
            longitude: destinationCoords.longitude,
          },
          distance,
          duration: duration.text,
          options,
          routeResponse: response.data, // Incluindo toda a resposta da API do Google (opcional)
        };

        return result;
      } else {
        throw new Error('Erro ao calcular a rota: Sem rotas disponíveis');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao acessar a API do Google Routes.');
    }
  }
}

export default RideRepository;
