<script lang="ts">
    export let onClick;
</script>

<button on:click={onClick}>
    <slot></slot>
</button>

<style>
    button {
        background-color: transparent;
        border: 3px solid white;
        color: white;
        cursor: pointer;
        font-family: 'Rubik', cursive;
        font-size: 1rem;
        font-weight: 300;
        padding: 0.5rem;
        transition: 1s;
    }

    button:hover {
        border-image-slice: 1;
        animation: gradient-rotate 5s infinite;
        animation-timing-function: linear;
    }

    @keyframes gradient-rotate {
        0% {
            border-image-source: linear-gradient(90deg, var(--c-mint), var(--c-yellow));
        }
        25% {
            border-image-source: linear-gradient(180deg, var(--c-mint), var(--c-yellow));
        }
        50% {
            border-image-source: linear-gradient(270deg, var(--c-mint), var(--c-yellow));
        }
        75% {
            border-image-source: linear-gradient(360deg, var(--c-mint), var(--c-yellow));
        }
        100% {
            border-image-source: linear-gradient(90deg, var(--c-mint), var(--c-yellow));
        }
    }
</style>