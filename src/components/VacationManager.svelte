<script lang="ts">
    let firstName: string;
    let lastName: string;
    let option: string;
    let commaList: string;

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

<div class="m-1 flex flex-col m-2 align-middle justify-center items-center">
    <div class="m-1 font-bold text-xl m-2">Set Employee Vacation</div>
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
