const contenedor = document.getElementById('lista-libros');

async function cargarLibros() {
    try {
        // Asegúrate de que tu servidor esté corriendo en el puerto 3000
        const respuesta = await fetch('http://localhost:3000/libros');
        const libros = await respuesta.json();

        // Limpiamos el mensaje de "Cargando"
        contenedor.innerHTML = '';

        libros.forEach(libro => {
            const card = document.createElement('div');
            card.className = 'libro-card';
            
            card.innerHTML = `
                <div>
                    <h3>${libro.titulo}</h3>
                    <p><strong>Autor:</strong> ${libro.autor ? libro.autor.nombre : 'Anónimo'}</p>
                    <p>${libro.descripcion || 'Sin descripción disponible.'}</p>
                </div>
                <div class="precio">$ ${libro.precio || '0.00'}</div>
                <button class="btn-detalle">Ver más</button>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        contenedor.innerHTML = `<p style="color: #ef4444;">Error al conectar con la API. ¿Encendiste el servidor?</p>`;
        console.error("Error:", error);
    }
}

cargarLibros();