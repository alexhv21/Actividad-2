/**
 * utileria.js — Librería de validaciones y utilidades (JS puro, sin dependencias).
 * Las fechas se reciben como "AAAA-MM-DD" (valor de <input type="date">) u objeto Date.
 */

/** Convierte a Date local (sin desfase de zona horaria). Devuelve null si es inválida. */
function _parseFecha(f) {
  if (f instanceof Date) return isNaN(f) ? null : new Date(f.getFullYear(), f.getMonth(), f.getDate());
  if (typeof f !== "string") return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(f.trim());
  if (!m) return null;
  const [, y, mo, d] = m.map(Number);
  const fecha = new Date(y, mo - 1, d);
  return fecha.getFullYear() === y && fecha.getMonth() === mo - 1 && fecha.getDate() === d ? fecha : null;
}

/**
 * Valida el formato de un correo electrónico.
 * @param {string} correo
 * @returns {boolean} true si tiene formato usuario@dominio.ext
 * @example validarCorreo("ana@mail.com"); // true
 * @example validarCorreo("ana@mail");     // false
 */
function validarCorreo(correo) {
  return typeof correo === "string" &&
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(correo.trim());
}

/**
 * Verifica que el texto contenga solo letras (mayúsculas/minúsculas, vocales acentuadas, ü y ñ).
 * No acepta espacios, números ni símbolos.
 * @param {string} texto
 * @returns {boolean}
 * @example soloLetras("José"); // true
 * @example soloLetras("Ana2"); // false
 */
function soloLetras(texto) {
  return typeof texto === "string" && /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+$/.test(texto);
}

/**
 * Valida que un número entero positivo (o cadena de dígitos) no exceda cierta longitud.
 * @param {number|string} numero
 * @param {number} maxLongitud máximo de dígitos permitidos
 * @returns {boolean} true si son solo dígitos y su longitud es <= maxLongitud
 * @example validarLongitud(5512345678, 10); // true
 * @example validarLongitud(123456, 4);      // false
 */
function validarLongitud(numero, maxLongitud) {
  if (!Number.isInteger(maxLongitud) || maxLongitud < 1) return false;
  const t = String(numero).trim();
  return /^\d+$/.test(t) && t.length <= maxLongitud;
}

/**
 * Calcula la edad en años cumplidos.
 * @param {string|Date} fechaNacimiento "AAAA-MM-DD" o Date
 * @returns {number} edad entera; -1 si la fecha es inválida
 * @example calcularEdad("2000-05-20"); // 26 (según la fecha actual)
 */
function calcularEdad(fechaNacimiento) {
  const nac = _parseFecha(fechaNacimiento);
  if (!nac) return -1;
  const hoy = new Date();
  let edad = hoy.getFullYear() - nac.getFullYear();
  const dm = hoy.getMonth() - nac.getMonth();
  if (dm < 0 || (dm === 0 && hoy.getDate() < nac.getDate())) edad--;
  return edad;
}

/**
 * Indica si la persona tiene 18 años o más.
 * @param {string|Date} fechaNacimiento
 * @returns {boolean} false si es menor o la fecha es inválida
 * @example esMayorDeEdad("2015-01-01"); // false
 */
function esMayorDeEdad(fechaNacimiento) {
  return calcularEdad(fechaNacimiento) >= 18;
}

/**
 * Valida una contraseña: mínimo 8 caracteres, con mayúscula, minúscula, número y carácter especial.
 * @param {string} password
 * @returns {boolean}
 * @example validarPassword("Hola#2026"); // true
 * @example validarPassword("hola1234");  // false
 */
function validarPassword(password) {
  return typeof password === "string" && password.length >= 8 &&
    /[A-Z]/.test(password) && /[a-z]/.test(password) &&
    /\d/.test(password) && /[^A-Za-z0-9\s]/.test(password);
}

/* ---------- Sección libre (usadas en el registro) ---------- */

/**
 * Evalúa la fortaleza de una contraseña sumando puntos por longitud (8 y 12+),
 * mezcla de mayúsculas/minúsculas, números y símbolos.
 * @param {string} password
 * @returns {string} "ninguna" | "baja" | "media" | "alta"
 * @example nivelPassword("hola");          // "baja"
 * @example nivelPassword("Hola#2026");     // "media"
 * @example nivelPassword("Hola#2026Abcd"); // "alta"
 */
function nivelPassword(password) {
  if (typeof password !== "string" || password === "") return "ninguna";
  let p = 0;
  if (password.length >= 8) p++;
  if (password.length >= 12) p++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) p++;
  if (/\d/.test(password)) p++;
  if (/[^A-Za-z0-9\s]/.test(password)) p++;
  return p <= 2 ? "baja" : p <= 4 ? "media" : "alta";
}

/**
 * Genera un nombre de usuario: inicial del nombre + primer apellido,
 * en minúsculas y sin acentos, ñ ni símbolos.
 * @param {string} nombre
 * @param {string} apellido
 * @returns {string} usuario sugerido; "" si falta algún dato
 * @example generarUsuario("José Luis", "Pérez Núñez"); // "jperez"
 */
function generarUsuario(nombre, apellido) {
  const limpiar = t => typeof t !== "string" ? "" :
    (t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      .replace(/[^a-z\s]/g, "").trim().split(/\s+/)[0] || "");
  const n = limpiar(nombre), a = limpiar(apellido);
  return n && a ? n.charAt(0) + a : "";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { validarCorreo, soloLetras, validarLongitud, calcularEdad,
    esMayorDeEdad, validarPassword, nivelPassword, generarUsuario };
}