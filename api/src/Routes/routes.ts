import { Router } from "express";
import { RideController } from "../Controller/Ride/RideController";

const rideController = new RideController();
const router = Router();
router.get('/ping', async (_req, res) => {
    console.log('pong');
    res.json('pong');
});
router.post('/ride/estimate', rideController.estimateRide.bind(rideController));
/*router.post('/ride/estimate', rideController.estimateRide);*/
export { router };
