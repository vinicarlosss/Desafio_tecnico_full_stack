import { NextFunction, Request, Response } from "express";
import { EstimateRideService } from "../../Service/Ride/EstimateRideService";
import { ConfirmRideService } from "../../Service/Ride/ConfirmRideService";
import { GetRidesService } from "../../Service/Ride//GetRidesService";

export class RideController {
  private estimateRideService: EstimateRideService;
  private confirmRideService: ConfirmRideService;
  private getRidesService: GetRidesService;

  constructor() {
    this.estimateRideService = new EstimateRideService();
    this.confirmRideService = new ConfirmRideService();
    this.getRidesService = new GetRidesService();
  };

  async estimateRide(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { customer_id, origin, destination } = req.body;
    try {
      const result = await this.estimateRideService.estimateRide({
        customer_id,
        origin,
        destination,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async confirmRide(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = req.body;
    try {
      const result = await this.confirmRideService.confirmRide({
        customer_id,
        origin,
        destination,
        distance,
        duration,
        driver,
        value,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async getRides(req: Request, res: Response, next: NextFunction) : Promise<void>{
    try{
      const customer_id = req.params.customer_id;
      const driver_id:number|undefined = req.query.driver_id ? Number(req.query.driver_id) : undefined;
      const result = await this.getRidesService.getRides({
        customer_id,
        driver_id
      })
      res.status(200).json(result);
    }catch (error){
      next(error);
    }
  }
}
