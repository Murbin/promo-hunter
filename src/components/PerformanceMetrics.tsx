import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { usePerformanceMetrics } from '../hooks/usePerformanceMetrics';

interface PerformanceMetricsProps {
    productCount: number;
    apiResponseTime: number;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
    productCount,
    apiResponseTime
}) => {
    const metrics = usePerformanceMetrics(productCount, apiResponseTime);

    return (
        <Paper
            elevation={0}
            sx={{
                background: 'transparent',
                padding: '4px 8px 20px',
                display: 'flex',
                justifyContent: 'center',
                gap: 2
            }}
        >
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography variant="body2">
                    FPS: {metrics.fps}
                </Typography>
                <Typography variant="body2">
                    Render: {metrics.renderTime.toFixed(2)}ms
                </Typography>
                <Typography variant="body2">
                    Productos: {metrics.productCount}
                </Typography>
                <Typography variant="body2">
                    API: {metrics.apiResponseTime.toFixed(2)}ms
                </Typography>
                {metrics.memoryUsage > 0 && (
                    <Typography variant="body2">
                        Memoria: {metrics.memoryUsage}MB
                    </Typography>
                )}
            </Box>
        </Paper>
    );
}; 