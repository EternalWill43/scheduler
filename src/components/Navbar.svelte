<script lang="ts">
    import { onMount } from "svelte";
    let url = ``;

    onMount(() => (url = window.location.href));
</script>

<div class="navbar bg-grey-900">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl">Scheduler</a>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
            <li tabindex="0">
                <a href="/">
                    Employees
                    <svg
                        class="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        ><path
                            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                        /></svg
                    >
                </a>
                <ul class="p-2 bg-base-100">
                    <li><a href="/employees">Employee List</a></li>
                    <li><a href="/manage">Manage Employees</a></li>
                    <li><a href="/vacation">Vacations</a></li>
                </ul>
            </li>
            <li><a href="/departments">Departments</a></li>
            <li><a href="/shifts">Shifts</a></li>
        </ul>
    </div>
</div>
