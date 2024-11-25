export interface Ride{
    id: number;
    date: string;
    origin: string;
    destination: string;
    duration: string;
    driver: {
        id: number;
        name: string;
    };
    value: number;
}