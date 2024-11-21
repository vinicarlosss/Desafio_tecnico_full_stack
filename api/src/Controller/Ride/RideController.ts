import { Request, Response } from "express";
import { EstimateRideService } from "../../Service/Ride/EstimateRideService";

export class RideController {
  private estimateRideService: EstimateRideService;

  constructor() {
    this.estimateRideService = new EstimateRideService();
  }

  async estimateRide(req: Request, res: Response): Promise<Response>{
    
    const { customer_id, origin, destination } = req.body;
    try {
      const result = await this.estimateRideService.estimateRide({ customer_id, origin, destination });
      return res.status(200).json(result);
    } catch (error:unknown) {
      if(error instanceof Error){
        return res.status(400).json({
          error_code: 'INVALID_DATA',
          error_description: error.message
        });
      }else{
        return res.status(500).json({
          error_code: 'INTERNAL_ERROR',
          error_description: 'Um erro inesperado ocorreu'
        })
      }
      
    }
  }
}
