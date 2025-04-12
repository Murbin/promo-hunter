import React from 'react';
import { GridItemRendererProps } from '../types';
import { ProductCard } from './ProductCard';

export const GridItemRenderer = React.memo(({
    columnIndex,
    rowIndex,
    style,
    data
}: GridItemRendererProps) => {
    const { items, columnCount } = data;
    const index = rowIndex * columnCount + columnIndex;

    if (index >= items.length) {
        return null;
    }

    const paddedStyle = {
        ...style,
        padding: '12px',
        boxSizing: 'border-box' as const,
        position: 'absolute' as const,
        top: style.top as number,
        left: style.left as number,
        width: style.width as number,
        height: style.height as number,
        zIndex: 1,
        backgroundColor: '#fff',
        display: 'block',
    };

    return (
        <div style={paddedStyle}>
            <ProductCard product={items[index]} />
        </div>
    );
}); 