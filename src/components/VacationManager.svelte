<script lang="ts">
    let option: string;
    let firstNameGet: string;
    let lastNameGet: string;
    let vacListGet: string;
    let optionGet: string;

    let isGetVacSuccess: boolean = false;
    let isGetVacError: boolean = false;
    let isSetVacSuccess: boolean = false;
    let isSetVacError: boolean = false;

    const handleGetVac = async () => {
        let res = await fetch("/api/v1/getemployeevacation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstNameGet,
                lastName: lastNameGet,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                vacListGet = data[0]?.vacation?.daysOff;
                if (data[1].success) {
                    isGetVacSuccess = true;
                    isGetVacError = false;
                    setTimeout(() => {
                        isGetVacSuccess = false;
                    }, 3000);
                } else {
                    isGetVacSuccess = false;
                    isGetVacError = true;
                }
            });
    };

    const handleSubmit = async () => {
        let res = await fetch("/api/v1/setvacation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstNameGet,
                lastName: lastNameGet,
                vacList: vacListGet,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    isSetVacSuccess = true;
                    isSetVacError = false;
                } else {
                    isSetVacSuccess = false;
                    isSetVacError = true;
                }
            });
    };
</script>

<div class="container mx-auto">
    <div class="m-1 flex flex-col m-2 align-middle justify-center items-center">
        <div class="m-1 font-bold text-xl m-2">Get/Set Employee Vacation</div>
        <input
            class="m-1 w-full input input-bordered max-w-xs"
            type="text"
            bind:value={firstNameGet}
            placeholder="First Name"
        />
        <input
            class="m-1 w-full input input-bordered max-w-xs"
            type="text"
            bind:value={lastNameGet}
            placeholder="Last Name"
        />
        <select
            bind:value={optionGet}
            class="m-1 select select-bordered w-full max-w-xs disabled"
            disabled
        >
            <option>Single Vacation Days</option>
            <option>Vacation Range</option>
        </select>
        {#if option == "Single Vacation Days"}
            <textarea
                class="m-1 w-full textarea textarea-bordered max-w-xs"
                type="text"
                bind:value={vacListGet}
                placeholder="8/22/2022, 9/24/2022, 10/10/2022"
            />
        {:else}
            <input
                class="m-1 w-full input input-bordered max-w-xs"
                type="text"
                bind:value={vacListGet}
                placeholder="10/1/2022 - 10/15/2022"
            />
        {/if}
        <div class="m-2 flex items-center justify-center">
            <button on:click={handleSubmit} class="m-1 w-1/2 btn btn-primary"
                >Submit</button
            >
            <button on:click={handleGetVac} class="m-1 w-1/2 btn btn-primary"
                >Get</button
            >
        </div>
        {#if isGetVacSuccess}
            <div class="m-1 text-green-500">Success!</div>
        {:else if isGetVacError}
            <div class="m-1 text-red-500">Error!</div>
        {/if}
        {#if isSetVacSuccess}
            <div class="m-1 text-green-500">Success!</div>
        {:else if isSetVacError}
            <div class="m-1 text-red-500">Error!</div>
        {/if}
    </div>
</div>
