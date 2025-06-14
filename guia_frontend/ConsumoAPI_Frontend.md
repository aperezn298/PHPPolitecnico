# Guía Detallada: Consumo de API con JavaScript

Este tutorial te guiará paso a paso para construir una interfaz frontend desde cero que consume una API de usuarios. Aprenderás a estructurar un proyecto frontend, crear componentes visuales y conectarlos a una API.

## ¿Qué vamos a construir?

Una aplicación web que:
- Consume datos de una API REST de usuarios
- Muestra la información en tarjetas visualmente atractivas
- Implementa diseño responsive para adaptarse a cualquier dispositivo
- Maneja posibles errores de conexión o datos
- Utiliza efectos visuales para mejorar la experiencia de usuario

## Estructura final del proyecto

```
Consumo_API_JS/
├── index.html          # Archivo HTML principal
├── css/
│   └── style.css       # Estilos CSS
├── js/
│   └── main.js         # Lógica JavaScript
└── img/
    └── icon.png        # Icono de la aplicación
```

## Paso 1: Configuración del entorno de desarrollo

### 1.1 Requisitos previos
- Servidor local: XAMPP (o cualquier otro servidor que soporte PHP si usarás la API local)
- Editor de código: VS Code, Sublime Text o similar
- Navegador web moderno: Chrome, Firefox, Edge, etc.
- Conocimientos básicos de HTML, CSS y JavaScript

### 1.2 Creación de la estructura de carpetas
1. Abre una terminal o explorador de archivos
2. Navega hasta la carpeta `htdocs` de XAMPP (generalmente en `C:\xampp\htdocs\`)
3. Crea una carpeta para la interfaz del consumo de la API: `Consumo_API_JS`
5. Dentro de `Consumo_API_JS` crea las siguientes subcarpetas:
   ```
   mkdir css
   mkdir js
   mkdir img
   ```

### 1.3 Descargar recursos necesarios
1. Busca un icono simple relacionado con usuarios o personas (formato PNG)
2. Guárdalo como `icon.png` en la carpeta `img`

## Paso 2: Creación del archivo HTML (index.html)

En este paso crearemos la estructura básica de nuestra aplicación con HTML5.

### 2.1 Crear el archivo HTML básico

1. En la carpeta raíz del proyecto, crea un archivo llamado `index.html`
2. Abre el archivo y añade la estructura básica HTML5:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page - Consumo API Usuarios</title>
</head>
<body>
    
</body>
</html>
```

### 2.2 Agregar enlaces a recursos externos

En la sección `<head>`, añade los siguientes enlaces:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page - Consumo API Usuarios</title>
    <!-- Añadir Font Awesome para iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Enlace a nuestro archivo CSS -->
    <link rel="stylesheet" href="css/style.css">
    <!-- Favicon para la página -->
    <link rel="icon" href="img/icon.png" type="image/x-icon">
    <title>Usuarios | API Landing</title>
</head>
```

### 2.3 Crear la estructura del cuerpo (body)

Ahora añade la estructura principal del documento dentro del `<body>`:

```html
<body>
    <!-- Encabezado de la página -->
    <header>
        <h1><i class="fa fa-users"></i> Usuarios API</h1>
        <p>Bienvenido a la landing page para consumir la API de usuarios.<br>Lista de usuarios registrados en la plataforma.</p>
    </header>
    
    <!-- Contenido principal -->
    <main>
        <section class="contenedor">
            <div id="usuarios" class="usuarios-lista"></div>
            <div id="error" class="error"></div>
        </section>
    </main>
    
    <!-- Pie de página -->
    <footer>
        &copy; 2025 API Usuarios | Aplicacion de uso educativo y demostrativo.
    </footer>
    
    <!-- Enlace a nuestro archivo JavaScript -->
    <script src="js/main.js"></script>
</body>
```

### 2.4 Entendiendo la estructura HTML

- **Header**: Contiene el título de la aplicación con un icono de Font Awesome y un párrafo descriptivo.
- **Main**: Contiene la sección principal con:
  - `div#usuarios.usuarios-lista`: Contenedor donde se mostrarán las tarjetas de usuarios
  - `div#error.error`: Elemento para mostrar posibles mensajes de error
- **Footer**: Contiene información de copyright y atribución
- **Script**: Enlace al archivo JavaScript que se ejecutará cuando se cargue la página

## Paso 3: Diseño con CSS (style.css)

En este paso crearemos los estilos para nuestra aplicación, haciendo que sea visualmente atractiva y responsive.

### 3.1 Crear el archivo de estilos

1. En la carpeta `css`, crea un archivo llamado `style.css`
2. Abre el archivo y comienza añadiendo los estilos generales:

```css
/* Estilos generales para toda la página */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    background-color: #f3f4f6;
    color: #1f2937;
}
```

### 3.2 Diseñar el encabezado (header)

Añade estos estilos para el header:

```css
/* Estilos del encabezado */
header {
    background-color: #2563eb;
    color: white;
    padding: 2rem 1rem;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

header h1 {
    margin: 0;
    font-size: 2.5rem;
}

header p {
    margin-top: 0.5rem;
    font-size: 1.1rem;
    line-height: 1.4;
}
```

### 3.3 Diseñar el pie de página (footer)

Añade estos estilos para el footer:

```css
/* Estilos del pie de página */
footer {
    text-align: center;
    padding: 1.5rem 0;
    background-color: #1e3a8a;
    color: white;
    margin-top: 3rem;
}
```

### 3.4 Crear la cuadrícula de usuarios

Añade estilos para la lista de usuarios usando CSS Grid:

```css
/* Estilos para la lista de usuarios (grid) */
.usuarios-lista {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: auto;
}
```

Este código crea una cuadrícula flexible que:
- Se adapta automáticamente al tamaño de la pantalla
- Muestra tantas tarjetas como quepan en una fila (mínimo 300px de ancho)
- Mantiene espaciado adecuado entre tarjetas

### 3.5 Diseñar las tarjetas de usuario

Añade estilos para las tarjetas individuales:

```css
/* Estilos para cada tarjeta de usuario */
.usuario-card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s;
}

.usuario-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

/* Estilos para el avatar */
.usuario-avatar {
    font-size: 3rem;
    text-align: center;
    margin: 1rem 0 0;
    color: #2563eb;
}
```

### 3.6 Estilizar la información del usuario

Añade estilos para organizar la información dentro de las tarjetas:

```css
/* Estilos para la información del usuario */
.usuario-info {
    padding: 1rem 1.2rem 1.5rem;
}

.usuario-nombre {
    font-size: 1.3rem;
    font-weight: bold;
    color: #111827;
    margin-bottom: 0.5rem;
}

.usuario-email,
.usuario-edad,
.usuario-ciudad,
.usuario-fecha {
    font-size: 1rem;
    color: #4b5563;
    display: flex;
    align-items: center;
    gap: 0.5em;
    margin-bottom: 0.4rem;
}
```

### 3.7 Añadir estilos para el contenedor principal

```css
/* Estilos para el contenedor principal */
.contenedor {
    padding: 1rem 2rem;
    max-width: 1200px;
    margin: auto;
}
```

### 3.8 Verificar la responsividad (opcional)

Nuestro diseño ya es responsivo gracias a:
- El uso de unidades relativas (rem)
- CSS Grid con minmax()
- Márgenes automáticos para centrado
- Media queries implícitas en grid-template-columns

## Paso 4: Implementación de JavaScript (main.js)

En este paso, implementaremos la lógica para consumir la API y mostrar los datos dinámicamente.

### 4.1 Crear el archivo JavaScript

1. En la carpeta `js`, crea un archivo llamado `main.js`
2. Abre el archivo y comienza añadiendo el evento para cargar los usuarios cuando el DOM esté listo:

```javascript
// Se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    cargarUsuarios();
});
```

### 4.2 Implementar la función para cargar usuarios

Añade la función principal que realizará la petición a la API:

```javascript
// Función para cargar usuarios desde la API
function cargarUsuarios() {
    // Limpiar contenido previo y mensajes de error
    document.getElementById('usuarios').innerHTML = '';
    document.getElementById('error').innerText = '';
    
    // Realizar petición a la API
    fetch('http://localhost/finales/API_Usuarios/usuario.php/usuarios')
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) throw new Error('Error al obtener los usuarios');
            return response.json();
        })
        .then(data => {
            // Verificar que la respuesta sea un array
            if (!Array.isArray(data)) {
                throw new Error('Respuesta inesperada de la API');
            }
            // Verificar si hay usuarios
            if (data.length === 0) {
                document.getElementById('usuarios').innerHTML = '<p>No hay usuarios registrados.</p>';
                return;
            }
            
            // Procesar cada usuario recibido
            data.forEach(usuario => {
                // Aquí crearemos la tarjeta para cada usuario
                // (completaremos en el siguiente paso)
            });
        })
        .catch(error => {
            // Mostrar error en caso de fallo
            document.getElementById('error').innerText = error.message;
        });
}
```

### 4.3 Crear las tarjetas de usuario dinámicamente

Completa la función `cargarUsuarios()` añadiendo el código para crear las tarjetas dentro del bloque `forEach`:

```javascript
// Dentro del forEach, reemplaza el comentario con este código:
const card = document.createElement('div');
card.className = 'usuario-card';
card.innerHTML = `
    <div class="usuario-avatar">
        <i class="fa fa-user-circle"></i>
    </div>
    <div class="usuario-info">
        <div class="usuario-nombre">${usuario.nombre || usuario.name || 'Sin nombre'}</div>
        <div class="usuario-email"><i class="fa fa-envelope"></i> ${usuario.email || 'Sin email'}</div>
        <div class="usuario-edad"><i class="fa fa-birthday-cake"></i> Edad: ${usuario.edad || '-'}</div>
        <div class="usuario-ciudad"><i class="fa fa-map-marker-alt"></i> Ciudad: ${usuario.ciudad || '-'}</div>
        <div class="usuario-fecha"><i class="fa fa-calendar"></i> Registro: ${usuario.fecha_registro ? usuario.fecha_registro.split(' ')[0] : '-'}</div>
    </div>
`;
document.getElementById('usuarios').appendChild(card);
```

### 4.4 Código JavaScript completo

El archivo `main.js` completo debería verse así:

```javascript
document.addEventListener('DOMContentLoaded', function () {
    cargarUsuarios();
});

function cargarUsuarios() {
    document.getElementById('usuarios').innerHTML = '';
    document.getElementById('error').innerText = '';
    fetch('http://localhost/finales/API_Usuarios/usuario.php/usuarios')
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener los usuarios');
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Respuesta inesperada de la API');
            }
            if (data.length === 0) {
                document.getElementById('usuarios').innerHTML = '<p>No hay usuarios registrados.</p>';
                return;
            }
            data.forEach(usuario => {
                const card = document.createElement('div');
                card.className = 'usuario-card';
                card.innerHTML = `
                    <div class="usuario-avatar">
                        <i class="fa fa-user-circle"></i>
                    </div>
                    <div class="usuario-info">
                        <div class="usuario-nombre">${usuario.nombre || usuario.name || 'Sin nombre'}</div>
                        <div class="usuario-email"><i class="fa fa-envelope"></i> ${usuario.email || 'Sin email'}</div>
                        <div class="usuario-edad"><i class="fa fa-birthday-cake"></i> Edad: ${usuario.edad || '-'}</div>
                        <div class="usuario-ciudad"><i class="fa fa-map-marker-alt"></i> Ciudad: ${usuario.ciudad || '-'}</div>
                        <div class="usuario-fecha"><i class="fa fa-calendar"></i> Registro: ${usuario.fecha_registro ? usuario.fecha_registro.split(' ')[0] : '-'}</div>
                    </div>
                `;
                document.getElementById('usuarios').appendChild(card);
            });
        })
        .catch(error => {
            document.getElementById('error').innerText = error.message;
        });
}
```

### 4.5 Entendiendo el código JavaScript

- **Evento DOMContentLoaded**: Asegura que el código se ejecute solo cuando el DOM esté completamente cargado
- **Fetch API**: Realiza la petición HTTP a la API de usuarios
- **Manejo de respuesta**: 
  - Verifica si la respuesta es exitosa con `response.ok`
  - Convierte la respuesta a JSON
  - Verifica que los datos sean válidos (un array)
- **Creación dinámica de elementos**: 
  - Usa `createElement()` para crear nuevos elementos DOM
  - Utiliza plantillas literales (template literals) para generar el HTML interno
- **Manejo de datos faltantes**: 
  - Usa operador OR (`||`) para mostrar valores por defecto si faltan datos
  - Formatea la fecha para mostrar solo la parte de fecha (sin hora)
- **Manejo de errores**: 
  - Captura y muestra errores en el elemento designado

## Paso 5: Pruebas y ajustes

En este paso, probaremos nuestra aplicación y haremos ajustes necesarios.

### 5.1 Preparar el entorno para pruebas

1. Asegúrate de que el servidor XAMPP esté funcionando:
   - Abre el panel de control de XAMPP
   - Inicia los servicios de Apache
   - Si tu API requiere MySQL, inicia también ese servicio

2. Verifica que la API esté disponible:
   - Abre en el navegador: `http://localhost/carpeta_de_la_api/usuario.php/usuarios`
   - Deberías ver datos en formato JSON
   - Si ves un error, verifica la configuración de tu API

### 5.2 Realizar pruebas iniciales

1. Abre tu aplicación en el navegador:
   - Navega a `http://localhost/Consumo_API_JS/`
   - Deberías ver la interfaz con las tarjetas de usuarios cargadas

2. Verifica el funcionamiento básico:
   - Las tarjetas deben mostrar la información correctamente
   - El diseño debe verse como esperado
   - Los iconos de Font Awesome deben aparecer

### 5.3 Probar la responsividad

1. Prueba el diseño en diferentes tamaños de pantalla:
   - Usa las herramientas para desarrolladores del navegador (F12)
   - Cambia a modo responsive
   - Prueba diferentes tamaños de pantalla (móvil, tablet, escritorio)
   - Comprueba que las tarjetas se reorganicen correctamente

### 5.4 Probar escenarios de error

1. Prueba con API no disponible:
   - Detén temporalmente el servidor Apache
   - Recarga la página para ver si se muestra el mensaje de error
   - Reinicia el servidor y comprueba que funcione nuevamente

2. Prueba con diferentes respuestas de la API:
   - Si puedes modificar la API, prueba devolviendo un array vacío
   - Comprueba que se muestra el mensaje "No hay usuarios registrados"
   - Prueba con datos incompletos (usuarios sin email, edad, etc.)
   - Verifica que los valores por defecto se muestren correctamente

### 5.5 Posibles ajustes

Si encuentras problemas durante las pruebas, aquí hay algunas soluciones comunes:

1. Ajustes de CSS:
   - Refinar márgenes y padding para mejor visualización
   - Ajustar colores o contrastes para mejor legibilidad
   - Mejorar la apariencia en dispositivos específicos

2. Ajustes de JavaScript:
   - Mejorar el manejo de errores para casos específicos
   - Añadir animaciones de carga
   - Implementar paginación si hay muchos usuarios

3. Ajustes de rendimiento:
   - Optimizar la carga de recursos
   - Implementar lazy loading para imágenes si se añaden fotos de perfil

## Paso 6: Mejoras y extensiones opcionales

Una vez que tengas la aplicación funcionando correctamente, puedes implementar estas mejoras:

### 6.1 Añadir funcionalidades de búsqueda y filtrado

```javascript
// Ejemplo de campo de búsqueda (añadir en index.html)
<div class="busqueda">
    <input type="text" id="buscar" placeholder="Buscar usuario...">
</div>

// Código para filtrar (añadir en main.js)
document.getElementById('buscar').addEventListener('input', function(e) {
    const texto = e.target.value.toLowerCase();
    const tarjetas = document.querySelectorAll('.usuario-card');
    
    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.querySelector('.usuario-nombre').innerText.toLowerCase();
        tarjeta.style.display = nombre.includes(texto) ? '' : 'none';
    });
});
```

### 6.2 Implementar paginación

```javascript
// Ejemplo básico de paginación
let usuariosData = []; // Almacena todos los usuarios
const usuariosPorPagina = 8;
let paginaActual = 1;

function mostrarPagina(pagina) {
    const inicio = (pagina - 1) * usuariosPorPagina;
    const fin = inicio + usuariosPorPagina;
    const usuariosPagina = usuariosData.slice(inicio, fin);
    
    // Limpiar contenedor
    document.getElementById('usuarios').innerHTML = '';
    
    // Mostrar usuarios de esta página
    usuariosPagina.forEach(usuario => {
        // Código para crear la tarjeta...
    });
}
```

### 6.3 Implementar modo oscuro

```css
/* Añadir en style.css */
.dark-mode {
    background-color: #1f2937;
    color: #f9fafb;
}

.dark-mode .usuario-card {
    background-color: #374151;
    color: #f3f4f6;
}

.dark-mode .usuario-nombre {
    color: #f9fafb;
}

/* Añadir botón en HTML y código JS para alternar */
```

## Tecnologías utilizadas

- **HTML5**: Estructura semántica del documento
- **CSS3**: 
  - Grid para layout responsivo
  - Flexbox para alineación de elementos
  - Transiciones y transformaciones para efectos visuales
  - Variables CSS para gestión de colores (opcional)
- **JavaScript (ES6+)**:
  - Fetch API para peticiones HTTP
  - Promesas y async/await para manejo asíncrono
  - Template literals para generación de HTML
  - Métodos de array como forEach para iteración
- **Font Awesome 6.4.0**: Biblioteca de iconos
- **XAMPP**: Servidor local para desarrollo y pruebas

## Cómo ejecutar el proyecto

1. **Instalar XAMPP**:
   - Descarga desde [apachefriends.org](https://www.apachefriends.org/)
   - Instala siguiendo las instrucciones

2. **Configurar el proyecto**:
   - Coloca la carpeta 'Consumo_API_JS' en `C:\xampp\htdocs\Finales\`
   - Asegúrate de que todos los archivos estén en su lugar:
     - `index.html` en la carpeta raíz
     - `style.css` en la carpeta `css/`
     - `main.js` en la carpeta `js/`
     - `icon.png` en la carpeta `img/`

3. **Iniciar los servicios**:
   - Abre el panel de control de XAMPP
   - Inicia Apache (y MySQL si tu API lo requiere)
   - Verifica que los servicios estén corriendo (indicador verde)

4. **Configurar la API** (si aún no está configurada):
   - Asegúrate de que la API esté instalada en `C:\xampp\htdocs\finales\API_Usuarios\`
   - Verifica que responda correctamente

5. **Acceder a la aplicación**:
   - Abre tu navegador
   - Navega a [http://localhost/Finales/Consumo_API_JS/](http://localhost/Finales/Consumo_API_JS/)
   - Deberías ver la página con la lista de usuarios cargada

## Solución de problemas comunes

### La API no responde

1. Verifica que XAMPP esté ejecutando Apache
2. Comprueba la ruta correcta de la API
3. Revisa errores en la consola del navegador (F12 > Console)
4. Verifica permisos de archivo en la carpeta de la API

### Las tarjetas no se muestran

1. Abre la consola del navegador para ver errores JavaScript
2. Verifica que la API devuelve datos en el formato esperado
3. Prueba la API directamente en el navegador

### Los estilos no se aplican correctamente

1. Verifica que el archivo CSS esté correctamente enlazado
2. Comprueba que las clases CSS coincidan con las usadas en el HTML y JavaScript
3. Usa las herramientas de desarrollador para inspeccionar elementos

### Los iconos no aparecen

1. Verifica la conexión a internet para cargar Font Awesome
2. Comprueba que los nombres de los iconos son correctos
3. Intenta con una versión local de Font Awesome

## Recursos adicionales

- [MDN Web Docs: Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [XAMPP Documentation](https://www.apachefriends.org/docs/)

---

Proyecto creado con fines educativos y demostrativos. Fecha: 13 de junio de 2025.