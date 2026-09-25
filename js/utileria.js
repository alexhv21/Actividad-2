/**
 * Utileria.js - Librería funcional de validaciones y utilidades (JS Vanilla puro).
 */

/**
 * Valida si una cadena cumple con el formato estándar de correo electrónico.
 * @param {string} correo - Texto a evaluar.
 * @returns {boolean} True si es válido, false en caso contrario.
 */
function validarCorreo(correo) {
    if (typeof correo !== 'string') return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo.trim());
}

/**
 * Valida que una cadena contenga únicamente letras (incluye espacios, acentos y eñes).
 * @param {string} texto - Texto a evaluar.
 * @returns {boolean} True si contiene solo letras, false en caso contrario.
 */
function soloLetras(texto) {
    if (typeof texto !== 'string' || texto.trim().length === 0) return false;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}

/**
 * Valida que la cantidad de dígitos de un número no exceda la longitud máxima indicada.
 * @param {number|string} numero - Número o cadena numérica a evaluar.
 * @param {number} maxLongitud - Longitud máxima permitida de dígitos.
 * @returns {boolean} True si no excede maxLongitud y es numérico, false en caso contrario.
 */
function validarLongitud(numero, maxLongitud) {
    if (numero === null || numero === undefined || maxLongitud <= 0) return false;
    const strNum = String(numero).trim();
    if (!/^\d+$/.test(strNum)) return false;
    return strNum.length <= maxLongitud;
}

/**
 * Calcula la edad en años cumplidos a partir de una fecha de nacimiento.
 * @param {string|Date} fechaNacimiento - Fecha en formato 'YYYY-MM-DD' o instancia Date.
 * @returns {number} Número entero de años cumplidos (retorna -1 si la fecha es inválida).
 */
function calcularEdad(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);
    if (isNaN(nacimiento.getTime())) return -1;

    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesDif = hoy.getMonth() - nacimiento.getMonth();
    const diaDif = hoy.getDate() - nacimiento.getDate();

    if (mesDif < 0 || (mesDif === 0 && diaDif < 0)) {
        edad--;
    }
    return edad >= 0 ? edad : -1;
}

/**
 * Valida si una persona tiene 18 años o más con base en su fecha de nacimiento.
 * @param {string|Date} fechaNacimiento - Fecha de nacimiento.
 * @returns {boolean} True si tiene 18 o más años, false en caso contrario.
 */
function esMayorDeEdad(fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento);
    return edad >= 18;
}

/**
 * Valida que la contraseña cumpla con políticas de seguridad:
 * Mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial.
 * @param {string} password - Contraseña a evaluar.
 * @returns {boolean} True si cumple todos los requisitos, false en caso contrario.
 */
function validarPassword(password) {
    if (typeof password !== 'string' || password.length < 8) return false;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /\d/.test(password);
    const tieneEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    return tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
}

/* ==========================================================================
   Sección Libre — Nuevas funciones solicitadas
   ========================================================================== */

/**
 * Evalúa el nivel de seguridad de una contraseña y retorna un diagnóstico cualitativo y numérico.
 * @param {string} password - Cadena de la contraseña.
 * @returns {{nivel: string, puntaje: number, sugerencias: string[]}} Objeto con nivel ('Débil', 'Media', 'Fuerte'), puntaje (0-100) y sugerencias de mejora.
 */
function evaluarSeguridadPassword(password) {
    if (typeof password !== 'string' || password.length === 0) {
        return { nivel: 'Invalida', puntaje: 0, sugerencias: ['Ingresa una contraseña'] };
    }

    let puntaje = 0;
    const sugerencias = [];

    // Criterio de longitud
    if (password.length >= 8) puntaje += 25;
    else sugerencias.push('Usa al menos 8 caracteres');

    if (password.length >= 12) puntaje += 15;

    // Criterios de composición
    if (/[a-z]/.test(password)) puntaje += 15;
    else sugerencias.push('Agrega letras minúsculas');

    if (/[A-Z]/.test(password)) puntaje += 15;
    else sugerencias.push('Agrega letras mayúsculas');

    if (/\d/.test(password)) puntaje += 15;
    else sugerencias.push('Agrega números');

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) puntaje += 15;
    else sugerencias.push('Agrega símbolos o caracteres especiales');

    // Determinar etiqueta
    let nivel = 'Débil';
    if (puntaje >= 75) {
        nivel = 'Fuerte';
    } else if (puntaje >= 50) {
        nivel = 'Media';
    }

    return {
        nivel: nivel,
        puntaje: Math.min(puntaje, 100),
        sugerencias: sugerencias
    };
}

/**
 * Genera un nombre de usuario normalizado a partir de nombre(s) y apellido(s), 
 * eliminando diacríticos/acentos y caracteres extraños, añadiendo un sufijo numérico aleatorio.
 * Ejemplo: "Alexis Hernández" -> "ahernandez74"
 * @param {string} nombreCompleto - Nombre y apellidos de la persona.
 * @returns {string} Nombre de usuario sugerido en minúsculas y sin acentos.
 */
function generarNombreUsuario(nombreCompleto) {
    if (typeof nombreCompleto !== 'string' || nombreCompleto.trim().length === 0) {
        return '';
    }

    // Normalizar texto eliminando tildes y caracteres especiales
    const normalizado = nombreCompleto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

    const partes = normalizado.split(/\s+/);

    let base = '';
    if (partes.length === 1) {
        base = partes[0].slice(0, 8);
    } else {
        const inicialNombre = partes[0].charAt(0);
        const primerApellido = partes[1];
        base = `${inicialNombre}${primerApellido}`;
    }

    // Limpiar caracteres que no sean alfanuméricos
    base = base.replace(/[^a-z0-9]/g, '');

    // Generar sufijo numérico de 2 dígitos (10 a 99)
    const numeroRandom = Math.floor(10 + Math.random() * 90);

    return `${base}${numeroRandom}`;
}