import { render, screen } from './utils/test-utils';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
    it('renders the app title', () => {

        const preloadedState = {
            notifications: {
                items: []
            },
            filters: {
                category: 'all',
                store: 'all',
                proximity: 0
            }
        };

        render(<App />, { preloadedState });

        const titleElement = screen.getByText(/ConnectBuy/i);
        expect(titleElement).toBeInTheDocument();
    });
}); 