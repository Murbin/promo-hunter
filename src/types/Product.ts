export interface Store {
    id: string;
    name: string;
    distance: number;
    rating: number;
    location: {
        lat: number;
        lng: number;
    };
}

export interface Product {
    id: string | number;
    title: string;
    price: number;
    description: string;
    category?: string;
    image: string;
    rating: number | {
        rate: number;
        count: number;
    };
    ratingCount?: number;
    store?: Store;
    distance?: number;
} 