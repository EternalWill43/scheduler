<script>
    let firstName = "";
    let lastName = "";
    let department = "";
    let shift = "";
    let day1 = "";
    let day2 = "";
    function handleSubmit() {
        fetch("/api/v1/addemployee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "department": department,
                "shift": shift,
                "day1": day1,
                "day2": day2,
            }), 
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
</script>

<div>
    <input type="text" bind:value={firstName}/>
    <input type="text" bind:value={lastName}/>
    <input type="text" bind:value={department}/>
    <input type="text" bind:value={shift}/>
    <input type="text" bind:value={day1}/>
    <input type="text" bind:value={day2}/>
    <button on:click={handleSubmit}>Submit Employee</button>
</div>