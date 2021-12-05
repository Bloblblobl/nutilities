<script lang="ts">
    import { route } from '../ts/stores';
    export let path: string;

    // TODO: figure out how to handle paths in JS
    // $: if (path === $route) {
    //     history.pushState({}, '', window.location.origin + $route);
    // }
</script>

{#if path === $route }
    <slot></slot>
{/if}

