<script>
  let uname = "";
  let pword = "";
  let invalidInputs = false;
  let loggingIn = false;
  function handleRegister() {
    location.href = "/register";
  }

  function handleLogin() {
    if (uname.length < 1 || pword.length < 1) {
      invalidInputs = true;
      return;
    }
    loggingIn = true;
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
        if (data.success) {
          location.href = "/";
        } else {
          alert(data.message);
        }
        loggingIn = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }
</script>

<div class="container content-center mx-auto flex justify-center">
  <div class="card w-96 bg-neutral">
    <h2 class="text-center font-bold antialiased m-2 text-xl mt-4">Login</h2>
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
      <!-- svelte-ignore a11y-autofocus -->
      <input
        bind:value={uname}
        type="text"
        class="input w-full max-w-xs"
        autofocus
      />
      <h2 class="card-title">Password</h2>
      <input
        on:keydown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
        bind:value={pword}
        type="password"
        class="input w-full max-w-xs mb-3"
      />
      <div class="card-actions flex justify-evenly">
        <button on:click={handleLogin} class="w-1/3 btn btn-primary"
          >{#if loggingIn}<span
              ><svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg></span
            >{/if} Login</button
        >
        <button on:click={handleRegister} class="w-1/3 btn btn-primary"
          >Register</button
        >
      </div>
    </div>
  </div>
</div>
