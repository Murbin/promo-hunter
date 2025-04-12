import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/notificationsSlice';
import { fallbackProducts } from '../data/fallbackData';
import { NotificationType } from '../types/notifications';
import { Product } from '../types/Product';

export interface WebSocketStatus {
    connected: boolean;
    connectionAttempts: number;
    lastMessageAt: number | null;
}

export interface NotificationTemplate {
    type: 'promo' | 'discount' | 'offer';
    title: string;
    getMsg: (product: Product, discount: number) => string;
}

export const useWebSocketSimulator = () => {
    const dispatch = useDispatch();
    const [wsStatus, setWsStatus] = useState<WebSocketStatus>({
        connected: false,
        connectionAttempts: 0,
        lastMessageAt: null
    });

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    // Referencia para resolver dependencias circulares
    const connectRef = useRef<() => void>();

    const notificationTypes = useMemo<NotificationTemplate[]>(() => [
        {
            type: 'promo',
            title: '¡Promoción Flash!',
            getMsg: (product: Product, discount: number) => `${product.title} con ${discount}% de descuento. ¡Por tiempo limitado!`
        },
        {
            type: 'discount',
            title: 'Descuento Especial',
            getMsg: (product: Product, discount: number) => `Aprovecha ${discount}% de descuento en ${product.title}. ¡Solo hoy!`
        },
        {
            type: 'offer',
            title: 'Oferta Exclusiva',
            getMsg: (product: Product, discount: number) => `Compra ${product.title} con ${discount}% OFF. Termina pronto.`
        }
    ], []);

    const disconnect = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        setWsStatus(prev => ({
            ...prev,
            connected: false
        }));
    }, []);

    const reconnect = useCallback(() => {
        disconnect();

        const reconnectTime = Math.floor(Math.random() * 3000) + 2000;

        reconnectTimeoutRef.current = setTimeout(() => {
            if (connectRef.current) {
                connectRef.current();
            }
        }, reconnectTime);
    }, [disconnect]);

    const generateRandomPromotion = useCallback(() => {
        // Obtener un producto aleatorio para la promoción
        const randomIndex = Math.floor(Math.random() * fallbackProducts.length);
        const randomProduct = fallbackProducts[randomIndex];

        // Generar un descuento aleatorio entre 10% y 50%
        const discount = Math.floor(Math.random() * 41) + 10;

        // Seleccionar aleatoriamente un tipo de notificación
        const randomTypeIndex = Math.floor(Math.random() * notificationTypes.length);
        const notificationType = notificationTypes[randomTypeIndex];

        // Registramos la hora del último mensaje
        setWsStatus(prev => ({
            ...prev,
            lastMessageAt: Date.now()
        }));

        // Notificación real
        const notification: Omit<NotificationType, 'id' | 'timestamp' | 'read'> = {
            productId: randomProduct.id.toString(),
            type: notificationType.type,
            title: notificationType.title,
            message: notificationType.getMsg(randomProduct, discount),
            image: randomProduct.image,
            discount
        };

        dispatch(addNotification(notification));

        // Simulamos inestabilidad de conexión (5% de probabilidad de desconexión)
        if (Math.random() > 0.95) {
            reconnect();
        }
    }, [dispatch, notificationTypes, reconnect]);

    const connect = useCallback(() => {
        setWsStatus(prev => ({
            ...prev,
            connectionAttempts: prev.connectionAttempts + 1
        }));

        // Simulamos latencia de conexión
        setTimeout(() => {
            setWsStatus(prev => ({
                ...prev,
                connected: true
            }));

            // Una vez conectado, iniciamos el intervalo para enviar mensajes aleatorios
            // Función interna para evitar dependencias circulares
            const startMessageInterval = () => {
                // Enviamos mensajes en intervalos aleatorios (entre 10 y 30 segundos)
                intervalRef.current = setInterval(() => {
                    if (Math.random() > 0.7) {
                        generateRandomPromotion();
                    }
                }, Math.floor(Math.random() * 20000) + 10000);
            };

            startMessageInterval();
        }, 1500);
    }, [generateRandomPromotion]);

    // Asignar connect a la ref para resolver la dependencia circular
    useEffect(() => {
        connectRef.current = connect;
    }, [connect]);

    // Efecto para la conexión inicial
    useEffect(() => {
        // Iniciar la conexión
        connect();

        // Limpieza al desmontar
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, [connect]);

    // Simulación manual de envío de mensaje (para el botón)
    const sendManualNotification = useCallback(() => {
        if (wsStatus.connected) {
            generateRandomPromotion();
        }
    }, [wsStatus.connected, generateRandomPromotion]);

    return {
        wsStatus,
        connect,
        disconnect,
        reconnect,
        sendManualNotification
    };
}; 