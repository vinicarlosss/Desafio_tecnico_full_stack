import DriverRepository from "../../Repository/Driver/DriverRepository";

export class GetAllDriverService{

    private driverRepository: DriverRepository;

    constructor(){
        this.driverRepository = new DriverRepository();
    }

    public async getAll(){
        const result = await this.driverRepository.getAll();
        return result;
    }
}