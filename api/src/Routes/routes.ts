import { Router } from "express";
import { RideController } from "../Controller/Ride/RideController";

const rideController = new RideController();
const router = Router();
router.post('/ride/estimate', rideController.estimateRide);
export { router };
