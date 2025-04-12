import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WebSocketStatus } from './WebSocketStatus';
import { jest } from '@jest/globals';

describe('WebSocketStatus Component', () => {
    const mockReconnect = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('muestra "Conectado" cuando el status es connected=true', () => {
        const mockStatus = {
            connected: true,
            connectionAttempts: 1,
            lastMessageAt: Date.now() - 5000
        };

        render(<WebSocketStatus status={mockStatus} onReconnect={mockReconnect} />);

        expect(screen.getByText('Conectado')).toBeInTheDocument();

        const chip = screen.getByText('Conectado').closest('.MuiChip-root');
        expect(chip).toHaveClass('MuiChip-colorSuccess');
    });

    test('muestra "Desconectado" cuando el status es connected=false', () => {
        const mockStatus = {
            connected: false,
            connectionAttempts: 3,
            lastMessageAt: null
        };

        render(<WebSocketStatus status={mockStatus} onReconnect={mockReconnect} />);

        expect(screen.getByText('Desconectado')).toBeInTheDocument();

        const chip = screen.getByText('Desconectado').closest('.MuiChip-root');
        expect(chip).toHaveClass('MuiChip-colorError');
    });

    test('llama a onReconnect cuando se hace clic en el chip desconectado', () => {
        const mockStatus = {
            connected: false,
            connectionAttempts: 2,
            lastMessageAt: null
        };

        render(<WebSocketStatus status={mockStatus} onReconnect={mockReconnect} />);

        const chip = screen.getByText('Desconectado');
        fireEvent.click(chip);

        expect(mockReconnect).toHaveBeenCalledTimes(1);
    });

    test('no llama a onReconnect cuando se hace clic y está conectado', () => {
        const mockStatus = {
            connected: true,
            connectionAttempts: 1,
            lastMessageAt: Date.now()
        };

        render(<WebSocketStatus status={mockStatus} onReconnect={mockReconnect} />);

        const chip = screen.getByText('Conectado');
        fireEvent.click(chip);

        expect(mockReconnect).not.toHaveBeenCalled();
    });
}); 