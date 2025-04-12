import { render, screen } from '../utils/test-utils';
import '@testing-library/jest-dom';
import { Header } from './Header';

describe('Header Component', () => {
    test('renderiza correctamente', () => {

        const preloadedState = {
            notifications: {
                items: []
            }
        };

        render(<Header />, { preloadedState });

        expect(screen.getByText('ConnectBuy')).toBeInTheDocument();
    });
}); 