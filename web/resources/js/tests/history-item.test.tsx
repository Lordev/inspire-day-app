import HistoryItem from '@/components/history-item';
import { Prompt } from '@/types';
import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { describe, it, expect } from 'vitest';

const mockPrompt: Prompt = {
    id: 1,
    prompt: 'Test prompt',
    response: 'Test response',
    date: '2025-08-26',
    status: 'answered',
};

describe('HistoryItem', () => {
    it('renders prompt and response', () => {
        render(
            <Provider>
                <HistoryItem item={mockPrompt} index={0} />
            </Provider>,
        );

        const promptEl = screen.getByText(/Test prompt/);
        const responseEl = screen.getByText(/Test response/);

        expect(promptEl).toBeTruthy();
        expect(responseEl).toBeTruthy();
    });

    it('shows eye icon for answered', () => {
        render(
            <Provider>
                <HistoryItem item={mockPrompt} index={0} />
            </Provider>,
        );
        const eye = screen.getByTitle('Analyze reflection');
        expect(eye).toBeTruthy();
    });

    it('shows disabled eye icon for unanswered', () => {
        const unansweredPrompt: Prompt = { ...mockPrompt, status: 'unanswered', response: '' };

        render(
            <Provider>
                <HistoryItem item={unansweredPrompt} index={0} />
            </Provider>,
        );
        const eye = screen.getByTitle('Analyze reflection');
        expect(eye).toBeTruthy();
        expect(eye.classList.contains('opacity-50')).toBe(true);
    });
});
