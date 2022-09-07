<script lang="ts">
    let firstName: string = "OK";
    let lastName;
    let option;
    let commaList;
</script>

<!-- <div
    class="m-1 flex flex-col m-2 align-middle justify-center items-center w-full"
>
    <div class="m-1 font-bold text-xl m-2">Edit Employee</div>
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
    <input
        class="m-1 w-full input input-bordered max-w-xs"
        type="text"
        bind:value={commaList}
        placeholder="8/22, 9/24, 10/10"
    />
</div> -->
<div class="bg-red-500 lowercase text-xl">{firstName}</div>
