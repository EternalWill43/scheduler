<script lang="ts">
    let firstName: string;
    let lastName: string;
    let option: string;
    let commaList: string;

    let firstNameGet: string;
    let lastNameGet: string;
    let vacListGet: string;
    let optionGet: string;

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
            .then((data) => (vacListGet = data[0]?.vacation?.daysOff));
    };

    const handleSubmit = async () => {
        console.log(firstName, lastName, commaList);
        let res = await fetch("/api/v1/setvacation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                vacList: commaList,
            }),
        }).then((res) => res.json());
    };
</script>

<div class="grid grid-cols-2">
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
            class="m-1 select select-bordered w-full max-w-xs"
        >
            <option>Single Vacation Days</option>
            <option>Vacation Range</option>
        </select>
        {#if option == "Single Vacation Days"}
            <input
                class="m-1 w-full input input-bordered max-w-xs"
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
    </div>

    <div class="m-1 flex flex-col m-2 align-middle justify-center items-center">
        <div class="m-1 font-bold text-xl m-2">Reset Employee Vacation</div>
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
            bind:value={option}
            class="m-1 select select-bordered w-full max-w-xs"
        >
            <option>Single Vacation Days</option>
            <option>Vacation Range</option>
        </select>
        {#if option == "Single Vacation Days"}
            <input
                class="m-1 w-full input input-bordered max-w-xs"
                type="text"
                bind:value={commaList}
                placeholder="8/22/2022, 9/24/2022, 10/10/2022"
            />
        {:else}
            <input
                class="m-1 w-full input input-bordered max-w-xs"
                type="text"
                bind:value={commaList}
                placeholder="10/1/2022 - 10/15/2022"
            />
        {/if}
        <button on:click={handleSubmit} class="btn btn-primary">Submit</button>
    </div>
</div>
