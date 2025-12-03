/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
    /******************************************
     * ESTRUCTURAS DE DATOS
     ******************************************/
    // Clase Servicio (objeto)
    class Servicio {
      constructor(id, nombre, categoria, costo, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.costo = costo;
        this.descripcion = descripcion;
      }
    }

    // Arreglo unidimensional (lista de servicios)
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];

    // Arreglo bidimensional de ejemplo (inventario por almacén)
    // filas = almacenes, columnas = cantidad de X recurso (ejemplo numérico)
    let inventarioMatrix = [
      ['Almacen Norte', 12, 8, 5],
      ['Almacen Sur', 7, 14, 9]
    ];

    // Clientes y Reclamos (ejemplos)
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    let reclamos = JSON.parse(localStorage.getItem('reclamos')) || [];

    /******************************************
     * FUNCIONES CRUD PARA SERVICIOS
     ******************************************/
    function guardarLocal() {
      localStorage.setItem('servicios', JSON.stringify(servicios));
      localStorage.setItem('clientes', JSON.stringify(clientes));
      localStorage.setItem('reclamos', JSON.stringify(reclamos));
    }

    // Insertar
    function insertarServicio() {
      const id = document.getElementById('srv-id').value.trim();
      if (!id) { alert('Debe ingresar un ID'); return; }
      if (servicios.find(s => s.id === id)) { alert('ID ya existe'); return; }

      const nombre = document.getElementById('srv-nombre').value.trim();
      const costo = parseFloat(document.getElementById('srv-costo').value) || 0;
      const categoria = document.getElementById('srv-categoria').value;
      const descripcion = document.getElementById('srv-desc').value.trim();

      const nuevo = new Servicio(id, nombre, categoria, costo, descripcion);
      servicios.push(nuevo);
      guardarLocal();
      mostrarServicios();
      limpiarFormularioServicios();
    }

    // Buscar (devuelve objeto o null)
    function buscarServicio(id) {
      return servicios.find(s => s.id === id) || null;
    }

    // Interfaz: buscar por ID y cargar al formulario
    function buscarServicioUI() {
      const id = prompt('Ingrese ID del servicio a buscar:');
      if (!id) return;
      const svc = buscarServicio(id.trim());
      if (!svc) { alert('Servicio no encontrado'); return; }
      cargarServicioEnFormulario(svc);
      alert('Servicio cargado en el formulario para editar/ver.');
    }

    // Editar (usa formulario cargado)
    function editarServicioUI() {
      const id = document.getElementById('srv-id').value.trim();
      if (!id) { alert('Ingrese el ID del servicio que desea editar'); return; }
      const svc = buscarServicio(id);
      if (!svc) { alert('Servicio no encontrado'); return; }
      svc.nombre = document.getElementById('srv-nombre').value.trim();
      svc.categoria = document.getElementById('srv-categoria').value;
      svc.costo = parseFloat(document.getElementById('srv-costo').value) || 0;
      svc.descripcion = document.getElementById('srv-desc').value.trim();
      guardarLocal();
      mostrarServicios();
      alert('Servicio actualizado.');
    }

    // Eliminar (UI)
    function eliminarServicioUI() {
      const id = document.getElementById('srv-id').value.trim();
      if (!id) { alert('Ingrese ID a eliminar'); return; }
      if (!confirm('¿Eliminar servicio con ID ' + id + '?')) return;
      servicios = servicios.filter(s => s.id !== id);
      guardarLocal();
      mostrarServicios();
      limpiarFormularioServicios();
    }

    // Mostrar (poblar tabla)
    function mostrarServicios() {
      const tbody = document.querySelector('#tablaServicios tbody');
      tbody.innerHTML = '';
      servicios.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${s.id}</td>
                        <td>${s.nombre}</td>
                        <td>${s.categoria}</td>
                        <td>${s.costo.toFixed(2)}</td>
                        <td>${s.descripcion}</td>`;
        tr.addEventListener('click', () => cargarServicioEnFormulario(s));
        tbody.appendChild(tr);
      });
      // mostrar la matriz ejemplo también
      document.getElementById('matrixPreview').textContent = JSON.stringify(inventarioMatrix, null, 2);
    }

    // Ordenar por costo ascendente
    function ordenarPorCosto() {
      servicios.sort((a,b) => a.costo - b.costo);
      guardarLocal();
      mostrarServicios();
    }

    // Vaciar lista (UI)
    function vaciarServicios() {
      if (!confirm('¿Vaciar todos los servicios?')) return;
      servicios = [];
      guardarLocal();
      mostrarServicios();
    }

    // Cargar servicio en formulario
    function cargarServicioEnFormulario(s) {
      document.getElementById('srv-id').value = s.id;
      document.getElementById('srv-nombre').value = s.nombre;
      document.getElementById('srv-costo').value = s.costo;
      document.getElementById('srv-categoria').value = s.categoria;
      document.getElementById('srv-desc').value = s.descripcion;
    }

    function limpiarFormularioServicios() {
      document.getElementById('srv-id').value = '';
      document.getElementById('srv-nombre').value = '';
      document.getElementById('srv-costo').value = '';
      document.getElementById('srv-categoria').selectedIndex = 0;
      document.getElementById('srv-desc').value = '';
    }

 


    /******************************************
     * INICIALIZACIÓN Y EVENTOS
     ******************************************/
    // Pestañas
    document.querySelectorAll('.tab').forEach(t => {
      t.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        const target = t.dataset.tab;
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.add('hidden'));
        document.getElementById(target).classList.remove('hidden');
      });
    });

    // Inicializar tablas al cargar la página
    mostrarServicios();
    mostrarClientes();
    mostrarReclamos();

    // Ejemplo: cómo usar un arreglo bidimensional para actualizar cantidades
    // Supongamos que index 1 representa 'Siembra', index 2 'Riego', index 3 'Fertiliz.'
    function actualizarMatriz(almacenIndex, cantidadesArray) {
      // cantidadesArray = [cantSiembra, cantRiego, cantFert]
      if (!inventarioMatrix[almacenIndex]) return;
      inventarioMatrix[almacenIndex] = [inventarioMatrix[almacenIndex][0], ...cantidadesArray];
      document.getElementById('matrixPreview').textContent = JSON.stringify(inventarioMatrix, null, 2);
    }

    // Ejemplo de uso (solo demostración):
    // actualizarMatriz(0, [20,10,7]);

    /******************************************
     * NOTAS:
     * - El código está comentado y organizado para que lo expliques en la entrega.
     * - Si quieres que los IDs se autogeneren, lo adaptamos.
     * - Puedes reemplazar las rutas de imagen/audio/video por archivos locales.
     ******************************************/

