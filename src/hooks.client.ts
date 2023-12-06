// Follow [the official example](https://github.com/mswjs/examples-new/blob/main/examples/with-svelte/src/hooks.client.ts)

import { dev } from '$app/environment';
import consola from 'consola';

consola.info('hooks.client.ts loaded!');
if (dev) {
	const { worker } = await import('./mocks/browser');

	await worker.start({
		onUnhandledRequest(request, print) {
			// Do not warn on unhandled internal Svelte requests.
			// Those are not meant to be mocked.
			if (request.url.includes('svelte')) {
				return;
			}

			print.warning();
		}
	});
}
