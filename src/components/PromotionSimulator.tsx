import { Fab, Tooltip } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import { useWebSocketSimulator } from '../hooks/useWebSocketSimulator';
import { WebSocketStatus } from './WebSocketStatus';
import { simulatorButtonStyles } from '../styles/promotionSimulatorStyles';

export const PromotionSimulator = () => {
    const { wsStatus, reconnect, sendManualNotification } = useWebSocketSimulator();

    return (
        <>
            <WebSocketStatus status={wsStatus} onReconnect={reconnect} />

            <Tooltip title="Enviar notificación promocional" placement="left">
                <Fab
                    color="secondary"
                    aria-label="add"
                    onClick={sendManualNotification}
                    sx={simulatorButtonStyles}
                    disabled={!wsStatus.connected}
                >
                    <CampaignIcon />
                </Fab>
            </Tooltip>
        </>
    );
}; 