const params = new URLSearchParams(window.location.search);

const name = params.get("fullname");
const email = params.get("email");
const product = params.get("product");
const message = params.get("message");

document.querySelector("#submitted-name").textContent = name;
document.querySelector("#submitted-email").textContent = email;
document.querySelector("#submitted-product").textContent = product;
document.querySelector("#submitted-message").textContent = message;