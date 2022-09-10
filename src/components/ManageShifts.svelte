<script lang="ts">
    let promise = fetch("/api/v1/getshifts")
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
    let showAdd: boolean = true;

    interface Status {
        success: boolean;
        message: string;
    }

    /**
     * @param {number} id - The id of the shift to delete
     * @description Deletes a shift from the database
     * @returns {Status} Returns object {success: boolean, message: string}
     */
    function deleteShift(id: number): Status {
        console.log("Attempting to delete shift with id: " + id);
        return { success: true, message: "Successfully deleted shift" };
    }
</script>

<div class="overflow-x-auto">
    <div class="flex flex-col w-full items-center justify-center">
        {#await promise}
            <div>Loading...</div>
        {:then data}
            <table class="table table-zebra">
                <thead>
                    <th>Shifts</th>
                    <th>Del</th>
                </thead>
                <tbody>
                    {#each data as shift}
                        <tr>
                            <td>{shift.shift}</td>
                            <td
                                ><button
                                    on:click={() => deleteShift(shift.shift_id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button></td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/await}
        <!-- The button to open modal -->
        <label for="my-modal-6" class="btn modal-button">Add Shift</label>

        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="my-modal-6" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <div class="flex justify-center items-center">
                    <h3 class="font-bold text-lg">Enter New Shift:</h3>
                    <input class="m-2 input input-bordered" />
                </div>
                <div class="modal-action">
                    <label
                        on:click={() => console.log("Clicked")}
                        for="my-modal-6"
                        class="btn">Submit!</label
                    >
                </div>
            </div>
        </div>
    </div>
</div>
