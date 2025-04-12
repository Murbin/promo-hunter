import { Product } from '../types/Product';

export interface ProductCardProps {
    product: Product;
}

export interface GridItemRendererProps {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
    data: {
        items: Product[];
        columnCount: number;
    };
}

export interface OptimizedImageProps {
    src: string;
    alt: string;
}

export interface AutoSizerProps {
    height: number;
    width: number;
}

export interface GridConfig {
    columnCount: number;
    rowCount: number;
    columnWidth: number;
    rowHeight: number;
}

export interface ProductFilters {
    category: string;
    store: string;
    proximity: number;
} 