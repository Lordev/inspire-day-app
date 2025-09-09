import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import HistorySidebar from '@/components/history-sidebar';
import { Prompt } from '@/types';

const items: Prompt[] = [
  { id: 1, prompt: 'One', response: 'R1', date: '2025-08-26', status: 'answered' },
  { id: 2, prompt: 'Two', response: 'R2', date: '2025-08-25', status: 'answered' },
];

describe('HistorySidebar', () => {
  it('renders a list of history items', () => {
    render(<HistorySidebar history={items} />);
    expect(screen.getByText(/One/)).toBeTruthy();
    expect(screen.getByText(/Two/)).toBeTruthy();
  });
});
