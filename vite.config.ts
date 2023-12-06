import msw from '@iodigital/vite-plugin-msw';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import { handlers } from './src/mocks/handlers';

export default defineConfig({
	plugins: [sveltekit(), msw({ handlers, mode: 'browser', build: false })],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
