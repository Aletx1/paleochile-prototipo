mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGkxOTAzIiwiYSI6ImNtY20xbXltazBoZ3Yya3E1bno5YTRhY2MifQ.7PFJnhis7V7KJw-RP6UPqw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-70.364234,-27.464850],
  zoom: 10
});

fetch('dinosaurios.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(dino => {
      const marker = new mapboxgl.Marker({ color: '#FF6F00' })
        .setLngLat(dino.coordenadas)
        .addTo(map);

      marker.getElement().addEventListener('click', () => mostrarInfo(dino));
    });
  })
  .catch(error => console.error('Error cargando JSON:', error));

function mostrarInfo(dino) {
  const panel = document.getElementById('info-panel');
  panel.classList.add('open');

  // Cambiar imagen
  panel.querySelector('img').src = dino.imagen;

  // Cambiar título
  panel.querySelector('h2').textContent = dino.nombre;

  // Cambiar descripción
  panel.querySelector('p').textContent = dino.descripcion;

  // Datos paleontológicos
  const datosPaleo = panel.querySelector('#datos-paleo');
  datosPaleo.innerHTML = `
    <li><strong>Nombre científico:</strong> ${dino.nombre_cientifico}</li>
    <li><strong>Época:</strong> ${dino.epoca}</li>
    <li><strong>Ubicación:</strong> ${dino.ubicacion}</li>
    <li><strong>Tamaño estimado:</strong> ${dino.tamano}</li>
    <li><strong>Dieta:</strong> ${dino.dieta}</li>
    <li><strong>Clasificación:</strong>
      <ul>
        ${dino.clasificacion.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </li>
  `;

  // Datos curiosos
  const datosCuriosos = panel.querySelector('#datos-curiosos');
  datosCuriosos.innerHTML = dino.curiosidades.map(item => `<li>${item}</li>`).join('');
}

function cerrarPanel() {
  document.getElementById('info-panel').classList.remove('open');
}
