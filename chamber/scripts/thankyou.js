const currentUrl = window.location.href;

const everything = currentUrl.split("?");

const formData = everything[1].split("&");

function show(value) {
    const result = formData.find((element) => element.startsWith(value));

    if (result) {
        return decodeURIComponent(result.split("=")[1].replace(/\+/g, " "));
    }

    return "";
}

document.querySelector("#first-name").textContent = show("first");
document.querySelector("#last-name").textContent = show("last");
document.querySelector("#email").textContent = show("email");
document.querySelector("#phone").textContent = show("phone");
document.querySelector("#organization").textContent = show("organization");
document.querySelector("#timestamp-display").textContent = show("timestamp");