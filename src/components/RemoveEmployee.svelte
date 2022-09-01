<script>
    let firstName = "";
    let lastName = "";

    function handleSubmit() {
        fetch("/api/v1/removeemployee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }
</script>

<div class="w-full flex flex-col align-middle items-center">
    <div class="font-bold text-xl m-2">Remove Employee</div>
    <input class="w-full input input-bordered max-w-xs" type="text" bind:value={firstName} placeholder="First Name" />
    <input class="w-full input input-bordered max-w-xs" type="text" bind:value={lastName} placeholder="Last Name" />
    <button class="m-2 w-1/2 btn btn-primary" on:click={handleSubmit}>Remove Employee</button>
</div>
