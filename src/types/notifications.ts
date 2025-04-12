export interface NotificationType {
    id: string;
    type: 'promo' | 'discount' | 'offer';
    title: string;
    message: string;
    image: string;
    productId: string;
    discount: number;
    timestamp: number;
    read: boolean;
}

export interface NotificationsState {
    items: NotificationType[];
} 