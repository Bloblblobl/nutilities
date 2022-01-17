<script lang="ts">
    import { getDatesThisWeek } from "../ts/clients/temporal";

    let d = new Date();
    const dates = getDatesThisWeek(d);
</script>

{#each dates as date}
    <div>
        <p>{`${date.month}/${date.date}/${date.year}`}</p>
    </div>
{/each}