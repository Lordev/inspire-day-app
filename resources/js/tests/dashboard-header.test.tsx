import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DashboardHeader from '@/components/dashboard-header';

describe('DashboardHeader', () => {
  it('renders the title and a preferences control', () => {
    render(<DashboardHeader />);
    expect(screen.getByText(/Daily Reflection/i)).toBeTruthy();
    // preferences might be a button or link; look for the word
    expect(screen.getByText(/Preferences/i)).toBeTruthy();
  });
});
