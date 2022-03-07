<script lang="ts">
    import { NuDate, getDateString } from '../ts/clients/temporal';
    import { currentDate } from '../ts/stores';

    // append colon so that the date is created with correct locale settings
    const setDate =
        (e: Event) => currentDate.set(new NuDate(`${(e.target as HTMLInputElement).value}:`));
</script>

<div>
    <button on:click={() => currentDate.previousWeek()}>&lt;</button>
    <input type="date" on:change={setDate} value="{getDateString($currentDate)}"/>
    <button on:click={() => currentDate.nextWeek()}>&gt;</button>
</div>

<style>
    input[type="date"] {
        align-self: center;
        max-width: 15rem;
    }
</style>