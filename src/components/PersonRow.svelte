<script>
  import dayjs from "dayjs";
  export let person = {};
  export let i = 0;
  export let store = {}; // receive the store prop
  export let defaultId;

  function calculateDate(i) {
    return dayjs(store?.selected)
      .add(i - new Date(store?.selected).getDay(), "day")
      .format("MM/DD/YYYY");
  }
</script>

{#if person.day1_id != i && person.day2_id != i && person.shift_id == 0 && person.department_id == defaultId}
  <tr>
    <td
      >{#if person?.vacation?.daysOff.includes(calculateDate(i))}<span
          class="text-red-500">Vac:</span
        >
      {/if}{person.last_name}</td
    >
  </tr>
{/if}
