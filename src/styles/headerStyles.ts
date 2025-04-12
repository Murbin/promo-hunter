import { SxProps, Theme } from '@mui/material';

export const notificationMenuStyles: SxProps<Theme> = {
    width: 320,
    maxHeight: 400
};

export const notificationListStyles: SxProps<Theme> = {
    width: '100%',
    padding: 0
};

export const notificationItemStyles = (isRead: boolean): SxProps<Theme> => ({
    bgcolor: isRead ? 'transparent' : 'action.hover'
}); 