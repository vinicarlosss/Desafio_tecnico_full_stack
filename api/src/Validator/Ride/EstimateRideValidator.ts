import { HttpException } from "../../Exception/HttpException";

export class EstimateRideValidator {

  constructor() {}

  public validate(requestBody: {
    customer_id: string;
    origin: string;
    destination: string;
  }) {
    if(!requestBody.customer_id){
        throw new HttpException(400, "INVALID_DATA", "Id do usuário não pode estar em branco");
    }else if(!requestBody.origin){
        throw new HttpException(400, "INVALID_DATA", "Endereço de origem não pode estar em branco");
    }else if(!requestBody.destination){
        throw new HttpException(400, "INVALID_DATA", "Endereço de destino não pode estar em branco");
    };
  };
};
