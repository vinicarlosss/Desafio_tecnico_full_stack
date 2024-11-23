import axios from "axios";
import RideRepository from "../../Repository/Ride/RideRepository";
import { EstimateRideResponse } from "../../Controller/Ride/response/EstimatedRideResponse";
import DriverRepository from "../../Repository/Driver/DriverRepository";

export class EstimateRideService {
  private rideRepository: RideRepository;
  private driveRepository: DriverRepository;
  private apiKey: string;

  constructor() {
    this.rideRepository = new RideRepository();
    this.driveRepository = new DriverRepository();
    this.apiKey = process.env.GOOGLE_API_KEY as string;
  }

  public async estimateRide(requestBody: {
    customer_id: string;
    origin: string;
    destination: string;
  }) {
    try {
      return await this.calculateRoute(requestBody);
    } catch (error: any) {
      throw new Error(
        `Erro ao calcular a estimativa da viagem: ${error.message}`
      );
    }
  }

  // Função para obter as coordenadas (latitude e longitude) de um endereço
  private async getCoordinatesFromAddress(
    address: string
  ): Promise<{ latitude: number; longitude: number }> {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${this.apiKey}`;
    try {
      const response = await axios.get(geocodeUrl);
      if (response.data.results && response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      } else {
        throw new Error(
          "Não foi possível encontrar as coordenadas para o endereço informado."
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao acessar a API de Geocodificação.");
    }
  }

  public formatDuration(secondsString: string): string {
    const seconds = parseInt(secondsString.replace("s", "")); // Remove o 's' e converte para número

    const hours = Math.floor(seconds / 3600); // Calcula as horas
    const minutes = Math.floor((seconds % 3600) / 60); // Calcula os minutos restantes

    if (hours > 0) {
      return `${hours}h ${minutes}min`; // Formato para horas e minutos
    } else {
      return `${minutes}min`; // Formato para apenas minutos
    }
  }

  public parseRating(ratingText: string): { rating: number; comment: string } {
    const [ratingPart, ...commentParts] = ratingText.split(" - ");
    const rating = parseFloat(ratingPart.split("/")[0]); // Pegando o número antes do "/"
    const comment = commentParts.join(" - "); // Reunindo o restante do texto
    return { rating, comment };
  }

  // Função para calcular a rota entre a origem e o destino
  public async calculateRoute(requestBody: {
    customer_id: string;
    origin: string;
    destination: string;
  }): Promise<EstimateRideResponse> {
    // Obtendo as coordenadas para a origem e destino usando a Geocoding API
    const originCoords = await this.getCoordinatesFromAddress(
      requestBody.origin
    );
    const destinationCoords = await this.getCoordinatesFromAddress(
      requestBody.destination
    );

    const url =
      "https://routes.googleapis.com/directions/v2:computeRoutes?key=" +
      this.apiKey;

    // Corpo da requisição para a API Routes
    const body = {
      origin: {
        location: {
          latLng: {
            latitude: originCoords.latitude,
            longitude: originCoords.longitude,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: destinationCoords.latitude,
            longitude: destinationCoords.longitude,
          },
        },
      },
      travelMode: "DRIVE",
    };
    const headers = {
      "Content-Type": "application/json",
      "X-Goog-FieldMask":
        "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
    };

    try {
      const response = await axios.post(url, body, { headers });

      // Verificando a resposta e retornando os dados necessários
      if (response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0];

        const distance = route.distanceMeters / 1000; // Convertendo metros para quilômetros
        const duration = this.formatDuration(route.duration);
        const eligibleDrivers = await this.driveRepository.getEligibleDrivers(distance);
        const options = eligibleDrivers.map(driver => {
          const parsedRating = this.parseRating(driver.rating);
          const formattedTax = driver.tax.replace(',', '.').replace(/[^\d.]/g, '');
          return {
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.car,
            review: {
              rating: parsedRating.rating,
              comment: parsedRating.comment,
            },
            value: parseFloat(formattedTax) * distance,
          };
        });
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
          duration: duration,
          options,
          routeResponse: response.data, // Incluindo toda a resposta da API do Google (opcional)
        };

        return result;
      } else {
        throw new Error("Erro ao calcular a rota: Sem rotas disponíveis");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao acessar a API do Google Routes.");
    }
  }
}
