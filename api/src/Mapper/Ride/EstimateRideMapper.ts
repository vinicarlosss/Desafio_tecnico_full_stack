export class EstimateRideMapper {
    static toOption(driver: any, distance: number): object {
      return {
        id: driver.id,
        name: driver.nome,
        description: driver.descricao,
        vehicle: driver.carro,
        review: {
          rating: parseFloat(driver.avaliacao) || 0,
          comment: "Ótimo motorista!",
        },
        value: parseFloat(driver.taxa) * distance, // Simulação de cálculo
      };
    }
  }
  