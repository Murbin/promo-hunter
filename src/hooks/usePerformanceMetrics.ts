import { useState, useEffect, useRef } from 'react';

interface PerformanceMetrics {
    fps: number;
    renderTime: number;
    productCount: number;
    memoryUsage: number;
    apiResponseTime: number;
}

export const usePerformanceMetrics = (productCount: number, apiResponseTime: number) => {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        fps: 0,
        renderTime: 0,
        productCount: 0,
        memoryUsage: 0,
        apiResponseTime: 0
    });

    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());
    const renderStartTime = useRef(0);

    // Medir FPS
    useEffect(() => {
        const measureFPS = () => {
            const now = performance.now();
            const delta = now - lastTime.current;

            if (delta >= 1000) {
                const fps = Math.round((frameCount.current * 1000) / delta);
                setMetrics(prev => ({ ...prev, fps }));

                frameCount.current = 0;
                lastTime.current = now;
            }

            frameCount.current++;
            requestAnimationFrame(measureFPS);
        };

        const animationId = requestAnimationFrame(measureFPS);
        return () => cancelAnimationFrame(animationId);
    }, []);

    // Medir tiempo de renderizado
    useEffect(() => {
        renderStartTime.current = performance.now();

        const measureRenderTime = () => {
            const renderTime = performance.now() - renderStartTime.current;
            setMetrics(prev => ({ ...prev, renderTime }));
        };

        // Usar requestIdleCallback si está disponible, de lo contrario usar setTimeout
        if ('requestIdleCallback' in window) {
            requestIdleCallback(measureRenderTime);
        } else {
            setTimeout(measureRenderTime, 0);
        }
    }, [productCount]);

    // Actualizar métricas cuando cambian los datos
    useEffect(() => {
        setMetrics(prev => ({
            ...prev,
            productCount,
            apiResponseTime
        }));
    }, [productCount, apiResponseTime]);

    // Medir uso de memoria (solo funciona en Chrome)
    useEffect(() => {
        interface MemoryInfo {
            usedJSHeapSize: number;
            totalJSHeapSize: number;
            jsHeapSizeLimit: number;
        }

        interface PerformanceWithMemory extends Performance {
            memory: MemoryInfo;
        }

        const measureMemory = () => {
            if ('memory' in performance) {
                const memory = (performance as PerformanceWithMemory).memory;
                setMetrics(prev => ({
                    ...prev,
                    memoryUsage: Math.round(memory.usedJSHeapSize / (1024 * 1024)) // MB
                }));
            }
        };

        const intervalId = setInterval(measureMemory, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return metrics;
}; 