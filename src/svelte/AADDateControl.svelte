<script lang="ts">
    import { getDateString } from '../ts/clients/temporal';
    import { aadDate } from '../ts/stores';

    // append colon so that the date is created with correct locale settings
    const setDate = (e) => aadDate.set(new Date(`${e.target.value}:`));
</script>

<section>
    <button on:click={() => aadDate.previousWeek()}>&lt;</button>
    <input type="date" on:change={setDate} value="{getDateString($aadDate)}"/>
    <button on:click={() => aadDate.nextWeek()}>&gt;</button>
</section>

<style>
    input[type="date"] {
        align-self: center;
        max-width: 15rem;
    }
</style>