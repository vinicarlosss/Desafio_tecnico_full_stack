export interface Driver{
    id: number;
    name: string;
    description: string;
    review: DriverReview;
    value: number;
    vehicle: string;
}

interface DriverReview {
    comment: string;
    rating: number;
}