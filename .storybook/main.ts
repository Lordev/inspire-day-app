import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    framework: { name: '@storybook/react-vite', options: {} },
    stories: ['../resources/js/**/*.stories.@(tsx|mdx)'],
    addons: ['@storybook/addon-essentials'],
    staticDirs: ['../public'],
};

export default config;
