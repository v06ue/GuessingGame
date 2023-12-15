const form = document.querySelector("[data-start-form]");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const nameValue = form.name.value;

    if (nameValue.trim().length < 1) {
        return;
    }

    username = nameValue;

    window.location.href = `game.html?username=${username}`;
}
