export interface GetRidesResponse{
    customer_id: string;
    rides: Ride[];
};

interface Ride{
    id: number;
    date: string;
    origin: string;
    destination: string;
    duration: string;
    distance: number;
    driver: Driver;
    value: number;
};

interface Driver{
    id: number;
    name: string;
};