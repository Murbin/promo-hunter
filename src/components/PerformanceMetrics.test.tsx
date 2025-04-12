import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PerformanceMetrics } from './PerformanceMetrics';
import { jest } from '@jest/globals';

jest.mock('../hooks/usePerformanceMetrics', () => ({
    usePerformanceMetrics: jest.fn().mockReturnValue({
        fps: 60,
        renderTime: 5.5,
        productCount: 20,
        apiResponseTime: 250.45,
        memoryUsage: 75
    })
}));

describe('PerformanceMetrics Component', () => {
    test('renderiza correctamente el componente', () => {
        const { container } = render(<PerformanceMetrics productCount={20} apiResponseTime={250} />);

        expect(container.firstChild).toBeInTheDocument();

        const paragraphs = screen.getAllByRole('paragraph');
        expect(paragraphs.length).toBeGreaterThanOrEqual(4);
    });

    test('recibe y procesa props correctamente', () => {
        const productCount = 30;
        const apiResponseTime = 300;

        render(
            <PerformanceMetrics
                productCount={productCount}
                apiResponseTime={apiResponseTime}
            />
        );

        expect(screen.getAllByRole('paragraph').length).toBeGreaterThanOrEqual(4);
    });
}); 