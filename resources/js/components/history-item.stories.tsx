import { Theme } from '@radix-ui/themes';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider as JotaiProvider } from 'jotai';
import HistoryItem from './history-item';
import Prompt from '@/types';
import { userEvent, within } from '@storybook/test';

const meta: Meta<typeof HistoryItem> = {
    title: 'Components/HistoryItem',
    component: HistoryItem,
    decorators: [
        (Story) => (
            <Theme>
                <JotaiProvider>
                    <div style={{ padding: 24, maxWidth: 420 }}>
                        <Story />
                    </div>
                </JotaiProvider>
            </Theme>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof HistoryItem>;

const answeredItem = {
    id: 1,
    prompt: 'What made you smile today?',
    response: 'A walk in the park and a nice chat with a friend.',
    status: 'answered',
    created_at: '2025-08-27T10:00:00Z',
};

const pendingItem = {
    id: 2,
    prompt: 'What are you looking forward to?',
    response: null,
    status: 'pending',
    created_at: '2025-08-28T08:00:00Z',
};

export const Answered: Story = {
    args: {
        item: answeredItem as Prompt,
        index: 0,
    },
};

export const Pending: Story = {
    args: {
        item: pendingItem as Prompt,
        index: 1,
    },
};

Answered.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const analyzeBtn = await canvas.getByLabelText('Analyze reflection');
    await userEvent.click(analyzeBtn);
    await within(document.body).findByRole('button', { name: /close/i });
};

Pending.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const analyzeBtns = canvas.queryAllByLabelText('Analyze reflection');
    if (analyzeBtns.length > 0 && analyzeBtns[0].className.includes('invisible') === false) {
        throw new Error('expected analyze button to not be available for pending item');
    }
};
