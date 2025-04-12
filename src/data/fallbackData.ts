import { Product } from '../types/Product';

export const fallbackProducts: Product[] = [
    {
        id: '1',
        title: 'Smartphone XYZ',
        price: 599.99,
        description: 'Un smartphone de última generación con características increíbles',
        rating: 4.5,
        ratingCount: 128,
        image: 'https://via.placeholder.com/200',
        store: {
            id: 'store1',
            name: 'TechStore',
            distance: 2.5,
            rating: 4.8,
            location: {
                lat: 40.7128,
                lng: -74.0060
            }
        }
    },
    {
        id: '2',
        title: 'Laptop Pro',
        price: 1299.99,
        description: 'Laptop profesional para trabajo y gaming',
        rating: 4.8,
        ratingCount: 256,
        image: 'https://via.placeholder.com/200',
        store: {
            id: 'store2',
            name: 'ComputerWorld',
            distance: 1.8,
            rating: 4.6,
            location: {
                lat: 40.7129,
                lng: -74.0061
            }
        }
    },
    {
        id: '3',
        title: 'Auriculares Wireless',
        price: 199.99,
        description: 'Auriculares inalámbricos con cancelación de ruido',
        rating: 4.3,
        ratingCount: 89,
        image: 'https://via.placeholder.com/200',
        store: {
            id: 'store3',
            name: 'AudioShop',
            distance: 3.2,
            rating: 4.4,
            location: {
                lat: 40.7130,
                lng: -74.0062
            }
        }
    }
];
