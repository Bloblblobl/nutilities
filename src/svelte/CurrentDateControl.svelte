<script lang="ts">
    import { NuDate } from '../ts/clients/temporal';
    import { currentDate } from '../ts/stores';

    // append colon so that the date is created with correct locale settings
    const setDate =
        (e: Event) => currentDate.set(new NuDate(`${(e.target as HTMLInputElement).value}:`));
</script>

<button on:click={() => currentDate.previousWeek()}>&lt;</button>
<input type="date" on:change={setDate} value="{$currentDate.toFormattedString('Py-m-d')}"/>
<button on:click={() => currentDate.nextWeek()}>&gt;</button>

<style>
    input[type="date"] {
        align-self: center;
        max-width: 15rem;
    }
</style>