const formNewsletter = document.querySelector("#newsletter-form");
const inputEmail = document.querySelector("#newsletter-email");
const mensajeNewsletter = document.querySelector("#newsletter-mensaje");
let newsletterTimeout;
formNewsletter.addEventListener("submit", function(event) {
 event.preventDefault();
 const email = inputEmail.value.trim();
 clearTimeout(newsletterTimeout);
 if (!email.includes("@")) {
   mensajeNewsletter.textContent = "Ingresá un correo válido.";
   newsletterTimeout = setTimeout(() => { mensajeNewsletter.textContent = ""; }, 4000);
   return;
 }
 const suscriptores = JSON.parse(localStorage.getItem("newsletter")) || [];
 if (suscriptores.includes(email)) {
   mensajeNewsletter.textContent = "Este correo ya está suscripto.";
   newsletterTimeout = setTimeout(() => { mensajeNewsletter.textContent = ""; }, 4000);
   return;
 }
 suscriptores.push(email);
 localStorage.setItem("newsletter", JSON.stringify(suscriptores));
 mensajeNewsletter.textContent = "Suscripción registrada correctamente.";
 newsletterTimeout = setTimeout(() => { mensajeNewsletter.textContent = ""; }, 4000);
 formNewsletter.reset();
});