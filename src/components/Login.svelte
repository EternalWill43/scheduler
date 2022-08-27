<script>
    // Redirect to /register
    let invalidInputs = false;
    function handleRegister(e) {
        location.href = "/register";
    }
        if (uname.length < 1 || pword.length < 1) {
            invalidInputs = true;
            return;
        }
</script>

<div class="flex flex-col justify-center">
    <div class="border-4 border-gray-800 rounded p-3 container">
        <div class="mb-3 font-bold text-lg text-center antialiased underline">
            Login
        </div>
        <div class="font-bold">Username</div>
        <div class="m-2"><input class="p-2 text-black" type="text" /></div>
        <div class="font-bold">Password</div>
        <div class="m-2">
            <input class="p-2 text-black" type="password" />
        </div>
        <div
            class="cursor-pointer block text-center m-2 p-2 rounded hover:bg-sky-700 bg-sky-600"
        >
            Login
        </div>
        <div
            on:click={handleRegister}
            class="cursor-pointer text-center block m-2 p-2 rounded hover:bg-sky-700 bg-sky-600"
        >
            Register
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
        </div>
    </div>
</div>
