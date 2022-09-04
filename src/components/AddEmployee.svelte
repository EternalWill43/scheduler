<script>
    let firstName = "";
    let lastName = "";
    let department = "";
    let shift = "";
    let day1 = "";
    let day2 = "";
    let success = false;
    let err = false;
    let missing = false;
    function isMissing() {
        if (
            firstName == "" ||
            lastName == "" ||
            department == "" ||
            shift == "" ||
            day1 == "" ||
            day2 == ""
        ) {
            missing = true;
            return true;
        } else {
            missing = false;
            return false;
        }
    }
    function handleSubmit() {
        if (isMissing()) return;
        fetch("/api/v1/addemployee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                department: department,
                shift: shift,
                day1: day1,
                day2: day2,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    success = true;
                    err = false;
                    firstName = "";
                    lastName = "";
                    department = "";
                    shift = "";
                    day1 = "";
                    day2 = "";
                } else {
                    success = false;
                    err = true;
                }
            });
    }
</script>

<div
    class="m-1 flex flex-col m-2 align-middle justify-center items-center w-full"
>
    <div class="m-1 font-bold text-xl m-2">Add Employee</div>
    <input
        class="m-1 w-full input input-bordered max-w-xs"
        type="text"
        bind:value={firstName}
        placeholder="First Name"
    />
    <input
        class="m-1 w-full input input-bordered max-w-xs"
        type="text"
        bind:value={lastName}
        placeholder="Last Name"
    />
    <select
        bind:value={department}
        class="m-1 select select-bordered w-full max-w-xs"
    >
        <option>Parking Utility</option>
        <option>GTU</option>
        <option>Cashier</option>
        <option>Head Cashier</option>
    </select>
    <select
        bind:value={shift}
        class="m-1 select select-bordered w-full max-w-xs"
    >
        <option>2200</option>
        <option>0600</option>
        <option>1400</option>
    </select>
    <select
        bind:value={day1}
        class="m-1 select select-bordered w-full max-w-xs"
    >
        <option>Sunday</option>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>>
        <option>Saturday</option>
    </select>
    <select
        bind:value={day2}
        class="m-1 select select-bordered w-full max-w-xs"
    >
        <option>Sunday</option>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>>
        <option>Saturday</option>
    </select>
    {#if success}
        <div class="m-2 badge badge-success">Successfully edited employee</div>
    {:else if err}
        <div class="m-2 badge badge-error">Error adding employee</div>
    {/if}
    {#if missing}
        <div class="m-2 badge badge-error">You are missing some fields</div>
    {/if}
    <button class="w-1/2 m-2 btn btn-primary" on:click={handleSubmit}
        >Submit Employee</button
    >
</div>
