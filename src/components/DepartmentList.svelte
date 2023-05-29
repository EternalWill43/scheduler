<script>
    let depList = fetch("/api/v1/getdepartments").then((res) => res.json());
</script>

<div class="flex flex-col items-center">
    {#await depList}
        <p>Waiting for data...</p>
        <progress class="progress w-56" />
    {:then dat}
        <div class="overflow-x-auto">
            <table class="table w-1/2 table-zebra">
                <thead>
                    <tr>
                        <th>Department Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {#each dat as dep}
                        <tr>
                            <td>
                                {dep.department}
                            </td>
                            <td>
                                <button class="btn btn-danger"
                                    >Remove Department</button
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <button class="btn btn-primary">Add Department</button>
    {/await}
</div>
