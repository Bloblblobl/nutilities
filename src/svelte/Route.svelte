<script lang="ts">
    import { route } from '../ts/stores';
    export let path: string;

    // TODO: set up dev server to handle routing?
    // $: if (path === $route) {
    //     history.pushState({}, '', window.location.origin + $route);
    // }
</script>

{#if path === $route }
    <slot></slot>
{/if}

