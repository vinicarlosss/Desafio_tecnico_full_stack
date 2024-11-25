import { Driver } from './../../Models/Driver/Driver';
import { DriverRequest } from "../../Models/Driver/DriverRequest";
import DriverRepository from "../../Repository/Driver/DriverRepository";
import { HttpException } from '../../Exception/HttpException';

export class ConfirmRideValidator {
    private driverRepository: DriverRepository;
  
    constructor() {
      this.driverRepository = new DriverRepository();
    }
  
    public async validate(requestInfo: {
      customer_id: string;
      origin: string;
      destination: string;
      distance: number;
      duration: string;
      driver: DriverRequest;
      value: number;
      currentDateTime: string;
    }) {
      const driver: Driver | null = await this.driverRepository.getById(requestInfo.driver.id);
      if (!driver) {
        throw new HttpException(404, "DRIVER_NOT_FOUND", "Motorista não encontrado");
      }
      if (!requestInfo.customer_id) {
        throw new HttpException(400, "INVALID_DATA", "O ID do cliente não pode estar vazio");
      }
      if (!requestInfo.origin) {
        throw new HttpException(400, "INVALID_DATA", "O endereço de origem não pode estar vazio");
      }
      if (!requestInfo.destination) {
        throw new HttpException(400, "INVALID_DATA", "O endereço de destino não pode estar vazio");
      }
      if (requestInfo.origin === requestInfo.destination) {
        throw new HttpException(400, "INVALID_DATA", "Os endereços de origem e destino não podem ser iguais");
      }
      if(!requestInfo.value) {
        throw new HttpException(400, "INVALID_DATA", "O valor da viagem não pode estar vazio");
      }
      if (!requestInfo.driver.id) {
        throw new HttpException(400, "INVALID_DATA", "O ID do motorista não pode estar vazio");
      }
      if (requestInfo.distance < driver.km_minimum) {
        throw new HttpException(
          406,
          "INVALID_DISTANCE",
          "A distância da viagem não é válida para o motorista selecionado"
        );
      }
    }
  }