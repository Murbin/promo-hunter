import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    CircularProgress,
    Alert,
    Container,
    Typography
} from '@mui/material';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { RootState } from '../store/store';
import { useGetProductsQuery } from '../store/api';
import { SideFilters } from './SideFilters';
import { PerformanceMetrics } from './PerformanceMetrics';
import { GridItemRenderer } from './GridItemRenderer';
import { AutoSizerProps } from '../types';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { filterProducts, calculateGridConfig } from '../utils/productUtils';
import { hideScrollbarStyles, scrollContainerStyles, productGridStyles } from '../styles/globalStyles';
import { Product } from '../types/Product';
import { fallbackProducts } from '../data/fallbackData';

export const Promotions = () => {
    const [allProducts, setAllProducts] = useState<Product[]>(fallbackProducts);
    const limit = 20;

    const filters = useSelector((state: RootState) => state.filters);

    const { page } = useInfiniteScroll(true, { threshold: 500 });

    const { data: apiProducts = [], isLoading, error } = useGetProductsQuery({ page, limit });

    useEffect(() => {
        if (apiProducts && apiProducts.length > 0) {
            const convertedProducts = apiProducts.map(p => ({
                id: p.id,
                title: p.title,
                price: p.price,
                description: p.description,
                category: p.category,
                image: p.image,
                rating: p.rating,
                store: p.store ? {
                    id: p.store.place_id.toString(),
                    name: p.store.display_name,
                    distance: p.distance || 0,
                    rating: 4.5, // Valor por defecto
                    location: {
                        lat: parseFloat(p.store.lat),
                        lng: parseFloat(p.store.lon)
                    }
                } : undefined,
                distance: p.distance
            }));
            setAllProducts(convertedProducts);
        }
    }, [apiProducts]);

    const filteredProducts = useMemo(() =>
        filterProducts(allProducts, filters),
        [allProducts, filters]
    );

    if (isLoading && page === 1) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                Error loading promotions
            </Alert>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ pt: 5, mt: 4, mb: 4, maxWidth: '1600px' }}>
            <style>{hideScrollbarStyles}</style>

            <Box>
                <PerformanceMetrics
                    productCount={allProducts.length || 0}
                    apiResponseTime={0}
                />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                },
                gap: 3
            }}>
                <Box sx={{
                    width: {
                        xs: '100%',
                        md: '220px',
                        lg: '230px'
                    },
                    flexShrink: 0
                }}>
                    <SideFilters />
                </Box>

                <Box sx={{
                    ...scrollContainerStyles,
                    flexGrow: 1
                }} className="hide-scrollbar">
                    <AutoSizer>
                        {({ height, width }: AutoSizerProps) => {
                            const gridConfig = calculateGridConfig(width, filteredProducts);

                            if (filteredProducts.length === 0) {
                                return (
                                    <Box display="flex" justifyContent="center" alignItems="center" height={height} width={width}>
                                        <Typography variant="h6">No hay productos que coincidan con los filtros.</Typography>
                                    </Box>
                                );
                            }

                            return (
                                <FixedSizeGrid
                                    columnCount={gridConfig.columnCount}
                                    columnWidth={gridConfig.columnWidth}
                                    height={height}
                                    rowCount={gridConfig.rowCount}
                                    rowHeight={gridConfig.rowHeight}
                                    width={width}
                                    itemData={{
                                        items: filteredProducts,
                                        columnCount: gridConfig.columnCount
                                    }}
                                    style={productGridStyles}
                                    className="hide-scrollbar"
                                >
                                    {GridItemRenderer}
                                </FixedSizeGrid>
                            );
                        }}
                    </AutoSizer>
                </Box>
            </Box>

            {isLoading && page > 1 && (
                <Box display="flex" justifyContent="center" my={3}>
                    <CircularProgress />
                </Box>
            )}
        </Container>
    );
}; 