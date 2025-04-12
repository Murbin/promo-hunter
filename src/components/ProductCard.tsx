import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Rating,
    Chip
} from '@mui/material';
import { ProductCardProps } from '../types';
import { OptimizedImage } from './OptimizedImage';

export const ProductCard = React.memo(({ product }: ProductCardProps) => {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out',
                },
            }}
        >
            <OptimizedImage src={product.image} alt={product.title} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {product.title}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                    ${product.price}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating
                        value={typeof product.rating === 'number' ? product.rating : product.rating.rate}
                        readOnly
                        precision={0.5}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({typeof product.rating === 'number' ? product.ratingCount || 0 : product.rating.count})
                    </Typography>
                </Box>
                {product.store && (
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip
                            label={product.store.name}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                        {product.distance && (
                            <Chip
                                label={`${product.distance}km`}
                                size="small"
                                color="secondary"
                                variant="outlined"
                            />
                        )}
                    </Box>
                )}
                <Typography variant="body2" color="text.secondary" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                }}>
                    {product.description}
                </Typography>
            </CardContent>
        </Card>
    );
}); 