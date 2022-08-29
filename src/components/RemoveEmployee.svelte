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
                "firstName": firstName,
                "lastName": lastName,
            }), 
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
</script>

<div>
    <input type="text" bind:value={firstName}/>
    <input type="text" bind:value={lastName}/>
    <button on:click={handleSubmit}>Remove Employee</button>
</div>