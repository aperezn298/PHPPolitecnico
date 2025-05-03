// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de los tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Inicialización de los popovers de Bootstrap
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Funcionalidad para los ejemplos de código PHP
    const resultButtons = document.querySelectorAll('.ver-resultado');
    
    resultButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.php-code-block');
            const resultArea = codeBlock.querySelector('.result-area');
            
            if (resultArea) {
                // Mostrar/ocultar el área de resultados
                if (resultArea.style.display === 'none' || !resultArea.style.display) {
                    resultArea.style.display = 'block';
                    this.textContent = 'Ocultar Resultado';
                } else {
                    resultArea.style.display = 'none';
                    this.textContent = 'Ver Resultado';
                }
            }
        });
    });

    // Para ejemplos con AJAX - Ejecutar código PHP
    document.querySelectorAll('.ejecutar-php').forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.php-code-block');
            const codeContent = codeBlock.querySelector('code').textContent;
            const resultArea = codeBlock.querySelector('.result-area');
            
            // Configuración de la petición AJAX
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'execute.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            xhr.onload = function() {
                if (this.status === 200) {
                    resultArea.innerHTML = this.responseText;
                    resultArea.style.display = 'block';
                }
            };
            
            // Enviar el código PHP para ejecución
            xhr.send('code=' + encodeURIComponent(codeContent));
        });
    });

    // Ejecutar ejemplos de código simulados
    const runButtons = document.querySelectorAll('.run-code-btn');
    runButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.interactive-example').querySelector('pre code').textContent;
            const resultSection = this.closest('.interactive-example').querySelector('.result-section');
            
            // Simulación de ejecución de PHP - No se requiere servidor
            const result = simulatePhpExecution(codeBlock);
            resultSection.innerHTML = result;
            
            // Efecto de carga
            resultSection.classList.add('result-updated');
            setTimeout(() => {
                resultSection.classList.remove('result-updated');
            }, 500);
        });
    });

    // Procesar bloques de código para el formato mejorado
    document.querySelectorAll('pre code.php-code').forEach(block => {
        if (!block.dataset.processed) {
            formatCodeWithLineNumbers(block);
            block.dataset.processed = "true";
        }
    });
    
    // --------- INICIO: NUEVAS FUNCIONES PARA VS CODE UI ---------

    // Crear componentes de VS Code para todos los bloques de código PHP
    createVSCodeEditors();
    
    // Inicializar todos los botones de copiar código
    initCopyButtons();
    
    // Inicializar todos los botones de ejecutar código
    initRunButtons();
    
    // --------- FIN: NUEVAS FUNCIONES PARA VS CODE UI ---------
    
    // Inicializar todos los quizzes
    initQuizzes();
    
    // Cargar progreso guardado
    loadQuizProgress();
    
    // Inicializar nuevas características
    initializeQuizzes();
    initializeChallenges();
    updateProgressIndicators();

    // Inicializar ejercicio de relacionar conceptos
    initDragAndDropExercise();
    
    // Función para formatear código con números de línea
    function formatCodeWithLineNumbers(block) {
        const lines = block.textContent.split('\n');
        let formattedCode = '';
        
        lines.forEach((line, index) => {
            // Para cada línea, creamos un span que contendrá tanto el número como el contenido
            formattedCode += `<span>${highlightLine(line)}</span>`;
        });
        
        block.innerHTML = formattedCode;
        
        // Después de añadir los números, aplicamos resaltado de sintaxis
        highlightCode(block);
    }
    
    function highlightLine(line) {
        // Aquí puedes pre-procesar una línea antes de añadirla
        // Por ejemplo, puedes detectar palabras clave específicas
        return line;
    }

    function highlightCode(block) {
        let html = block.innerHTML;
        
        // Mejorar el resaltado existente
        // Palabras clave de PHP (ampliando el conjunto existente)
        const keywords = ['echo', 'print', 'if', 'else', 'elseif', 'while', 'do', 'for', 'foreach', 
                         'break', 'continue', 'switch', 'case', 'default', 'function', 'class', 
                         'new', 'return', 'include', 'require', 'include_once', 'require_once',
                         'try', 'catch', 'throw', 'finally', 'public', 'private', 'protected',
                         'static', 'abstract', 'final', 'interface', 'trait', 'extends', 'implements',
                         'namespace', 'use', 'as', 'const', 'goto'];
                         
        // Aplicar resaltado más preciso
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            html = html.replace(regex, `<span class="php-keyword">${keyword}</span>`);
        });
        
        // Aplicar el HTML actualizado
        block.innerHTML = html;
    }

    // Función para simular la ejecución de PHP
    function simulatePhpExecution(code) {
        // Extraer valores dinámicos que pueden necesitarse en varios ejemplos
        const fechaActual = new Date().toLocaleDateString('es-ES');
        const horaActual = new Date().toLocaleTimeString('es-ES');
        const diaActual = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
        const mesActual = new Date().toLocaleDateString('es-ES', { month: 'long' });
        const anioActual = new Date().getFullYear();
        
        // Hora para ejemplos que usen condiciones basadas en hora
        const hora = new Date().getHours();
        let saludo;
        if (hora < 12) {
            saludo = "¡Buenos días!";
        } else if (hora < 18) {
            saludo = "¡Buenas tardes!";
        } else {
            saludo = "¡Buenas noches!";
        }

        // Ejemplos básicos de PHP - Introducción
        if (code.includes('echo "¡Hola, soy un script de PHP!"')) {
            return '<div class="alert alert-success">¡Hola, soy un script de PHP!</div>';
        }
        else if (code.includes('phpinfo()')) {
            return `
                <div class="alert alert-success">
                    <div class="phpinfo-header" style="background-color: #FFFFFF; color: #222222; text-align: center; padding: 10px 0; border-bottom: 1px solid #ccc;">
                        <h2>PHP Version 8.2.0</h2>
                    </div>
                    <div class="phpinfo-section" style="padding: 10px; border-bottom: 1px solid #ccc;">
                        <h3>System</h3>
                        <table class="table table-striped table-sm">
                            <tbody>
                                <tr><td>Build Date</td><td>${fechaActual}</td></tr>
                                <tr><td>Server API</td><td>Apache 2.0 Handler</td></tr>
                                <tr><td>Virtual Directory Support</td><td>enabled</td></tr>
                                <tr><td>Configuration File (php.ini) Path</td><td>/etc/php/8.2/apache2</td></tr>
                                <tr><td>Loaded Configuration File</td><td>/etc/php/8.2/apache2/php.ini</td></tr>
                                <tr><td>PHP API</td><td>20210902</td></tr>
                                <tr><td>PHP Extension</td><td>20210902</td></tr>
                                <tr><td>Debug Build</td><td>no</td></tr>
                                <tr><td>Thread Safety</td><td>disabled</td></tr>
                                <tr><td>Zend Memory Manager</td><td>enabled</td></tr>
                                <tr><td>IPv6 Support</td><td>enabled</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- Más secciones de phpinfo() pueden ser simuladas aquí -->
                </div>`;
        }
        
        // Variables y tipos de datos
        else if (code.includes('$nombre = "PHP";') && code.includes('echo "Hola, $nombre!"')) {
            return '<div class="alert alert-success">Hola, PHP!</div>';
        }
        else if (code.includes('$numero = 10;') && code.includes('$decimal = 3.14;')) {
            let output = '';
            if (code.includes('echo $numero;')) output += '<div>10</div>';
            if (code.includes('echo $decimal;')) output += '<div>3.14</div>';
            if (code.includes('echo $numero + $decimal;')) output += '<div>13.14</div>';
            return '<div class="alert alert-success">' + output + '</div>';
        }
        
        // Operadores
        else if (code.includes('$a = 5;') && code.includes('$b = 3;')) {
            let output = '';
            if (code.includes('echo $a + $b;')) output += '<div>8</div>';
            if (code.includes('echo $a - $b;')) output += '<div>2</div>';
            if (code.includes('echo $a * $b;')) output += '<div>15</div>';
            if (code.includes('echo $a / $b;')) output += '<div>1.6666666666667</div>';
            if (code.includes('echo $a % $b;')) output += '<div>2</div>';
            return '<div class="alert alert-success">' + output + '</div>';
        }
        
        // Estructuras de control
        else if (code.includes('if') && code.includes('$edad')) {
            let edad = 0;
            const match = code.match(/\$edad\s*=\s*(\d+)/);
            if (match) {
                edad = parseInt(match[1]);
            }
            
            if (edad >= 18) {
                return '<div class="alert alert-success">Eres mayor de edad.</div>';
            } else {
                return '<div class="alert alert-success">Eres menor de edad.</div>';
            }
        }
        
        // Bucle for
        else if (code.includes('for') && code.includes('$i')) {
            let result = '';
            const matchStart = code.match(/\$i\s*=\s*(\d+)/);
            const matchEnd = code.match(/\$i\s*<\s*(\d+)/);
            
            if (matchStart && matchEnd) {
                const start = parseInt(matchStart[1]);
                const end = parseInt(matchEnd[1]);
                
                for (let i = start; i < end; i++) {
                    result += `Iteración ${i}<br>`;
                }
            }
            
            return '<div class="alert alert-success">' + result + '</div>';
        }
        
        // Bucle while
        else if (code.includes('while') && code.includes('$i')) {
            let result = '';
            const matchStart = code.match(/\$i\s*=\s*(\d+)/);
            const matchEnd = code.match(/\$i\s*<\s*(\d+)/);
            
            if (matchStart && matchEnd) {
                let i = parseInt(matchStart[1]);
                const end = parseInt(matchEnd[1]);
                
                while (i < end) {
                    result += `Iteración ${i}<br>`;
                    i++;
                }
            }
            
            return '<div class="alert alert-success">' + result + '</div>';
        }
        
        // Arrays
        else if (code.includes('$frutas = array')) {
            let result = '';
            
            if (code.includes('echo $frutas[0]')) result += 'Manzana<br>';
            if (code.includes('echo $frutas[1]')) result += 'Banana<br>';
            if (code.includes('echo $frutas[2]')) result += 'Naranja<br>';
            
            if (code.includes('foreach')) {
                result += 'Manzana<br>Banana<br>Naranja<br>';
            }
            
            return '<div class="alert alert-success">' + result + '</div>';
        }
        
        // Arrays asociativos
        else if (code.includes('$persona = array') && code.includes('"nombre"')) {
            let result = '';
            
            if (code.includes('echo $persona["nombre"]')) result += 'Juan<br>';
            if (code.includes('echo $persona["edad"]')) result += '30<br>';
            if (code.includes('echo $persona["ciudad"]')) result += 'Madrid<br>';
            
            if (code.includes('foreach')) {
                result += 'nombre: Juan<br>edad: 30<br>ciudad: Madrid<br>';
            }
            
            return '<div class="alert alert-success">' + result + '</div>';
        }
        
        // Funciones
        else if (code.includes('function saludar') && code.includes('$nombre')) {
            let nombre = "usuario";
            const match = code.match(/saludar\("([^"]+)"\)/);
            if (match) {
                nombre = match[1];
            }
            
            return `<div class="alert alert-success">¡Hola, ${nombre}!</div>`;
        }
        
        // Función con retorno
        else if (code.includes('function suma') && code.includes('return')) {
            let a = 0, b = 0;
            const match = code.match(/suma\((\d+),\s*(\d+)\)/);
            if (match) {
                a = parseInt(match[1]);
                b = parseInt(match[2]);
            }
            
            return `<div class="alert alert-success">Resultado: ${a + b}</div>`;
        }
        
        // Fecha y hora
        else if (code.includes('date')) {
            let result = '';
            
            if (code.includes('date("Y-m-d")')) result += `${anioActual}-${mesActual.slice(0,3)}-${fechaActual.split('/')[0]}<br>`;
            if (code.includes('date("H:i:s")')) result += `${horaActual}<br>`;
            if (code.includes('date("l")')) result += `${diaActual}<br>`;
            
            return `<div class="alert alert-success">${result || fechaActual}</div>`;
        }
        
        // Conexión a base de datos
        else if (code.includes('mysqli_connect')) {
            return `<div class="alert alert-success">Conexión establecida correctamente.</div>`;
        }
        
        // Consulta SQL SELECT
        else if (code.includes('SELECT') && code.includes('FROM')) {
            return `
                <div class="alert alert-success">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Juan Pérez</td>
                                <td>juan@example.com</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>María López</td>
                                <td>maria@example.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div>`;
        }
        
        // Consulta SQL INSERT
        else if (code.includes('INSERT INTO')) {
            return `<div class="alert alert-success">Registro insertado correctamente. ID: 3</div>`;
        }
        
        // Consulta SQL UPDATE
        else if (code.includes('UPDATE')) {
            return `<div class="alert alert-success">Registro actualizado correctamente. Filas afectadas: 1</div>`;
        }
        
        // Consulta SQL DELETE
        else if (code.includes('DELETE FROM')) {
            return `<div class="alert alert-success">Registro eliminado correctamente. Filas afectadas: 1</div>`;
        }
        
        // Valor por defecto si no coincide ningún caso
        return '<div class="alert alert-secondary">Resultado de la ejecución...</div>';
    }
    
    // --------- INICIO: NUEVAS FUNCIONES PARA VS CODE UI ---------
    
    // Función para copiar código
    function copyCode(button) {
        const codeBlock = button.closest('.vscode-editor').querySelector('pre code');
        const text = codeBlock.innerText.trim();
        
        navigator.clipboard.writeText(text).then(() => {
            // Cambiar el texto del botón temporalmente para dar feedback
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copiado';
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar: ', err);
        });
    }

    // Función para ejecutar código PHP (simulación)
    function runPhpCode(button) {
        const codeBlock = button.closest('.vscode-editor').querySelector('pre code');
        const resultContainer = button.closest('.vscode-editor').parentNode.querySelector('.result-panel');
        const resultOutput = resultContainer.querySelector('.result-output');
        
        // Mostrar el contenedor de resultados
        resultContainer.style.display = 'block';
        
        // Aquí procesamos el código PHP (simulación)
        const phpCode = codeBlock.innerText.trim();
        let result = processPHP(phpCode);
        
        // Mostrar el resultado
        resultOutput.innerHTML = result;
        
        // Hacer scroll al resultado
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Función para simular la ejecución de PHP
    function processPHP(code) {
        // Esto es una simulación muy básica, no ejecuta realmente PHP
        let output = '';
        
        // Buscar comandos echo o print y extraer su contenido
        const regex = /echo\s*["'](.+?)["']\s*;|print\s*["'](.+?)["']\s*;/g;
        let match;
        
        while ((match = regex.exec(code)) !== null) {
            output += match[1] || match[2];
        }
        
        return output || "No se encontraron comandos de salida en el código.";
    }

    // Función para crear los editores estilo VS Code
    function createVSCodeEditors() {
        const codeBlocks = document.querySelectorAll('.code-block');
        
        codeBlocks.forEach((block, index) => {
            const originalCode = block.textContent.trim();
            const language = block.classList.contains('language-php') ? 'php' : 
                             block.classList.contains('language-html') ? 'html' : 
                             block.classList.contains('language-css') ? 'css' : 
                             block.classList.contains('language-js') ? 'javascript' : 'plain';
            
            // Crear el contenedor del editor VS Code
            const editorContainer = document.createElement('div');
            editorContainer.className = 'vscode-editor';
            editorContainer.id = `editor-${index}`;
            
            // Crear la barra de título
            const titleBar = document.createElement('div');
            titleBar.className = 'vscode-titlebar';
            
            // Añadir controles de ventana
            const windowControls = document.createElement('div');
            windowControls.className = 'vscode-window-controls';
            windowControls.innerHTML = `
                <span class="window-control close"></span>
                <span class="window-control minimize"></span>
                <span class="window-control maximize"></span>
            `;
            
            // Añadir pestañas
            const tabs = document.createElement('div');
            tabs.className = 'vscode-tabs';
            
            let tabIcon = '';
            let filename = '';
            
            switch(language) {
                case 'php':
                    tabIcon = 'php-icon';
                    filename = 'php.php';
                    break;
                case 'html':
                    tabIcon = 'html-icon';
                    filename = 'index.html';
                    break;
                case 'css':
                    tabIcon = 'css-icon';
                    filename = 'styles.css';
                    break;
                case 'javascript':
                    tabIcon = 'js-icon';
                    filename = 'script.js';
                    break;
                default:
                    tabIcon = 'file-icon';
                    filename = 'file.txt';
            }
            
            tabs.innerHTML = `
                <div class="vscode-tab active">
                    <span class="tab-icon ${tabIcon}"></span>
                    <span class="tab-name">${filename}</span>
                    <span class="tab-close">×</span>
                </div>
            `;
            
            // Añadir área principal del editor
            const main = document.createElement('div');
            main.className = 'vscode-main';
            
            // Área del editor de código
            const editorArea = document.createElement('div');
            editorArea.className = 'vscode-editor-area';
            
            // Dividir el código en líneas
            const codeLines = originalCode.split('\n');
            
            // Crear números de línea
            const lineNumbers = document.createElement('div');
            lineNumbers.className = 'line-numbers';
            
            // Crear contenido de código
            const codeContent = document.createElement('div');
            codeContent.className = 'code-content';
            
            // Aplicar resaltado de sintaxis según el lenguaje
            codeLines.forEach((line, lineIndex) => {
                // Número de línea
                const lineNumber = document.createElement('div');
                lineNumber.className = 'line-number';
                lineNumber.textContent = lineIndex + 1;
                lineNumbers.appendChild(lineNumber);
                
                // Contenido de la línea
                const codeLine = document.createElement('div');
                codeLine.className = 'code-line';
                
                // Aplicar resaltado de sintaxis según el lenguaje
                if (language === 'php') {
                    // Resaltado de sintaxis PHP
                    let highlightedLine = line
                        // Resaltar etiquetas PHP
                        .replace(/(&lt;\?php|\?&gt;)/g, '<span class="php-tag">$1</span>')
                        // Resaltar palabras clave
                        .replace(/\b(echo|if|else|foreach|while|function|return|include|require|class|new|public|private|protected)\b/g, '<span class="php-keyword">$1</span>')
                        // Resaltar cadenas
                        .replace(/"([^"]*)"/g, '<span class="php-string">"$1"</span>')
                        .replace(/'([^']*)'/g, '<span class="php-string">\'$1\'</span>')
                        // Resaltar variables
                        .replace(/(\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/g, '<span class="php-variable">$1</span>')
                        // Resaltar comentarios
                        .replace(/(\/\/[^\n]*|#[^\n]*)/g, '<span class="php-comment">$1</span>')
                        // Resaltar números
                        .replace(/\b(\d+)\b/g, '<span class="php-number">$1</span>');

                    codeLine.innerHTML = highlightedLine || '&nbsp;';
                } else {
                    // Para otros lenguajes, simplemente mostrar el texto
                    codeLine.textContent = line || ' ';
                }
                
                codeContent.appendChild(codeLine);
            });
            
            // Añadir barra de estado
            const statusBar = document.createElement('div');
            statusBar.className = 'vscode-statusbar';
            statusBar.innerHTML = `
                <div class="status-left">
                    <span class="status-item">PHP</span>
                    <span class="status-item">0 Problemas</span>
                </div>
                <div class="status-right">
                    <span class="status-item">UTF-8</span>
                    <span class="status-item">LF</span>
                    <span class="status-item">Ln ${codeLines.length}, Col 1</span>
                </div>
            `;
            
            // Añadir botones de acción
            const actionButtons = document.createElement('div');
            actionButtons.className = 'vscode-action-buttons';
            actionButtons.innerHTML = `
                <button class="copy-code-btn" data-code-id="${index}">
                    <i class="fas fa-copy"></i> Copiar
                </button>
                <button class="run-code-btn" data-code-id="${index}">
                    <i class="fas fa-play"></i> Ejecutar
                </button>
            `;
            
            // Ensamblar el editor
            editorArea.appendChild(lineNumbers);
            editorArea.appendChild(codeContent);
            main.appendChild(editorArea);
            
            titleBar.appendChild(windowControls);
            titleBar.appendChild(tabs);
            
            editorContainer.appendChild(titleBar);
            editorContainer.appendChild(main);
            editorContainer.appendChild(statusBar);
            editorContainer.appendChild(actionButtons);
            
            // Crear container para resultados (terminal)
            const terminalContainer = document.createElement('div');
            terminalContainer.className = 'vscode-terminal';
            terminalContainer.style.display = 'none'; // Inicialmente oculto
            terminalContainer.innerHTML = `
                <div class="terminal-header">
                    <i class="fas fa-terminal"></i> Terminal
                </div>
                <div class="terminal-content">
                    <div class="terminal-prompt">$ php ${filename}</div>
                    <div id="result-${index}" class="terminal-output"></div>
                </div>
            `;
            
            // Reemplazar el bloque de código original con nuestro editor VS Code
            const wrapper = document.createElement('div');
            wrapper.className = 'vscode-wrapper';
            wrapper.appendChild(editorContainer);
            wrapper.appendChild(terminalContainer);
            
            block.replaceWith(wrapper);
            
            // Almacenar el código original como un atributo de datos para usarlo más tarde
            wrapper.dataset.originalCode = originalCode;
        });
        
        // Añadir event listeners a los botones
        document.querySelectorAll('.copy-code-btn').forEach(button => {
            button.addEventListener('click', function() {
                const codeId = this.getAttribute('data-code-id');
                const wrapper = document.getElementById(`editor-${codeId}`).closest('.vscode-wrapper');
                const code = wrapper.dataset.originalCode;
                
                navigator.clipboard.writeText(code).then(() => {
                    this.innerHTML = '<i class="fas fa-check"></i> Copiado';
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-copy"></i> Copiar';
                    }, 2000);
                });
            });
        });
        
        document.querySelectorAll('.run-code-btn').forEach(button => {
            button.addEventListener('click', function() {
                const codeId = this.getAttribute('data-code-id');
                const wrapper = document.getElementById(`editor-${codeId}`).closest('.vscode-wrapper');
                const code = wrapper.dataset.originalCode;
                const terminal = wrapper.querySelector('.vscode-terminal');
                const resultContainer = wrapper.querySelector('.terminal-output');
                
                // Mostrar terminal
                terminal.style.display = 'block';
                
                // Simulación de ejecución de PHP (en un entorno real, esto sería una llamada AJAX a un backend PHP)
                if (code.includes('<?php')) {
                    // Procesamiento simple de código PHP (simulado)
                    let result = '';
                    
                    // Simulación MUY básica de ejecución PHP (solo para ejemplos)
                    const lines = code.split('\n');
                    lines.forEach(line => {
                        if (line.includes('echo')) {
                            // Extraer lo que está después de echo
                            const echoContent = line.split('echo')[1].trim();
                            
                            // Eliminar punto y coma y comillas
                            let output = echoContent.replace(/;$/, '').trim();
                            if (output.startsWith('"') && output.endsWith('"')) {
                                output = output.substring(1, output.length - 1);
                            } else if (output.startsWith("'") && output.endsWith("'")) {
                                output = output.substring(1, output.length - 1);
                            }
                            
                            result += output + '\n';
                        }
                    });
                    
                    resultContainer.textContent = result;
                    resultContainer.classList.add('result-updated');
                    setTimeout(() => {
                        resultContainer.classList.remove('result-updated');
                    }, 300);
                } else {
                    resultContainer.textContent = "Este código no contiene PHP ejecutable o contiene funciones no soportadas en esta simulación.";
                }
            });
        });
    }

    // Hacer que las tarjetas y pestañas sean responsivas en dispositivos móviles
    function setupResponsiveUI() {
        // Añadir clases especiales para dispositivos móviles a los componentes que lo requieran
        if (window.innerWidth < 768) {
            document.querySelectorAll('.vscode-editor').forEach(editor => {
                editor.classList.add('mobile-view');
            });
            
            // Simplificar la UI para móviles
            document.querySelectorAll('.vscode-sidebar').forEach(sidebar => {
                sidebar.style.display = 'none';
            });
        }
        
        // Evento de cambio de tamaño de ventana
        window.addEventListener('resize', function() {
            if (window.innerWidth < 768) {
                document.querySelectorAll('.vscode-editor').forEach(editor => {
                    editor.classList.add('mobile-view');
                });
                document.querySelectorAll('.vscode-sidebar').forEach(sidebar => {
                    sidebar.style.display = 'none';
                });
            } else {
                document.querySelectorAll('.vscode-editor').forEach(editor => {
                    editor.classList.remove('mobile-view');
                });
                document.querySelectorAll('.vscode-sidebar').forEach(sidebar => {
                    sidebar.style.display = 'block';
                });
            }
        });
    }
    
    // Inicializar la interfaz responsiva
    setupResponsiveUI();

    // Asignar evento a todos los botones de copiar
    const copyButtons = document.querySelectorAll('.vscode-editor-btn.copy');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener el contenedor del editor
            const editorContainer = this.closest('.vscode-editor');
            
            // Obtener todas las líneas de código en el editor
            const codeLines = editorContainer.querySelectorAll('.line');
            
            // Compilar el código completo
            let codeText = '';
            codeLines.forEach(line => {
                codeText += line.textContent + '\n';
            });
            
            // Copiar al portapapeles
            navigator.clipboard.writeText(codeText)
                .then(() => {
                    // Feedback visual temporal
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Copiado';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Error al copiar el texto: ', err);
                });
        });
    });

    // Asignar evento a todos los botones de ejecutar
    const executeButtons = document.querySelectorAll('.vscode-editor-btn.execute');
    executeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener el contenedor del editor
            const editorContainer = this.closest('.vscode-editor');
            
            // Obtener todas las líneas de código en el editor
            const codeLines = editorContainer.querySelectorAll('.line');
            
            // Compilar el código completo
            let phpCode = '';
            codeLines.forEach(line => {
                phpCode += line.textContent + '\n';
            });
            
            // Buscar o crear un panel de resultados
            let resultPanel = editorContainer.nextElementSibling;
            if (!resultPanel || !resultPanel.classList.contains('result-panel')) {
                resultPanel = document.createElement('div');
                resultPanel.className = 'result-panel';
                resultPanel.innerHTML = '<div class="result-header">Resultado:</div><div class="result-output"></div>';
                editorContainer.parentNode.insertBefore(resultPanel, editorContainer.nextSibling);
            }
            
            // Mostrar animación de carga
            const resultOutput = resultPanel.querySelector('.result-output');
            resultOutput.innerHTML = '<div class="loading">Ejecutando código...</div>';
            
            // Aquí normalmente enviarías el código a un servidor para ejecutarlo
            // Por ahora, simularemos la ejecución de código PHP básico
            simulatePhpExecution(phpCode, resultOutput);
        });
    });
    
    // Función para simular la ejecución de código PHP
    function simulatePhpExecution(code, outputElement) {
        // Simular una pequeña demora para la ejecución
        setTimeout(() => {
            // Extraer comandos echo
            let output = '';
            const echoRegex = /echo\s+"([^"]*)";/g;
            let match;
            
            while ((match = echoRegex.exec(code)) !== null) {
                output += match[1] + '<br>';
            }
            
            // Si no encontramos ningún echo, mostramos un mensaje predeterminado
            if (output === '') {
                output = '<em>Este código no contiene sentencias de salida (echo).</em>';
            }
            
            // Mostrar el resultado
            outputElement.innerHTML = output;
        }, 500);
    }

    // Función para inicializar el ejercicio de relacionar conceptos con drag and drop
    function initDragAndDropExercise() {
        // Seleccionar todos los elementos arrastrables (conceptos)
        const draggables = document.querySelectorAll('.draggable.concept');
        // Seleccionar todos los lugares donde se pueden soltar (definiciones)
        const dropZones = document.querySelectorAll('.droppable.definition');
        
        // Para almacenar las relaciones actuales
        let currentMatches = {};
        
        // Aplicar eventos a los elementos arrastrables
        draggables.forEach(draggable => {
            // Cuando comienza el arrastre
            draggable.addEventListener('dragstart', function(e) {
                // Añadir clase para estilo visual durante el arrastre
                this.classList.add('dragging');
                // Almacenar el ID del concepto que se está arrastrando
                e.dataTransfer.setData('text/plain', this.dataset.id);
            });
            
            // Cuando termina el arrastre
            draggable.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
            
            // Hacer que los elementos vuelvan a ser arrastrables después de soltarlos
            draggable.addEventListener('mousedown', function() {
                // Si este elemento ya había sido colocado en alguna definición, revertir esa relación
                const conceptId = this.dataset.id;
                if (currentMatches[conceptId]) {
                    const previousDrop = document.querySelector(`.droppable[data-matched="${conceptId}"]`);
                    if (previousDrop) {
                        previousDrop.classList.remove('matched');
                        previousDrop.removeAttribute('data-matched');
                        // Eliminar esta relación de nuestro registro
                        delete currentMatches[conceptId];
                    }
                }
            });
        });
        
        // Aplicar eventos a las zonas donde se pueden soltar los elementos
        dropZones.forEach(dropZone => {
            // Cuando un elemento arrastrable entra en la zona
            dropZone.addEventListener('dragover', function(e) {
                e.preventDefault(); // Permitir que se suelte aquí
                this.classList.add('dragover');
            });
            
            // Cuando un elemento arrastrable sale de la zona
            dropZone.addEventListener('dragleave', function() {
                this.classList.remove('dragover');
            });
            
            // Cuando se suelta un elemento en la zona
            dropZone.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('dragover');
                
                // Obtener el ID del concepto que se soltó
                const conceptId = e.dataTransfer.getData('text/plain');
                const concept = document.querySelector(`.draggable.concept[data-id="${conceptId}"]`);
                
                // Si esta definición ya tenía un concepto, devolverlo a su lugar original
                if (this.hasAttribute('data-matched')) {
                    const previousConceptId = this.getAttribute('data-matched');
                    const previousConcept = document.querySelector(`.draggable.concept[data-id="${previousConceptId}"]`);
                    // Restaurar el concepto anterior a su posición original
                    if (previousConcept) {
                        previousConcept.style.opacity = '1';
                    }
                }
                
                // Marcar esta zona como emparejada con el nuevo concepto
                this.setAttribute('data-matched', conceptId);
                this.classList.add('matched');
                
                // Crear un clon del concepto para mostrarlo dentro de la definición
                const clonedConcept = concept.cloneNode(true);
                clonedConcept.classList.add('matched-concept');
                clonedConcept.removeAttribute('draggable');
                
                // Limpiar cualquier contenido anterior y añadir el concepto clonado
                const existingClones = this.querySelectorAll('.matched-concept');
                existingClones.forEach(clone => clone.remove());
                this.prepend(clonedConcept);
                
                // Hacer que el concepto original sea menos visible para indicar que ya ha sido colocado
                concept.style.opacity = '0.5';
                
                // Actualizar nuestro registro de relaciones
                currentMatches[conceptId] = this.dataset.id;
            });
        });
        
        // Validar las relaciones cuando se hace clic en el botón de verificar
        const checkMatchingBtn = document.querySelector('.check-matching');
        if (checkMatchingBtn) {
            checkMatchingBtn.addEventListener('click', function() {
                let correctMatches = 0;
                const totalMatches = dropZones.length;
                
                // Comprobar cada relación
                dropZones.forEach(dropZone => {
                    if (dropZone.hasAttribute('data-matched')) {
                        const matchedConceptId = dropZone.getAttribute('data-matched');
                        const expectedConceptId = dropZone.dataset.id;
                        
                        if (matchedConceptId === expectedConceptId) {
                            // Es una relación correcta
                            dropZone.classList.add('correct-match');
                            correctMatches++;
                        } else {
                            // Es una relación incorrecta
                            dropZone.classList.add('incorrect-match');
                        }
                    }
                });
                
                // Mostrar resultado
                let message = '';
                if (correctMatches === totalMatches) {
                    message = `¡Excelente! Has emparejado correctamente todos los conceptos (${correctMatches}/${totalMatches}).`;
                } else {
                    message = `Has conseguido ${correctMatches} de ${totalMatches} emparejamientos correctos. Sigue intentándolo.`;
                }
                
                // Mostrar un mensaje con el resultado
                alert(message);
                
                // Si no se han acertado todos, permitir seguir intentando
                if (correctMatches !== totalMatches) {
                    // Después de un tiempo, eliminar las clases de feedback visual
                    setTimeout(() => {
                        dropZones.forEach(dropZone => {
                            dropZone.classList.remove('correct-match', 'incorrect-match');
                        });
                    }, 2000);
                }
            });
        }
    }
});

// --------- INICIO: NUEVAS FUNCIONES PARA QUIZZES ---------

// Agregar función para inicializar quizzes
function initQuizzes() {
    const quizzes = document.querySelectorAll('.php-quiz');
    
    quizzes.forEach(quiz => {
        const questions = quiz.querySelectorAll('.quiz-question');
        const submitButton = quiz.querySelector('.quiz-submit');
        const resultArea = quiz.querySelector('.quiz-result');
        const progressBar = quiz.querySelector('.quiz-progress-bar');
        
        submitButton.addEventListener('click', function() {
            let correctAnswers = 0;
            const totalQuestions = questions.length;
            
            questions.forEach(question => {
                const options = question.querySelectorAll('input[type="radio"]');
                const correctOption = question.querySelector('input[data-correct="true"]');
                let selectedOption = null;
                
                options.forEach(option => {
                    if (option.checked) {
                        selectedOption = option;
                    }
                    
                    // Deshabilitar las opciones después de enviar
                    option.disabled = true;
                    
                    // Resaltar la opción correcta
                    if (option === correctOption) {
                        option.parentElement.classList.add('correct-answer');
                    }
                });
                
                if (selectedOption) {
                    if (selectedOption === correctOption) {
                        correctAnswers++;
                        question.classList.add('correct');
                        selectedOption.parentElement.classList.add('selected-correct');
                    } else {
                        question.classList.add('incorrect');
                        selectedOption.parentElement.classList.add('selected-incorrect');
                    }
                }
            });
            
            // Mostrar resultado
            const percentage = Math.round((correctAnswers / totalQuestions) * 100);
            
            // Actualizar la barra de progreso
            if (progressBar) {
                progressBar.style.width = percentage + '%';
                progressBar.setAttribute('aria-valuenow', percentage);
                progressBar.textContent = percentage + '%';
                
                if (percentage >= 80) {
                    progressBar.classList.remove('bg-warning', 'bg-danger');
                    progressBar.classList.add('bg-success');
                } else if (percentage >= 50) {
                    progressBar.classList.remove('bg-success', 'bg-danger');
                    progressBar.classList.add('bg-warning');
                } else {
                    progressBar.classList.remove('bg-success', 'bg-warning');
                    progressBar.classList.add('bg-danger');
                }
            }
            
            // Mensaje personalizado según el porcentaje
            let message = '';
            if (percentage >= 80) {
                message = '¡Excelente trabajo! Dominas este tema.';
            } else if (percentage >= 60) {
                message = 'Buen trabajo. Puedes revisar los conceptos en los que fallaste.';
            } else {
                message = 'Te recomendamos repasar esta sección para reforzar los conceptos.';
            }
            
            // Actualizar el área de resultados
            resultArea.innerHTML = `
                <div class="alert ${percentage >= 60 ? 'alert-success' : 'alert-warning'}">
                    <h4>Resultado: ${correctAnswers}/${totalQuestions} (${percentage}%)</h4>
                    <p>${message}</p>
                    <button class="btn btn-primary quiz-retry">Reintentar</button>
                </div>
            `;
            
            // Botón para reintentar
            const retryButton = resultArea.querySelector('.quiz-retry');
            retryButton.addEventListener('click', function() {
                // Resetear el quiz
                questions.forEach(question => {
                    const options = question.querySelectorAll('input[type="radio"]');
                    
                    options.forEach(option => {
                        option.checked = false;
                        option.disabled = false;
                        option.parentElement.classList.remove('correct-answer', 'selected-correct', 'selected-incorrect');
                    });
                    
                    question.classList.remove('correct', 'incorrect');
                });
                
                resultArea.innerHTML = '';
                if (progressBar) {
                    progressBar.style.width = '0%';
                    progressBar.setAttribute('aria-valuenow', 0);
                    progressBar.textContent = '';
                }
            });
            
            // Guardar progreso en localStorage
            saveQuizProgress(quiz.id, percentage);
            
            // Actualizar indicadores de progreso en la navegación
            updateProgressIndicators();
            
            // Desplazarse al área de resultados
            resultArea.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Guardar progreso de quizzes en localStorage
function saveQuizProgress(quizId, percentage) {
    if (!quizId) return;
    
    let progress = JSON.parse(localStorage.getItem('phpGuideProgress')) || {};
    progress[quizId] = percentage;
    localStorage.setItem('phpGuideProgress', JSON.stringify(progress));
}

// Cargar progreso de quizzes desde localStorage
function loadQuizProgress() {
    const progress = JSON.parse(localStorage.getItem('phpGuideProgress')) || {};
    
    // Actualizar barras de progreso en los quizzes
    for (const quizId in progress) {
        const quiz = document.getElementById(quizId);
        if (quiz) {
            const progressBar = quiz.querySelector('.quiz-progress-bar');
            if (progressBar) {
                const percentage = progress[quizId];
                progressBar.style.width = percentage + '%';
                progressBar.setAttribute('aria-valuenow', percentage);
                progressBar.textContent = percentage + '%';
                
                if (percentage >= 80) {
                    progressBar.classList.add('bg-success');
                } else if (percentage >= 50) {
                    progressBar.classList.add('bg-warning');
                } else {
                    progressBar.classList.add('bg-danger');
                }
            }
        }
    }
    
    // Actualizar indicadores de progreso en la navegación
    updateProgressIndicators();
}

// Actualizar indicadores de progreso en la navegación
function updateProgressIndicators() {
    const progress = JSON.parse(localStorage.getItem('phpGuideProgress')) || {};
    const navLinks = document.querySelectorAll('.nav-link[data-quiz-id]');
    
    navLinks.forEach(link => {
        const quizId = link.getAttribute('data-quiz-id');
        if (quizId && progress[quizId]) {
            const percentage = progress[quizId];
            let badge = link.querySelector('.badge');
            
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'badge ms-2';
                link.appendChild(badge);
            }
            
            badge.textContent = percentage + '%';
            
            if (percentage >= 80) {
                badge.className = 'badge bg-success ms-2';
            } else if (percentage >= 50) {
                badge.className = 'badge bg-warning ms-2';
            } else {
                badge.className = 'badge bg-danger ms-2';
            }
        }
    });
}

// --------- FIN: NUEVAS FUNCIONES PARA QUIZZES ---------

// --------- INICIO: NUEVAS FUNCIONES PARA QUIZZES Y DESAFÍOS ---------

// Quiz System
function initializeQuizzes() {
    const quizzes = document.querySelectorAll('.php-quiz');
    
    quizzes.forEach(quiz => {
        const submitBtn = quiz.querySelector('.quiz-submit');
        const resultDiv = quiz.querySelector('.quiz-result');
        const progressBar = quiz.querySelector('.quiz-progress-bar');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                let score = 0;
                let totalQuestions = 0;
                
                const questions = quiz.querySelectorAll('.quiz-question');
                questions.forEach(question => {
                    totalQuestions++;
                    const options = question.querySelectorAll('input[type="radio"]');
                    const selectedOption = Array.from(options).find(option => option.checked);
                    
                    // Reset previous results
                    question.classList.remove('correct', 'incorrect');
                    options.forEach(option => {
                        option.parentElement.parentElement.classList.remove('selected-correct', 'selected-incorrect', 'correct-answer');
                    });
                    
                    // Check if correct answer is selected
                    if (selectedOption) {
                        const correctOption = Array.from(options).find(option => option.dataset.correct === 'true');
                        
                        // Mark the correct answer
                        correctOption.parentElement.parentElement.classList.add('correct-answer');
                        
                        if (selectedOption.dataset.correct === 'true') {
                            // Correct answer
                            score++;
                            question.classList.add('correct');
                            selectedOption.parentElement.parentElement.classList.add('selected-correct');
                        } else {
                            // Incorrect answer
                            question.classList.add('incorrect');
                            selectedOption.parentElement.parentElement.classList.add('selected-incorrect');
                        }
                    } else {
                        // No answer selected
                        question.classList.add('incorrect');
                        const correctOption = Array.from(options).find(option => option.dataset.correct === 'true');
                        correctOption.parentElement.parentElement.classList.add('correct-answer');
                    }
                });
                
                // Update progress bar
                if (progressBar) {
                    const percentage = (score / totalQuestions) * 100;
                    progressBar.style.width = percentage + '%';
                    
                    if (percentage >= 80) {
                        progressBar.className = 'quiz-progress-bar bg-success';
                    } else if (percentage >= 60) {
                        progressBar.className = 'quiz-progress-bar bg-info';
                    } else if (percentage >= 40) {
                        progressBar.className = 'quiz-progress-bar bg-warning';
                    } else {
                        progressBar.className = 'quiz-progress-bar bg-danger';
                    }
                }
                
                // Show result
                if (resultDiv) {
                    resultDiv.innerHTML = `
                        <div class="alert ${score/totalQuestions >= 0.7 ? 'alert-success' : 'alert-warning'}">
                            <h4 class="alert-heading">${score/totalQuestions >= 0.7 ? '¡Buen trabajo!' : 'Sigue practicando'}</h4>
                            <p>Has respondido correctamente ${score} de ${totalQuestions} preguntas.</p>
                            ${score/totalQuestions >= 0.7 ? 
                                '<p class="mb-0">¡Estás listo para continuar al siguiente tema!</p>' : 
                                '<p class="mb-0">Revisa el material y vuelve a intentar el cuestionario.</p>'
                            }
                        </div>
                    `;
                    resultDiv.style.display = 'block';
                }
                
                // Save progress to localStorage
                saveQuizProgress(quiz.id, score/totalQuestions);
                
                // Show explanations
                quiz.querySelectorAll('.quiz-explanation').forEach(exp => {
                    exp.style.display = 'block';
                });
            });
        }
    });
}

function saveQuizProgress(quizId, score) {
    if (!quizId) return;
    
    let progress = JSON.parse(localStorage.getItem('phpGuideProgress') || '{}');
    progress.quizzes = progress.quizzes || {};
    progress.quizzes[quizId] = score;
    
    // Calculate overall progress
    let totalScore = 0;
    let totalQuizzes = 0;
    
    for (let id in progress.quizzes) {
        totalScore += progress.quizzes[id];
        totalQuizzes++;
    }
    
    progress.overall = totalQuizzes > 0 ? totalScore / totalQuizzes : 0;
    
    localStorage.setItem('phpGuideProgress', JSON.stringify(progress));
    updateProgressIndicators();
}

// Challenge Mode System
function initializeChallenges() {
    const challenges = document.querySelectorAll('.challenge-container');
    
    challenges.forEach(challenge => {
        const submitBtn = challenge.querySelector('.challenge-submit');
        const resultDiv = challenge.querySelector('.challenge-result');
        const codeEditor = challenge.querySelector('.code-editor');
        
        if (submitBtn && codeEditor) {
            submitBtn.addEventListener('click', function() {
                const userCode = codeEditor.value;
                const expectedOutput = challenge.dataset.expectedOutput;
                const validateFunc = challenge.dataset.validateFunction;
                
                let isCorrect = false;
                
                if (validateFunc && typeof window[validateFunc] === 'function') {
                    // Use custom validation function if provided
                    isCorrect = window[validateFunc](userCode);
                } else if (expectedOutput) {
                    // Simple output comparison
                    const simulatedOutput = simulatePHPExecution(userCode);
                    isCorrect = simulatedOutput.trim() === expectedOutput.trim();
                }
                
                if (resultDiv) {
                    if (isCorrect) {
                        resultDiv.innerHTML = `
                            <div class="text-center mb-3">
                                <div class="challenge-badge">
                                    <i class="fas fa-trophy"></i>
                                </div>
                            </div>
                            <div class="alert alert-success">
                                <h4 class="alert-heading">¡Desafío completado!</h4>
                                <p>¡Excelente! Has resuelto el desafío correctamente.</p>
                                <p class="mb-0">Continúa para probar tus habilidades con más desafíos.</p>
                            </div>
                        `;
                        
                        // Save progress
                        saveChallengeProgress(challenge.id, true);
                    } else {
                        resultDiv.innerHTML = `
                            <div class="alert alert-warning">
                                <h4 class="alert-heading">¡Casi lo tienes!</h4>
                                <p>Tu solución no es completamente correcta.</p>
                                <p class="mb-0">Revisa las instrucciones y vuelve a intentarlo.</p>
                            </div>
                        `;
                    }
                    resultDiv.classList.add('show');
                }
            });
        }
    });
}

function saveChallengeProgress(challengeId, completed) {
    if (!challengeId) return;
    
    let progress = JSON.parse(localStorage.getItem('phpGuideProgress') || '{}');
    progress.challenges = progress.challenges || {};
    progress.challenges[challengeId] = completed;
    
    // Calculate challenge progress
    let completedChallenges = 0;
    let totalChallenges = 0;
    
    for (let id in progress.challenges) {
        if (progress.challenges[id]) completedChallenges++;
        totalChallenges++;
    }
    
    progress.challengeProgress = totalChallenges > 0 ? completedChallenges / totalChallenges : 0;
    
    localStorage.setItem('phpGuideProgress', JSON.stringify(progress));
    updateProgressIndicators();
}

// Update all progress indicators on the page
function updateProgressIndicators() {
    const progress = JSON.parse(localStorage.getItem('phpGuideProgress') || '{}');
    
    // Update overall progress bar if it exists
    const overallProgress = document.getElementById('overall-progress-bar');
    if (overallProgress && progress.overall !== undefined) {
        const percentage = progress.overall * 100;
        overallProgress.style.width = percentage + '%';
        overallProgress.setAttribute('aria-valuenow', percentage);
        
        if (percentage >= 80) {
            overallProgress.className = 'progress-bar bg-success';
        } else if (percentage >= 60) {
            overallProgress.className = 'progress-bar bg-info';
        } else if (percentage >= 40) {
            overallProgress.className = 'progress-bar bg-warning';
        } else {
            overallProgress.className = 'progress-bar bg-danger';
        }
    }
    
    // Update section completion badges
    document.querySelectorAll('[data-section-id]').forEach(element => {
        const sectionId = element.dataset.sectionId;
        if (!sectionId) return;
        
        const badge = element.querySelector('.completion-badge');
        if (!badge) return;
        
        const sectionProgress = calculateSectionProgress(sectionId, progress);
        
        if (sectionProgress >= 0.9) {
            badge.className = 'badge completion-badge bg-success';
            badge.innerHTML = '<i class="fas fa-check-circle"></i> Completado';
        } else if (sectionProgress > 0) {
            badge.className = 'badge completion-badge bg-warning';
            badge.innerHTML = '<i class="fas fa-spinner"></i> En progreso';
        } else {
            badge.className = 'badge completion-badge bg-secondary';
            badge.innerHTML = '<i class="fas fa-circle"></i> No iniciado';
        }
    });
}

function calculateSectionProgress(sectionId, progress) {
    // Get all quizzes and challenges that belong to this section
    const sectionQuizzes = {};
    const sectionChallenges = {};
    
    if (progress.quizzes) {
        for (let id in progress.quizzes) {
            if (id.startsWith(sectionId)) {
                sectionQuizzes[id] = progress.quizzes[id];
            }
        }
    }
    
    if (progress.challenges) {
        for (let id in progress.challenges) {
            if (id.startsWith(sectionId)) {
                sectionChallenges[id] = progress.challenges[id];
            }
        }
    }
    
    // Calculate section progress
    let totalItems = Object.keys(sectionQuizzes).length + Object.keys(sectionChallenges).length;
    if (totalItems === 0) return 0;
    
    let totalScore = 0;
    
    for (let id in sectionQuizzes) {
        totalScore += sectionQuizzes[id];
    }
    
    for (let id in sectionChallenges) {
        totalScore += sectionChallenges[id] ? 1 : 0;
    }
    
    return totalScore / totalItems;
}

// --------- FIN: NUEVAS FUNCIONES PARA QUIZZES Y DESAFÍOS ---------