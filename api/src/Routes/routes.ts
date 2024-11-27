import { Router } from "express";
import { RideController } from "../Controller/Ride/RideController";
import { DriverController } from "../Controller/Driver/DriverController";

const rideController = new RideController();
const driverController = new DriverController();
const router = Router();
router.get('/ping', async (_req, res) => {
    console.log('pong');
    res.json('pong');
});
router.post('/ride/estimate', rideController.estimateRide.bind(rideController));
router.patch('/ride/confirm', rideController.confirmRide.bind(rideController));
router.get('/driver/getAll', driverController.getAll.bind(driverController));
router.get('/ride/:customer_id', rideController.getRides.bind(rideController));
export { router };
