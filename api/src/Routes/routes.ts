import { Router } from "express";
import { RideController } from "../Controller/Ride/RideController";

const rideController = new RideController();
const router = Router();
router.get('/ping', async (_req, res) => {
    console.log('pong');
    res.json('pong');
});
router.post('/ride/estimate', rideController.estimateRide.bind(rideController));
router.patch('/ride/confirm', rideController.confirmRide.bind(rideController));
router.get('/ride/:customer_id', rideController.getRides.bind(rideController));
export { router };
