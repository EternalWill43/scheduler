<script>
  export let person = {};
  export let i = 0;
  export let defaultId;
  export let day;
  let m = { x: 0, y: 0 };

  async function handleVacation() {
    let currentDaysOff = person.vacation?.daysOff ?? "";
    currentDaysOff = currentDaysOff.split(",");
    let dateIndex = currentDaysOff.indexOf(day);
    if (dateIndex !== -1) {
      currentDaysOff.splice(dateIndex, 1);
    } else {
      currentDaysOff.push(day);
    }
    let finalList = currentDaysOff.join(",");

    await fetch("/api/v1/setvacation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: person.first_name,
        lastName: person.last_name,
        vacList: finalList,
      }),
    }).then(() => location.reload());
  }

  function contextMenu(e) {
    console.log(day);
    console.log(e);
    e.preventDefault();
    m.x = e.clientX;
    m.y = e.clientY;
    //create a new div element
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", "contextMenu");
    newDiv.setAttribute("class", "context-menu");
    newDiv.setAttribute("style", `top: ${m.y}px; left: ${m.x}px;`);
    newDiv.style.position = "absolute";
    newDiv.style.top = `${m.y + window.scrollY}px`;
    newDiv.style.left = `${m.x + window.scrollX}px`;
    newDiv.classList.add("context-menu");
    let innerButton = document.createElement("button");
    innerButton.setAttribute("class", "btn btn-primary");
    innerButton.innerHTML = "Vacation";
    innerButton.addEventListener("click", handleVacation);
    newDiv.appendChild(innerButton);
    newDiv.addEventListener("mouseleave", handleClose);

    document.body.appendChild(newDiv);
  }

  function handleClose() {
    let contextMenu = document.getElementById("contextMenu");
    contextMenu.remove();
  }
</script>

{#if person.day1_id != i && person.day2_id != i && person.department_id == defaultId}
  <tr on:contextmenu={contextMenu}>
    <td
      >{#if person?.vacation?.daysOff.includes(day)}<span class="text-red-500"
          >Vac:</span
        >
      {/if}{person.last_name}</td
    >
  </tr>
{/if}

<style>
  :global(.context-menu) {
    position: absolute;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    z-index: 1000;
  }
</style>
