<script>
    // Redirect to /register
    function handleRegister(e) {
        location.href = "/register";
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
        </div>
    </div>
</div>
