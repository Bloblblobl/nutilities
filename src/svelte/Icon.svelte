<script>
    export let name;
    export let width = '1.5rem';
    export let height = '1.5rem';
</script>

<svg class={$$props.class} {width} {height}>
    <use href={`../img/icons.svg#${name}`} />
</svg>