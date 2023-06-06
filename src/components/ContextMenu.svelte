<script>
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
        newDiv.style.backgroundColor = "white";
        newDiv.style.border = "1px solid black";
        newDiv.style.borderRadius = "5px";
        newDiv.style.padding = "5px";
        newDiv.style.zIndex = 1000;
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

<div on:contextmenu={contextMenu}>
    <slot />
</div>
