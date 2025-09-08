import '@testing-library/jest-dom';
import { vi } from 'vitest';

type RouteParams = { prompt?: string; [key: string]: unknown };

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Provide a lightweight mock for ziggy-js's `route` helper used in components
vi.mock('ziggy-js', () => ({
  route: (name: string, params?: RouteParams) => `/route/${name}/${params?.prompt ?? ''}`,
}));
