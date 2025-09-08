import '@testing-library/jest-dom';
import { vi } from 'vitest';

type RouteParams = { prompt?: string; [key: string]: unknown };

// Provide a lightweight mock for ziggy-js's `route` helper used in components
vi.mock('ziggy-js', () => ({
  route: (name: string, params?: RouteParams) => `/route/${name}/${params?.prompt ?? ''}`,
}));
