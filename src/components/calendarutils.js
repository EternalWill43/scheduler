// calendarUtils.js
import dayjs from "dayjs";

export function calculateDate(i, store) {
  return dayjs(store?.selected)
    .add(i - new Date(store?.selected).getDay(), "day")
    .format("MM/DD/YYYY");
}

export async function removeOT(id) {
  await fetch("/api/v1/removeot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
    .then((res) => res.json())
    .then(() => location.reload());
}

export function changeInner(
  e,
  dateString,
  shift,
  department,
  currentDepartment
) {
  /**
   * @type {HTMLElement}
   */
  let ele = e.target;
  let inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.addEventListener("change", () => {
    ele.innerText = inputElement.value;
  });
  inputElement.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      if (inputElement.value !== "Add OT" && inputElement.value !== "") {
        ele.classList.remove("not-printable");
        await fetch("/api/v1/setot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: inputElement.value,
            shift: shift,
            department: department,
            date: dateString,
          }),
        }).then(() => location.reload());
      } else {
        ele.classList.add("not-printable");
        console.log("Hmm");
      }
      inputElement.remove();
    } else if (e.key === " ") {
      inputElement.value += " ";
      e.preventDefault();
    }
  });
  ele.appendChild(inputElement);
  inputElement.value += " ";
  inputElement.focus();
}
