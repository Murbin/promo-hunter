import React from 'react';
import { Box, Chip, Tooltip, CircularProgress } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { WebSocketStatus as WebSocketStatusType } from '../hooks/useWebSocketSimulator';

interface WebSocketStatusProps {
    status: WebSocketStatusType;
    onReconnect: () => void;
}

export const WebSocketStatus: React.FC<WebSocketStatusProps> = ({ status, onReconnect }) => {
    const getTimeAgo = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);

        if (seconds < 60) return `hace ${seconds} segundos`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `hace ${minutes} minutos`;
        const hours = Math.floor(minutes / 60);
        return `hace ${hours} horas`;
    };

    const getTooltipContent = () => {
        let content = `Conexión ${status.connected ? 'activa' : 'inactiva'}`;
        content += `\nIntentos de conexión: ${status.connectionAttempts}`;

        if (status.lastMessageAt) {
            content += `\nÚltima notificación: ${getTimeAgo(status.lastMessageAt)}`;
        }

        return content;
    };

    return (
        <Tooltip title={getTooltipContent()} placement="left">
            <Box sx={{ position: 'fixed', bottom: 80, right: 20, zIndex: 1000 }}>
                <Chip
                    icon={status.connected ? <WifiIcon /> : <WifiOffIcon />}
                    label={status.connected ? 'Conectado' : 'Desconectado'}
                    color={status.connected ? 'success' : 'error'}
                    variant="outlined"
                    onClick={status.connected ? undefined : onReconnect}
                    sx={{
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                            color: status.connected ? 'success.main' : 'error.main'
                        }
                    }}
                    avatar={!status.connected ? <CircularProgress size={16} color="error" /> : undefined}
                />
            </Box>
        </Tooltip>
    );
}; 