<script lang="ts">
    export let url: string;
    export let name: string;
    export let active: string = "text-gray-400";
</script>

<li>
    <a
      href="{url}"
      class="block py-2 pr-4 pl-3 {active} bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:{active}"
      aria-current="page">{name}</a
    >
</li>