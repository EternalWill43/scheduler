<script>
    let firstName = "";
    let lastName = "";
    let department = "";
    let shift = "";
    let day1 = "";
    let day2 = "";
    let success = false;
    let err = false;
    function handleSubmit() {
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

<div class="flex flex-col m-2 align-middle justify-center items-center w-full">
    <div class="font-bold text-xl m-2">Add Employee</div>
    <input
        class="w-full input input-bordered max-w-xs"
        type="text"
        bind:value={firstName}
        placeholder="First Name"
    />
    <input
        class="w-full input input-bordered max-w-xs"
        type="text"
        bind:value={lastName}
        placeholder="Last Name"
    />
    <input
        class="w-full input input-bordered max-w-xs"
        type="text"
        bind:value={department}
        placeholder="Department Name"
    />
    <input
        class="w-full input input-bordered max-w-xs"
        type="text"
        bind:value={shift}
        placeholder="Shift i.e., 2200"
    />
    <input
        class="w-full input input-bordered max-w-xs"
        type="text"
        bind:value={day1}
        placeholder="First day off i.e., Sunday"
    />
    <input
        class="w-full input input-bordered max-w-xs"
        type="text"
        bind:value={day2}
        placeholder="Second day off i.e., Monday"
    />
    {#if success}
        <div class="m-2 badge badge-success">Successfully added employee</div>
    {:else if err}
        <div class="m-2 badge badge-error">Error adding employee</div>
    {/if}
    <button class="w-1/2 m-2 btn btn-primary" on:click={handleSubmit}
        >Submit Employee</button
    >
</div>
