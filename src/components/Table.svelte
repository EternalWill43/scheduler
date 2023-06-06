<script>
  export let dayOfWeek;
  export let i;
  export let dat;
  export let store;
  export let currentDepartment;
  export let defaultId;
  export let otList;
  export let shift;
  console.log(shift);
  import * as dayjs from "dayjs";
  import PersonRow from "./PersonRow.svelte";
  import { changeInner, removeOT } from "./calendarutils";
</script>

<div style="z-index: 0;" class="overflow-x-visible">
  <table class="table table-zebra printable">
    <thead style="z-index: -5">
      <th
        ><div>
          <div>{dayOfWeek}</div>
          <div>
            {dayjs($store?.selected)
              .add(i - new Date($store?.selected).getDay(), "day")
              .format("MM/DD/YYYY")}
          </div>
        </div></th
      >
    </thead>
    <tbody>
      {#each dat as person}
        {#if person.shift_id == shift}
          <PersonRow
            day={dayjs($store?.selected)
              .add(i - new Date($store?.selected).getDay(), "day")
              .format("MM/DD/YYYY")}
            {person}
            {i}
            {defaultId}
          />
        {/if}
      {/each}
      {#each otList as otInstance}
        {#if otInstance.date.includes(dayjs($store?.selected)
            .add(i - new Date($store?.selected).getDay(), "day")
            .format("MM/DD/YYYY")) && otInstance.shift === shift && otInstance.department === currentDepartment}
          <tr>
            <td>
              <div class="flex">
                <div class="text-green-500">
                  {otInstance.name}
                  <button
                    class="text-red-500 not-printable"
                    on:click={() => removeOT(otInstance.id)}
                    >✖
                  </button>
                </div>
              </div>
            </td></tr
          >
        {/if}
      {/each}
      <div />
      <tr
        ><td class="text-blue-500"
          ><button
            class="not-printable"
            on:click={(e) =>
              changeInner(
                e,
                dayjs($store?.selected)
                  .add(i - new Date($store?.selected).getDay(), "day")
                  .format("MM/DD/YYYY"),
                shift,
                currentDepartment
              )}>Add OT</button
          ></td
        ></tr
      >
    </tbody>
  </table>
</div>

<style>
  @media print {
    .not-printable {
      display: none;
    }
    .printable {
      height: 33%;
      overflow: hidden;
      font-size: 9.5pt;
    }
  }
</style>
