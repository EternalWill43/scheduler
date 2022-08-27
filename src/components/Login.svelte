<script>
    let uname = "";
    let pword = "";
    let invalidInputs = false;
    function handleRegister(e) {
        location.href = "/register";
    }

    function handleLogin() {
        if (uname.length < 1 || pword.length < 1) {
            invalidInputs = true;
            return;
        }
        fetch("/api/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uname: uname,
                pword: pword,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    location.href = "/";
                } else {
                    alert(data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
</script>

<div class="container content-center mx-auto flex justify-center">
    <div class="card w-96 bg-neutral">
        <h2 class="text-center font-bold antialiased m-2 text-xl mt-4">
            Login
        </h2>
        <div class="card-body">
            {#if invalidInputs}
                <div class="alert alert-error shadow-lg">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            /></svg
                        >
                        <span>Error! Not valid input.</span>
                    </div>
                </div>
            {/if}
            <h2 class="card-title">Username</h2>
            <input
                bind:value={uname}
                type="text"
                class="input w-full max-w-xs"
            />
            <h2 class="card-title">Password</h2>
            <input
                bind:value={pword}
                type="password"
                class="input w-full max-w-xs mb-3"
            />
            <div class="card-actions flex justify-evenly">
                <button on:click={handleLogin} class="w-1/3 btn btn-primary"
                    >Login</button
                >
                <button on:click={handleRegister} class="w-1/3 btn btn-primary"
                    >Register</button
                >
            </div>
        </div>
    </div>
</div>
