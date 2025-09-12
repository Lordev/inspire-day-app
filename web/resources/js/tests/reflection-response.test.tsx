import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ReflectionResponse from '@/components/reflection-response';
import { Prompt } from '@/types';

const p: Prompt = { id: 1, user_id: 1, prompt: 'Prompt', response: 'Hello world', date: '2025-08-26', status: 'answered' };

describe('ReflectionResponse', () => {
  it('renders the response content', () => {
    render(<ReflectionResponse prompt={p} />);
    expect(screen.getByText(/Hello world/)).toBeTruthy();
  });
});
