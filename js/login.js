document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('loginForm');
    const errCorreo = document.getElementById('err-login-correo');
    const errPass = document.getElementById('err-login-pass');

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const correo = document.getElementById('correoLogin').value;
        const pass = document.getElementById('passLogin').value;

        const correoValido = validarCorreo(correo);
        const passValido = validarPassword(pass);

        errCorreo.classList.toggle('active', !correoValido);
        errPass.classList.toggle('active', !passValido);

        if (correoValido && passValido) {
            alert('Acceso autorizado. Credenciales verificadas con éxito.');
        }
    });
});