export interface  ConfirmRideRequest{
    customer_id: string;
    origin: string;
    destination: string;
    distance: number,
    duration: string;
    driver: DriverRequest;
    value: number;
};

interface DriverRequest{
    id: number;
    name: string;
};