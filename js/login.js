// Lógica del login (login.html). Usa js/utileria.js.
const $ = id => document.getElementById(id);

$("login").addEventListener("submit", e => {
  e.preventDefault();
  const c = validarCorreo($("correo").value), p = validarPassword($("password").value);
  $("e-correo").textContent = c ? "" : "Escribe un correo válido, como nombre@mail.com.";
  $("e-password").textContent = p ? "" : "Mínimo 8 caracteres con mayúscula, minúscula, número y símbolo.";
  $("correo").classList.toggle("bad", !c);
  $("password").classList.toggle("bad", !p);
  $("resultado").className = "aviso" + (c && p ? " ok" : "");
  $("resultado").textContent = c && p ? "Datos válidos: acceso concedido (demo)." : "";
});