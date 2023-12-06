<script lang="ts">
	import consola from 'consola';

	let isLoggedIn = false;

	function handleLogin() {
		fetch('/login', { method: 'POST' })
			.then((res) => {
				consola.info(res);
				return res.json;
			})
			.then((_data) => {
				isLoggedIn = true;
			});
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>変更してみる</p>

{#if isLoggedIn}
	<p>Logged in. Enjoy!</p>
{:else}
	<p>NOT logged in</p>
	<button on:click={handleLogin}>LOG IN</button>
{/if}
