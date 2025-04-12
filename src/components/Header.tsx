import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead } from '../store/notificationsSlice';
import { RootState } from '../store/store';
import { notificationMenuStyles, notificationListStyles, notificationItemStyles } from '../styles/headerStyles';

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const notifications = useSelector((state: RootState) => state.notifications.items);
    const dispatch = useDispatch();

    const unreadCount = notifications.filter(notif => !notif.read).length;

    const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

        if (unreadCount > 0) {
            setTimeout(() => {
                dispatch(markAsRead());
            }, 2000);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed" color="primary" elevation={0}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    ConnectBuy
                </Typography>

                <IconButton
                    color="inherit"
                    aria-label="notifications"
                    onClick={handleNotificationClick}
                >
                    <Badge badgeContent={unreadCount} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                <Menu
                    id="notifications-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        sx: notificationMenuStyles
                    }}
                >
                    <Box px={2} py={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Notificaciones
                        </Typography>
                    </Box>
                    <Divider />

                    {notifications.length === 0 ? (
                        <MenuItem>
                            <Typography variant="body2" color="text.secondary">
                                No hay notificaciones nuevas
                            </Typography>
                        </MenuItem>
                    ) : (
                        <List sx={notificationListStyles}>
                            {notifications.map((notification) => (
                                <React.Fragment key={notification.id}>
                                    <ListItem alignItems="flex-start" sx={notificationItemStyles(notification.read)}>
                                        <ListItemAvatar>
                                            <Avatar alt="Promo" src={notification.image || "/discount-icon.png"} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={notification.title}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2">
                                                        {notification.message}
                                                    </Typography>
                                                    <Typography component="span" variant="caption" display="block" color="text.secondary">
                                                        {new Date(notification.timestamp).toLocaleString()}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </React.Fragment>
                            ))}
                        </List>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}; 