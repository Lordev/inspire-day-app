import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DashboardHeader from '@/components/dashboard-header';
import { SidebarProvider } from '@/components/ui/sidebar';

describe('DashboardHeader', () => {
  it('renders the title and a preferences control', () => {
    render(
      <SidebarProvider>
        <DashboardHeader title="Daily Reflection" />
      </SidebarProvider>
    );
    expect(screen.getByText(/Daily Reflection/i)).toBeTruthy();
  });
});
