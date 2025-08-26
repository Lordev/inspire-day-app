import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ReflectionCard from '@/components/reflection-card';
import { Prompt } from '@/types';

const p: Prompt = { id: 1, prompt: 'Prompt', response: 'Hello world', date: '2025-08-26', status: 'answered' };

describe('ReflectionCard', () => {
    it('renders prompt text when active', () => {
        render(<ReflectionCard prompt={p} />);
        expect(screen.getByText(/Prompt/)).toBeTruthy();
    });
});
