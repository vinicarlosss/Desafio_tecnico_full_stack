import { NextFunction, Request, Response } from "express";
import { GetAllDriverService } from "../../Service/Driver/GetAllDriverService";

export class DriverController{
    
    private getAllDriverService: GetAllDriverService;

    constructor(){
        this.getAllDriverService = new GetAllDriverService();
    };

    async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{
            const result = await this.getAllDriverService.getAll();
            res.status(200).json(result);
        } catch(error){
            next(error);
        }
    }
}