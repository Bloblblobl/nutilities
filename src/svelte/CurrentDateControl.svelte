<script lang="ts">
    import { getDateString } from '../ts/clients/temporal';
    import { currentDate } from '../ts/stores';

    // append colon so that the date is created with correct locale settings
    const setDate =
        (e: Event) => currentDate.set(new Date(`${(e.target as HTMLInputElement).value}:`));
</script>

<section>
    <button on:click={() => currentDate.previousWeek()}>&lt;</button>
    <input type="date" on:change={setDate} value="{getDateString($currentDate)}"/>
    <button on:click={() => currentDate.nextWeek()}>&gt;</button>
</section>

<style>
    input[type="date"] {
        align-self: center;
        max-width: 15rem;
    }
</style>