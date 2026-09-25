function validarCorreo(correo) {
    if (typeof correo !== 'string') return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo.trim());
}


function soloLetras(texto) {
    if (typeof texto !== 'string' || texto.trim().length === 0) return false;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}


function validarLongitud(numero, maxLongitud) {
    if (numero === null || numero === undefined || maxLongitud <= 0) return false;
    const strNum = String(numero).trim();
    if (!/^\d+$/.test(strNum)) return false;
    return strNum.length <= maxLongitud;
}


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


function esMayorDeEdad(fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento);
    return edad >= 18;
}


function validarPassword(password) {
    if (typeof password !== 'string' || password.length < 8) return false;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /\d/.test(password);
    const tieneEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    return tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
}

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