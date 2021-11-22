<script lang="ts">
    import { route } from '../ts/stores';
    export let to : string;

    const onClick = () => {
        route.set(to);
    };
</script>

<div on:click={onClick}>
    <slot></slot>
</div>