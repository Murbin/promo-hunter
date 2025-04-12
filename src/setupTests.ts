import '@testing-library/jest-dom';

const mockFn = () => { };

global.console = {
    ...console,
    warn: mockFn,
    error: mockFn,
    log: console.log,
    debug: console.debug,
    info: console.info,
}; 