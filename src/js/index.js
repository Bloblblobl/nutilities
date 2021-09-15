import App from '../svelte/App.svelte';

const app = new App({
	target: document.body,
    props: {
        name: 'World',
    },
});

export default app;