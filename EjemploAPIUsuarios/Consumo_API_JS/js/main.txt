document.addEventListener('DOMContentLoaded', function () {
    cargarUsuarios();
});

function cargarUsuarios() {
    document.getElementById('usuarios').innerHTML = '';
    document.getElementById('error').innerText = '';
    fetch('http://localhost/usuarios/API_Usuarios/usuario.php/usuarios')
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
                        <div class="usuario-fecha"><i class="fa fa-calendar"></i> Registro: ${usuario.fecha_registro ? usuario.fecha_registro.split(' ')[0] : '/'}</div>
                    </div>
                `;
                document.getElementById('usuarios').appendChild(card);
            });
        })
        .catch(error => {
            document.getElementById('error').innerText = error.message;
        });
}
