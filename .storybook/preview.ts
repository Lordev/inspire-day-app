import React from 'react';
import '../resources/css/app.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Provider as JotaiProvider } from 'jotai';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'app-light',
    values: [
      { name: 'app-light', value: '#f8fafc' },
      { name: 'app-dark', value: '#0f172a' },
    ],
  },
};

export const decorators = [
  (Story) =>
    React.createElement(
      Theme,
      null,
      React.createElement(
        JotaiProvider,
        null,
        React.createElement(
          'div',
          { className: 'p-6 min-h-screen bg-slate-50 dark:bg-slate-900' },
          React.createElement('div', { className: 'max-w-md' }, React.createElement(Story))
        )
      )
    ),
];
