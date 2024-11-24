import { Request, Response } from "express";
import { EstimateRideService } from "../../Service/Ride/EstimateRideService";
import { ConfirmRideService } from "../../Service/Ride/ConfirmRideService";

export class RideController {
  private estimateRideService: EstimateRideService;
  private confirmRideService: ConfirmRideService;

  constructor() {
    this.estimateRideService = new EstimateRideService();
    this.confirmRideService = new ConfirmRideService();
  }

  async estimateRide(req: Request, res: Response): Promise<void>{
    
    const { customer_id, origin, destination } = req.body;
    try {
      
       const result = await this.estimateRideService.estimateRide({ customer_id, origin, destination });
       res.status(200).json(result);
    } catch (error:unknown) {
      if(error instanceof Error){
          res.status(400).json({
          error_code: 'INVALID_DATA',
          error_description: error.message
        });
      }else{
          res.status(500).json({
          error_code: 'INTERNAL_ERROR',
          error_description: 'Um erro inesperado ocorreu'
        })
      }
      
    }
  }

  async confirmRide(req: Request, res: Response): Promise<void>{
    const { customer_id, origin, destination, distance, duration, driver, value } = req.body
    try{
      const result = await this.confirmRideService.confirmRide({ customer_id, origin, destination, distance, duration, driver, value });
      res.status(200).json(result);
    } catch(error:unknown){
      console.error(error);
    }
  }
}
