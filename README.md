# Utileria.js - Suite de Validación y Generación Vanilla JS

Biblioteca ligera y desacoplada escrita en JavaScript puro que centraliza reglas de validación de campos, cálculos de edad, análisis en tiempo real de seguridad de contraseñas y generación automática de identificadores de usuario.

---

## Instalación

Incluye el archivo principal `utileria.js` antes de tus scripts de control:

```html
<script src="js/utileria.js"></script>
```

---

## Funciones Disponibles y Ejemplos de Uso

### 1. `validarCorreo(correo)`
Comprueba si la cadena cumple con un formato de email válido.
```javascript
validarCorreo("usuario@correo.com"); // true
validarCorreo("correo_invalido@dominio"); // false
```

### 2. `soloLetras(texto)`
Acepta únicamente letras mayúsculas, minúsculas, espacios, tildes y eñes.
```javascript
soloLetras("Alexis Hernández"); // true
soloLetras("Usuario123");       // false
```

### 3. `validarLongitud(numero, maxLongitud)`
Verifica que la cantidad de dígitos numéricos no rebase el límite estipulado.
```javascript
validarLongitud(12345678, 8);  // true
validarLongitud("123456789", 8); // false
```

### 4. `calcularEdad(fechaNacimiento)`
Calcula la cantidad de años cumplidos con base en la fecha actual del sistema.
```javascript
calcularEdad("2000-08-15"); // Ejemplo: retorna 26
```

### 5. `esMayorDeEdad(fechaNacimiento)`
Determina si el usuario tiene 18 años o más.
```javascript
esMayorDeEdad("2004-01-01"); // true
esMayorDeEdad("2015-06-12"); // false
```

### 6. `validarPassword(password)`
Exige mínimo 8 caracteres, al menos una mayúscula, una minúscula, un dígito y un carácter especial.
```javascript
validarPassword("ClaveSegura#2026"); // true
validarPassword("clave123");          // false
```

### 7. `evaluarSeguridadPassword(password)` *(Función Propia)*
Analiza la robustez de una contraseña retornando nivel, porcentaje numérico y recomendaciones.
```javascript
evaluarSeguridadPassword("Password!123");
// Retorna: { nivel: "Fuerte", puntaje: 85, sugerencias: [] }
```

### 8. `generarNombreUsuario(nombreCompleto)` *(Función Propia)*
Normaliza el nombre retirando acentos y genera un nombre de usuario agregando un número pseudoaleatorio.
```javascript
generarNombreUsuario("Alexis Hernández"); 
// Retorna: "ahernandez47"
```

---

## Capturas de Pantalla

Demostración de ejecución en consola de las funciones:

![Consola](img/consola_demo.png)

---

## Demo en Video (Máx. 1 minuto)

[Enlace al video de YouTube / Loom donde se demuestra la biblioteca]
