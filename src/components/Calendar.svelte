<script>
    import { Datepicker } from "svelte-calendar";
    import dayjs from "dayjs";
    let store;
    let empList = fetch("/api/v1/getemployees").then((res) => res.json());
    let depts = ["Parking Utility", "GTU Agents", "Cashier", "Head Cashiers"];
    let daysOff = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let shifts = ["2200", "0600", "1400"];
    // let day = new Date($store?.selected).getDay();
    let defaultId = 3;
    let defaultShift = 0;
</script>

<div class="not-printable highindex m-4">
    <Datepicker bind:store />
</div>
<div class="m-4">{dayjs($store?.selected).format("MM/DD/YYYY")}, {daysOff[new Date($store?.selected).getDay()]}</div>

<div class="m-4 not-printable">
    <button on:click={() => (defaultId = 1)} class="btn btn-primary">Parking</button>
    <button on:click={() => (defaultId = 2)} class="btn btn-primary">GTU</button>
    <button on:click={() => (defaultId = 3)} class="btn btn-primary">Cashier</button>
    <button on:click={() => (defaultId = 4)} class="btn btn-primary">Head Cashier</button>
    <button on:click={() => (defaultShift = 0)} class="btn btn-success">2200</button>
    <button on:click={() => (defaultShift = 1)} class="btn btn-success">0600</button>
    <button on:click={() => (defaultShift = 2)} class="btn btn-success">1400</button>
</div>

<div class="m-4 text-xl"><u>{depts[defaultId - 1]} List For {shifts[defaultShift]}</u></div>

{#await empList}
    <p>Waiting for data...</p>
    <progress class="progress w-56" />
{:then dat}
    <div class="printable m-4 overflow-x-auto">
        <table class="table w-full">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Department</th>
                    <th>Shift</th>
                    <th>Day Off 1</th>
                    <th>Day Off 2</th>
                </tr>
            </thead>
            <tbody>
                {#each dat as person}
                    {#if person.department_id == defaultId && new Date($store?.selected).getDay() !== person.day1_id && new Date($store?.selected).getDay() !== person.day2_id && person.shift_id == defaultShift}
                        <tr>
                            <td>{person.first_name}</td>
                            <td>{person.last_name}</td>
                            <td>{depts[defaultId - 1]}</td>
                            <td>{shifts[person.shift_id]}</td>
                            <td>{daysOff[person.day1_id]}</td>
                            <td>{daysOff[person.day2_id]}</td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
{:catch err}
    <p>{err}</p>
{/await}

<style>
    .table th:first-child {
        position: relative !important;
    }
    .highindex {
        z-index: 999;
    }
    @media print {
        .not-printable {
            display: none;
        }
        .printable {
            display: block;
        }
    }
</style>
