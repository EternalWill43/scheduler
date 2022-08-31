<script lang="ts">
    import NavLink from "./NavLink.svelte";
    import { onMount } from "svelte";
    let url = ``;

    onMount(() => (url = window.location.href));
</script>

<div class="navbar bg-gray-900">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-2xl">Scheduler</a>
    </div>
    <div class="flex-none gap-2">
        <div class="dropdown dropdown-end">
            <label for="" tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h7"
                        /></svg
                    >
                </div>
            </label>
            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li>
                    <a href="/" class="justify-between"> Manage Employees </a>
                </li>
                <li><a href="/">Manage Departments</a></li>
                <li><a href="/">Manage Shifts</a></li>
            </ul>
        </div>
    </div>
</div>
