import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Store {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
    type: string;
    address: {
        shop?: string;
        amenity?: string;
        name?: string;
    };
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    store?: Store;
    distance?: number;
}

// Tiendas simuladas con distancias específicas
const simulatedStores: Store[] = [
    {
        place_id: 1,
        display_name: "Walmart Supercenter",
        lat: "40.7128",
        lon: "-74.0060",
        type: "supermarket",
        address: { shop: "supermarket", name: "Walmart" }
    },
    {
        place_id: 2,
        display_name: "Target",
        lat: "40.7589",
        lon: "-73.9851",
        type: "department_store",
        address: { shop: "department_store", name: "Target" }
    },
    {
        place_id: 3,
        display_name: "Best Buy",
        lat: "40.7527",
        lon: "-73.9772",
        type: "electronics",
        address: { shop: "electronics", name: "Best Buy" }
    },
    {
        place_id: 4,
        display_name: "Macy's",
        lat: "40.7505",
        lon: "-73.9934",
        type: "department_store",
        address: { shop: "department_store", name: "Macy's" }
    },
    {
        place_id: 5,
        display_name: "Home Depot",
        lat: "40.7021",
        lon: "-73.9871",
        type: "doityourself",
        address: { shop: "doityourself", name: "Home Depot" }
    },
    {
        place_id: 6,
        display_name: "Costco",
        lat: "40.7614",
        lon: "-73.9776",
        type: "supermarket",
        address: { shop: "supermarket", name: "Costco" }
    },
    {
        place_id: 7,
        display_name: "Staples",
        lat: "40.7484",
        lon: "-73.9857",
        type: "stationery",
        address: { shop: "stationery", name: "Staples" }
    },
    {
        place_id: 8,
        display_name: "GameStop",
        lat: "40.7580",
        lon: "-73.9855",
        type: "video_games",
        address: { shop: "video_games", name: "GameStop" }
    }
];

// Datos de productos de respaldo en caso de que la API no responda
const fallbackProducts: Product[] = [
    {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: { rate: 3.9, count: 120 }
    },
    {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.3,
        description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        rating: { rate: 4.1, count: 259 }
    },
    {
        id: 3,
        title: "Mens Cotton Jacket",
        price: 55.99,
        description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        rating: { rate: 4.7, count: 500 }
    },
    {
        id: 4,
        title: "Mens Casual Slim Fit",
        price: 15.99,
        description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        rating: { rate: 2.1, count: 430 }
    },
    {
        id: 5,
        title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        price: 695,
        description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        category: "jewelery",
        image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        rating: { rate: 4.6, count: 400 }
    },
    {
        id: 6,
        title: "Solid Gold Petite Micropave",
        price: 168,
        description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
        category: "jewelery",
        image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
        rating: { rate: 3.9, count: 70 }
    },
    {
        id: 7,
        title: "White Gold Plated Princess",
        price: 9.99,
        description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
        category: "jewelery",
        image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
        rating: { rate: 3, count: 400 }
    },
    {
        id: 8,
        title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
        price: 10.99,
        description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
        category: "jewelery",
        image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
        rating: { rate: 1.9, count: 100 }
    },
    {
        id: 9,
        title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
        price: 64,
        description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7",
        category: "electronics",
        image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
        rating: { rate: 3.3, count: 203 }
    },
    {
        id: 10,
        title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
        price: 109,
        description: "Easy upgrade for faster boot up, shutdown, application load and response. As compared to 5400 RPM SATA hard drive. Based on published specifications and internal benchmarking tests.",
        category: "electronics",
        image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
        rating: { rate: 2.9, count: 470 }
    }
];

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fakestoreapi.com',
        prepareHeaders: (headers) => {
            headers.set('User-Agent', 'ConnectBuy/1.0');
            return headers;
        }
    }),
    tagTypes: ['Products', 'Stores'],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], { page: number; limit: number }>({
            query: ({ limit }) => `products?limit=${limit}`,
            transformResponse: (response: Product[]) => {
                // Si la respuesta está vacía o es inválida, usar datos de respaldo
                if (!response || !Array.isArray(response) || response.length === 0) {
                    console.log('Usando productos de respaldo');
                    return fallbackProducts.map((product, index) => {
                        // Asignar una tienda
                        const store = simulatedStores[index % simulatedStores.length];

                        // Asignar una distancia específica
                        let distance;
                        if (index % 4 === 0) distance = 1;
                        else if (index % 4 === 1) distance = 3;
                        else if (index % 4 === 2) distance = 5;
                        else distance = 10;

                        return { ...product, store, distance };
                    });
                }

                console.log('API Response:', response);

                // Transformar los datos de la API
                return response.map((product, index) => {
                    // Asignar una tienda
                    const store = simulatedStores[index % simulatedStores.length];

                    // Asignar una distancia específica
                    let distance;
                    if (index % 4 === 0) distance = 1;
                    else if (index % 4 === 1) distance = 3;
                    else if (index % 4 === 2) distance = 5;
                    else distance = 10;

                    return { ...product, store, distance };
                });
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Products' as const, id })),
                        { type: 'Products', id: 'LIST' }
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
            keepUnusedDataFor: 300, // 5 minutos
        }),
        getProductsByCategory: builder.query<Product[], string>({
            query: (category) => `products/category/${category}`,
            transformResponse: (response: Product[]) => {
                // Asignar tiendas y distancias específicas a productos
                return response.map((product, index) => {
                    // Asignar una tienda
                    const store = simulatedStores[index % simulatedStores.length];

                    // Asignar una distancia específica basada en el índice del producto
                    let distance;
                    if (index % 4 === 0) {
                        distance = 1; // 1km
                    } else if (index % 4 === 1) {
                        distance = 3; // 3km
                    } else if (index % 4 === 2) {
                        distance = 5; // 5km
                    } else {
                        distance = 10; // 10km
                    }

                    return {
                        ...product,
                        store,
                        distance
                    };
                });
            },
            providesTags: (_result, _error, category) => [
                { type: 'Products', id: category },
                { type: 'Products', id: 'LIST' }
            ],
            keepUnusedDataFor: 300, // 5 minutos
        }),
        getStores: builder.query<Store[], void>({
            queryFn: async () => {
                // Devolver las tiendas simuladas
                return { data: simulatedStores };
            },
            providesTags: [{ type: 'Stores', id: 'LIST' }],
            keepUnusedDataFor: 600, // 10 minutos
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductsByCategoryQuery,
    useGetStoresQuery
} = api; 