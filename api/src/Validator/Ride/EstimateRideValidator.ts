export class EstimateRideValidator {

  constructor() {}

  public validate(requestBody: {
    customer_id: string;
    origin: string;
    destination: string;
  }): void {
    if(requestBody.customer_id === ""){
        throw new Error("Id do usuário não pode estar em branco");
    }else if(requestBody.origin === ""){
        throw new Error("Endereço de origem não pode estar em branco");
    }else if(requestBody.destination === ""){
        throw new Error("Endereço de destino não pode estar em branco");
    };
  };
};
