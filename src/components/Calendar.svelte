<script>
  import { onMount } from "svelte";
  import { Datepicker } from "svelte-calendar";
  import dayjs from "dayjs";

  let store;
  let empList = fetch("/api/v1/getemployees")
    .then((res) => res.json())
    .then((data) => data);
  let otList = fetch("/api/v1/getot")
    .then((res) => res.json())
    .then((data) => data);
  let depts = ["Parking Utility", "GTU Agents", "Cashier", "Head Cashiers"];
  let week = true;
  let daysOff = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let shifts = ["2200", "0600", "1400", "All Shifts", "1000", "1800"];
  $: day = dayjs($store?.selected).format("MM/DD/YYYY");
  onMount(() => (day = dayjs($store?.selected).format("MM/DD/YYYY")));
  let defaultId = 3;
  let currentShift = "2200";
  let defaultShift = 0;
  let currentDepartment = "Cashier";

  function changeInner(e) {
    /**
     * @type {HTMLElement}
     */
    let ele = e.target;
    let inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.addEventListener("change", () => {
      ele.innerText = inputElement.value;
    });
    inputElement.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        if (inputElement.value !== "Add OT" && inputElement.value !== "") {
          ele.classList.remove("not-printable");
        } else {
          ele.classList.add("not-printable");
          console.log("Hmm");
        }
        inputElement.remove();
      }
    });
    ele.appendChild(inputElement);
    inputElement.focus();
  }

  async function sortEmployees(value) {
    empList = await Promise.resolve(empList).then((data) => {
      console.log(data);
      if (value != "department_id" && value != "shift_id") {
        data.sort((a, b) => {
          return a[value].localeCompare(b[value]);
        });
      } else {
        data.sort((a, b) => {
          return a[value] - b[value];
        });
      }
      return data;
    });
  }
</script>

<div class="not-printable highindex m-4">
  <Datepicker bind:store />
</div>
<div class="m-4 not-printable">
  {dayjs($store?.selected).format("MM/DD/YYYY")}, {daysOff[
    new Date($store?.selected).getDay()
  ]}
</div>

<div class="md:m-4 not-printable">
  <button
    on:click={() => {
      defaultId = 1;
      currentDepartment = "Parking";
    }}
    class="m-1 btn btn-primary {currentDepartment === 'Parking'
      ? 'btn-outline'
      : ''}">Parking</button
  >
  <button
    on:click={() => {
      defaultId = 2;
      currentDepartment = "GTU";
    }}
    class="m-1 btn btn-primary {currentDepartment === 'GTU'
      ? 'btn-outline'
      : ''}">GTU</button
  >
  <button
    on:click={() => {
      defaultId = 3;
      currentDepartment = "Cashier";
    }}
    class="m-1 btn btn-primary {currentDepartment === 'Cashier'
      ? 'btn-outline'
      : ''}">Cashier</button
  >
  <button
    on:click={() => {
      defaultId = 4;
      currentDepartment = "Head Cashier";
    }}
    class="m-1 btn btn-primary {currentDepartment === 'Head Cashier'
      ? 'btn-outline'
      : ''}">Head Cashier</button
  >
  <button
    on:click={() => {
      defaultShift = 0;
      currentShift = "2200";
    }}
    class="m-1 btn btn-success {currentShift === '2200' ? 'btn-outline' : ''}"
    >2200</button
  >
  <button
    on:click={() => {
      defaultShift = 1;
      currentShift = "0600";
    }}
    class="m-1 btn btn-success {currentShift === '0600' ? 'btn-outline' : ''}"
    >0600</button
  >
  <button
    on:click={() => {
      defaultShift = 2;
      currentShift = "1400";
    }}
    class="m-1 btn btn-success {currentShift === '1400' ? 'btn-outline' : ''}"
    >1400</button
  >
  <button
    on:click={() => {
      defaultShift = 3;
      currentShift = "All Shifts";
    }}
    class="m-1 btn btn-success {currentShift === 'All Shifts'
      ? 'btn-outline'
      : ''}">All</button
  >
  <button on:click={() => (week = !week)} class="m-1 btn btn-warning"
    >{week ? "Week" : "Day"}</button
  >
</div>

<div class="m-4 text-xl">
  {#if week}
    <u
      >{depts[defaultId - 1]} List For The Week For Week Ending: {dayjs(
        $store?.selected
      )
        .add(6 - new Date($store?.selected).getDay(), "d")
        .format("MM/DD/YYYY")}</u
    >
  {:else}
    <u>{depts[defaultId - 1]} List For {shifts[defaultShift]}</u>
  {/if}
</div>

{#if week}
  {#await empList}
    <div>...Loading</div>
  {:then dat}
    <div class="text-xl text-bold border-b-2 border-zinc-600">
      {shifts[0]}
    </div>
    <div class="flex justify-center">
      {#each daysOff as dayOfWeek, i}
        <div class="overflow-x-visible">
          <table class="table table-zebra printable">
            <thead>
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
                {#if person.day1_id != i && person.day2_id != i && person.shift_id == 0 && person.department_id == defaultId}
                  <tr>
                    <td
                      >{#if person?.vacation?.daysOff.includes(dayjs($store?.selected)
                          .add(i - new Date($store?.selected).getDay(), "day")
                          .format("MM/DD/YYYY"))}<span class="text-red-500"
                          >Vac:</span
                        >
                      {/if}{person.last_name}</td
                    >
                  </tr>
                {/if}
              {/each}
              <tr
                ><td class="text-green-500"
                  ><button class="not-printable" on:click={changeInner}
                    >Add OT</button
                  ></td
                ></tr
              >
            </tbody>
          </table>
        </div>
      {/each}
    </div>
    <div class="text-xl text-bold border-b-2 border-zinc-600">
      {shifts[1]}
    </div>
    <div class="flex justify-center">
      {#each daysOff as dayOfWeek, i}
        <div class="overflow-x-visible">
          <table class="table table-zebra printable">
            <thead>
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
                {#if person.day1_id != i && person.day2_id != i && person.shift_id == 1 && person.department_id == defaultId}
                  <tr>
                    <td
                      >{person.last_name}{#if person?.vacation?.daysOff.includes(dayjs($store?.selected)
                          .add(i - new Date($store?.selected).getDay(), "day")
                          .format("MM/DD/YYYY"))}<span>Vac</span>{/if}</td
                    >
                  </tr>
                {/if}
              {/each}
              <tr
                ><td class="text-green-500"
                  ><button class="not-printable" on:click={changeInner}
                    >Add OT</button
                  ></td
                ></tr
              >
            </tbody>
          </table>
        </div>
      {/each}
    </div>
    <div class="text-xl text-bold border-b-2 border-zinc-600">
      {shifts[4]}
    </div>
    <div class="flex justify-center">
      {#each daysOff as dayOfWeek, i}
        <div class="overflow-x-visible">
          <table class="table table-zebra printable">
            <thead>
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
                {#if person.day1_id != i && person.day2_id != i && person.shift_id == 4 && person.department_id == defaultId}
                  <tr>
                    <td
                      >{#if person?.vacation?.daysOff.includes(dayjs($store?.selected)
                          .add(i - new Date($store?.selected).getDay(), "day")
                          .format("MM/DD/YYYY"))}<span class="text-red-500"
                          >Vac:</span
                        >
                      {/if}{person.last_name}</td
                    >
                  </tr>
                {/if}
              {/each}
              <tr
                ><td class="text-green-500"
                  ><button class="not-printable" on:click={changeInner}
                    >Add OT</button
                  ></td
                ></tr
              >
            </tbody>
          </table>
        </div>
      {/each}
    </div>
    <div class="text-xl text-bold border-b-2 border-zinc-600">
      {shifts[2]}
    </div>
    <div class="flex justify-center">
      {#each daysOff as dayOfWeek, i}
        <div class="overflow-x-visible">
          <table class="table table-zebra printable">
            <thead>
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
                {#if person.day1_id != i && person.day2_id != i && person.shift_id == 2 && person.department_id == defaultId}
                  <tr>
                    <td
                      >{person.last_name}{#if person?.vacation?.daysOff.includes(dayjs($store?.selected)
                          .add(i - new Date($store?.selected).getDay(), "day")
                          .format("MM/DD/YYYY"))}<span>Vac</span>{/if}</td
                    >
                  </tr>
                {/if}
              {/each}
              <tr
                ><td class="text-green-500"
                  ><button class="not-printable" on:click={changeInner}
                    >Add OT</button
                  ></td
                ></tr
              >
            </tbody>
          </table>
        </div>
      {/each}
    </div>
    <div class="text-xl text-bold border-b-2 border-zinc-600">
      {shifts[5]}
    </div>
    <div class="flex justify-center">
      {#each daysOff as dayOfWeek, i}
        <div class="overflow-x-visible">
          <table class="table table-zebra printable">
            <thead>
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
                {#if person.day1_id != i && person.day2_id != i && person.shift_id == 5 && person.department_id == defaultId}
                  <tr>
                    <td
                      >{#if person?.vacation?.daysOff.includes(dayjs($store?.selected)
                          .add(i - new Date($store?.selected).getDay(), "day")
                          .format("MM/DD/YYYY"))}<span class="text-red-500"
                          >Vac:</span
                        >
                      {/if}{person.last_name}</td
                    >
                  </tr>
                {/if}
              {/each}
              <tr
                ><td class="text-green-500"
                  ><button class="not-printable" on:click={changeInner}
                    >Add OT</button
                  ></td
                ></tr
              >
            </tbody>
          </table>
        </div>
      {/each}
    </div>
  {/await}
{:else}
  {#await empList}
    <p>Waiting for data...</p>
    <progress class="progress w-56" />
  {:then dat}
    <div class="printable m-4">
      <table class="table w-full">
        <thead>
          <tr>
            <th
              class="cursor-pointer"
              on:click={() => sortEmployees("first_name")}>First Name</th
            >
            <th
              class="cursor-pointer"
              on:click={() => sortEmployees("last_name")}>Last Name</th
            >
            <th
              class="cursor-pointer"
              on:click={() => sortEmployees("department_id")}>Department</th
            >
            <th
              class="cursor-pointer"
              on:click={() => sortEmployees("shift_id")}>Shift</th
            >
            <th>Day Off 1</th>
            <th>Day Off 2</th>
          </tr>
        </thead>
        <tbody>
          {#each dat as person}
            {#if person.department_id == defaultId && ((new Date($store?.selected).getDay() !== person.day1_id && new Date($store?.selected).getDay() !== person.day2_id) || week) && (person.shift_id == defaultShift || defaultShift == 3)}
              {#if person?.vacation?.daysOff.includes(day)}
                <tr class="not-printable">
                  <td class="bg-red-500">{person.first_name}</td>
                  <td>{person.last_name}</td>
                  <td>{depts[defaultId - 1]}</td>
                  <td>{shifts[person.shift_id]}</td>
                  <td>{daysOff[person.day1_id]}</td>
                  <td>{daysOff[person.day2_id]}</td>
                </tr>
              {:else}
                <tr>
                  <td>{person.first_name}</td>
                  <td>{person.last_name}</td>
                  <td>{depts[defaultId - 1]}</td>
                  <td>{shifts[person.shift_id]}</td>
                  <td>{daysOff[person.day1_id]}</td>
                  <td>{daysOff[person.day2_id]}</td>
                </tr>
              {/if}
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  {:catch err}
    <p>{err}</p>
  {/await}
{/if}

<style>
  .table th:first-child {
    position: relative !important;
    z-index: 0 !important;
  }
  .highindex {
    z-index: 999;
  }
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
