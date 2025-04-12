import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { OptimizedImageProps } from '../types';

export const OptimizedImage = React.memo(({ src, alt }: OptimizedImageProps) => {
    return (
        <LazyLoadImage
            alt={alt}
            src={src}
            effect="blur"
            style={{ width: '100%', height: 200, objectFit: 'contain', padding: '16px' }}
            threshold={100}
            placeholder={
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                    <CircularProgress size={20} />
                </Box>
            }
        />
    );
}); 