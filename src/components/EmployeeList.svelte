<script>
  async function getEmployees() {
    const res = await fetch("/api/v1/getemployees")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => error);
    return res;
  }
  let promise = getEmployees();
</script>

<div>
  {#await promise}
    <p>...waiting</p>
  {:then data}
    <div class="overflow-x-auto">
      <table class="table table-normal">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department Name</th>
            <th>Shift</th>
            <th>Vacation</th>
          </tr>
        </thead>
        <tbody>
          {#each data as employee}
            <tr>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              {#if employee.department_id == 1}
                <td>Parking</td>
              {:else if employee.department_id == 2}
                <td>GTU</td>
              {:else if employee.department_id == 3}
                <td>Cashier</td>
              {:else if employee.department_id == 4}
                <td>Head Cashier</td>
              {/if}
              {#if employee.shift_id == 0}
                <td>2200</td>
              {:else if employee.shift_id == 1}
                <td>0600</td>
              {:else if employee.shift_id == 4}
                <td>1000</td>
              {:else if employee.shift_id == 2}
                <td>1400</td>
              {:else if employee.shift_id == 5}
                <td>1800</td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:catch error}
    <p>There was an error: {error.message}</p>
  {/await}
</div>
