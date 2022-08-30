<script lang="ts">
  import NavLink from "./NavLink.svelte";
  import {onMount} from 'svelte';
  let url = ``;

  onMount(() => url = window.location.href);
</script>

<div class="border-b-4 border-indigo-500 navbar bg-gray-900">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl">Scheduler</a>
  </div>
  <div class="flex-none gap-2">
    <div class="form-control">
      <input type="text" placeholder="Search" class="input input-bordered" />
    </div>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          
        </div>
      </label>
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
