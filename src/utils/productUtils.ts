import { Product } from '../types/Product';
import { ProductFilters } from '../types';

export const filterProducts = (
    products: Product[],
    filters: ProductFilters
): Product[] => {
    return products.filter(product =>
        filterByCategory(product, filters.category) &&
        filterByStore(product, filters.store) &&
        filterByProximity(product, filters.proximity)
    );
};

export const filterByCategory = (
    product: Product,
    category: string
): boolean => {
    return category === 'all' || product.category === category;
};

export const filterByStore = (
    product: Product,
    store: string
): boolean => {
    return store === 'all' || product.store?.name === store;
};

export const filterByProximity = (
    product: Product,
    proximity: number
): boolean => {
    return !product.distance || product.distance <= proximity;
};

export const getColumnCount = (width: number): number => {
    if (width < 600) return 1;
    if (width < 960) return 2;
    if (width < 1400) return 3;
    return 4;
};

export const calculateGridConfig = (
    width: number,
    products: Product[]
) => {
    const columnCount = getColumnCount(width);
    const rowCount = Math.max(1, Math.ceil(products.length / columnCount));
    const columnWidth = width / columnCount;
    const rowHeight = 450;

    return {
        columnCount,
        rowCount,
        columnWidth,
        rowHeight
    };
}; 