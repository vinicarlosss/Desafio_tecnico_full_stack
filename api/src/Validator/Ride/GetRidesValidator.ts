import { HttpException } from "../../Exception/HttpException";
import { Driver } from "../../Models/Driver/Driver";

export class GetRidesValidator{


    public validate(customer_id: string, driver: Driver|null, withDriverId: boolean){
        if(!customer_id){
            throw new HttpException(400, "INVALID_DATA", "O id do usuário não pode estar em branco");
        }
        if(!driver && withDriverId){
            throw new HttpException(400,"INVALID_DRIVER", "Não foi possível identificar o motorista informado. Verifique os dados e tente novamente.");
        }
    }
}