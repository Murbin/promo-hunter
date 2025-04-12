import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { NotificationType, NotificationsState } from '../types/notifications';

const initialState: NotificationsState = {
    items: []
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Omit<NotificationType, 'id' | 'timestamp' | 'read'>>) => {
            state.items.unshift({
                ...action.payload,
                id: uuidv4(),
                timestamp: Date.now(),
                read: false
            });
        },
        markAsRead: (state) => {
            state.items.forEach(notification => {
                notification.read = true;
            });
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(notification => notification.id !== action.payload);
        },
        clearNotifications: (state) => {
            state.items = [];
        }
    }
});

export const { addNotification, markAsRead, removeNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer; 