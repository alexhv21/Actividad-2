// Lógica del formulario de registro (index.html). Usa js/utileria.js.
const $ = id => document.getElementById(id);
const nombreValido = v => v.trim().split(/\s+/).every(soloLetras);

const reglas = {
  nombre:     v => nombreValido(v) || "Solo letras (se aceptan acentos).",
  apellido:   v => nombreValido(v) || "Solo letras (se aceptan acentos).",
  correo:     v => validarCorreo(v) || "Escribe un correo válido, como nombre@mail.com.",
  telefono:   v => (validarLongitud(v, 10) && v.length === 10) || "Escribe 10 dígitos, sin espacios.",
  nacimiento: v => (calcularEdad(v) >= 0 && calcularEdad(v) < 120) || "Elige una fecha de nacimiento válida.",
  password:   v => validarPassword(v) || "Mínimo 8 caracteres con mayúscula, minúscula, número y símbolo."
};

function actualizarLogin() {
  const mayor = esMayorDeEdad($("nacimiento").value);
  $("btnLogin").disabled = !mayor;
  $("avisoLogin").textContent = $("nacimiento").value && !mayor
    ? "Debes ser mayor de edad para ir al login."
    : "El acceso al login se habilita solo para mayores de edad.";
}

function actualizarUsuario() {
  $("usuario").value = generarUsuario($("nombre").value, $("apellido").value);
}

function actualizarNivel() {
  const n = nivelPassword($("password").value);
  $("nivelPass").className = "nivel " + n;
  $("nivelPass").textContent = n === "ninguna" ? "" : "Fortaleza: " + n;
}

function cerrarModal() { $("modal").hidden = true; }

$("nombre").addEventListener("input", actualizarUsuario);
$("apellido").addEventListener("input", actualizarUsuario);
$("password").addEventListener("input", actualizarNivel);
$("nacimiento").addEventListener("input", actualizarLogin);
$("btnLogin").addEventListener("click", () => {
  if (esMayorDeEdad($("nacimiento").value)) location.href = "login.html";
});

$("registro").addEventListener("submit", e => {
  e.preventDefault();
  let ok = true;
  for (const campo in reglas) {
    const r = reglas[campo]($(campo).value);
    $("e-" + campo).textContent = r === true ? "" : r;
    $(campo).classList.toggle("bad", r !== true);
    if (r !== true) ok = false;
  }
  actualizarLogin();
  if (!ok) return;
  const f = $("nacimiento").value;
  $("mSaludo").textContent = "Hola, " + $("nombre").value.trim() + ". Tu usuario es " + $("usuario").value + " y tu edad es:";
  $("mEdad").textContent = calcularEdad(f) + " años";
  $("mDetalle").textContent = esMayorDeEdad(f)
    ? "Eres mayor de edad: ya puedes ir al login."
    : "Eres menor de edad: no puedes acceder al login.";
  $("modal").hidden = false;
  $("cerrar").focus();
});

$("cerrar").addEventListener("click", cerrarModal);
$("modal").addEventListener("click", e => { if (e.target === $("modal")) cerrarModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarModal(); });