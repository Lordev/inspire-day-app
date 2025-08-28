import type { Meta, StoryObj } from '@storybook/react';
import CalendarDate from './calendar-date';

const meta: Meta<typeof CalendarDate> = {
    title: 'Components/CalendarDate',
    component: CalendarDate,
};

export default meta;
type Story = StoryObj<typeof CalendarDate>;

export const Today: Story = {
    args: {
        date: new Date(),
        className: '',
    },
};

export const SpecificDate: Story = {
    args: { date: '2025-08-02' },
};
