document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const inputNombre = document.getElementById('nombre');
    const inputUsuario = document.getElementById('usuarioSugerido');
    const inputPassword = document.getElementById('password');
    const seguridadTexto = document.getElementById('seguridadPassword');

    const modal = document.getElementById('modalEdad');
    const modalMensaje = document.getElementById('modalMensaje');
    const btnIrLogin = document.getElementById('btnIrLogin');
    const btnCerrarModal = document.getElementById('btnCerrarModal');

    let usuarioEsMayor = false;

    // Generar sugerencia de usuario al desenfocar o escribir en el nombre
    inputNombre.addEventListener('blur', () => {
        const nombreVal = inputNombre.value;
        if (soloLetras(nombreVal)) {
            inputUsuario.value = generarNombreUsuario(nombreVal);
        }
    });

    // Evaluar seguridad de la contraseña en tiempo real
    inputPassword.addEventListener('input', () => {
        const pass = inputPassword.value;
        if (pass.length === 0) {
            seguridadTexto.textContent = '';
            seguridadTexto.className = 'info-text';
            return;
        }

        const res = evaluarSeguridadPassword(pass);
        seguridadTexto.textContent = `Nivel: ${res.nivel} (${res.puntaje}/100)`;
        
        seguridadTexto.className = 'info-text';
        if (res.nivel === 'Débil') seguridadTexto.classList.add('seg-debil');
        if (res.nivel === 'Media') seguridadTexto.classList.add('seg-media');
        if (res.nivel === 'Fuerte') seguridadTexto.classList.add('seg-fuerte');
    });

    // Envío y validación completa del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreVal = inputNombre.value;
        const correoVal = document.getElementById('correo').value;
        const matVal = document.getElementById('matricula').value;
        const fechaVal = document.getElementById('fechaNac').value;
        const passVal = inputPassword.value;

        let esValido = true;

        esValido = setEstado('err-nombre', soloLetras(nombreVal)) && esValido;
        esValido = setEstado('err-correo', validarCorreo(correoVal)) && esValido;
        esValido = setEstado('err-matricula', validarLongitud(matVal, 8)) && esValido;
        esValido = setEstado('err-password', validarPassword(passVal)) && esValido;

        const edad = calcularEdad(fechaVal);
        if (edad === -1) {
            setEstado('err-fechaNac', false);
            esValido = false;
        } else {
            setEstado('err-fechaNac', true);
        }

        if (!esValido) return;

        usuarioEsMayor = esMayorDeEdad(fechaVal);

        if (usuarioEsMayor) {
            modalMensaje.textContent = `Tienes ${edad} años. Cumples con la mayoría de edad para continuar al sistema.`;
            btnIrLogin.style.display = 'block';
        } else {
            modalMensaje.textContent = `Tienes ${edad} años. Registro no autorizado para menores de edad.`;
            btnIrLogin.style.display = 'none';
        }

        modal.classList.add('open');
    });

    function setEstado(idElementoError, condicionValida) {
        const errorEl = document.getElementById(idElementoError);
        if (condicionValida) {
            errorEl.classList.remove('active');
            return true;
        } else {
            errorEl.classList.add('active');
            return false;
        }
    }

    btnIrLogin.addEventListener('click', () => {
        if (usuarioEsMayor) {
            window.location.href = 'login.html';
        }
    });

    btnCerrarModal.addEventListener('click', () => {
        modal.classList.remove('open');
    });
});