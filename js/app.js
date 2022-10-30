// Lista los contactos al cargar la página
window.onload = function() {
  listarContactos();
}

// Header de la tabla
let tabla = `<span class="fs-5 mb-5">Contactos</span>
              <table id="table_id" class="table table-striped" style="width: 100%;">
                <thead>
                  <tr>
                    <th class="text-center">ID</th>
                    <th class="text-center">Nombre</th>
                    <th class="text-center">Número de Teléfono</th>
                    <th class="text-center">Detalles</th>
                  </tr>
                </thead>
                <tbody>`;

// Aqui se guardan los contactos
let contactos = [];

// Funcion para listar los contactos
const listarContactos = () => {
  $.ajax({
    type: "GET",
    url: "http://localhost:8000/api/contactos",
    contentType: "application/json",
    crossDomain: true,
    async: true,
    beforeSend: function() {
      console.log('Cargando...');
      $('#spinner').show();
    },
    success: function (data) {
      console.log("Contactos Recibidos: ", data)
      contactos = data;
    },
    complete: function() {
      console.log('Carga completa');
      $('#spinner').hide();

      // Llenar la tabla
      contactos.forEach(contacto => {
        tabla += `<tr>
                    <td class="text-center">${contacto.id}</td>
                    <td class="text-center">${contacto.name}</td>
                    <td class="text-center">${contacto.numero}</td>
                    <td class="text-center"><button class="btn btn-primary" onclick="verContacto(${contacto.id})" data-toggle="modal" data-target="#exampleModalCenter">Ver Más</button></td>
                  </tr>`;
      });

      tabla += '</tbody></table>';
      document.getElementById('tabla').innerHTML = tabla;
      $('#table_id').DataTable();
    },
    error: function (error) {
      console.log(error)
    }
  })
}

// Funcion para agregar un contacto
let botonAgregar = document.getElementById('botonAgregar');
botonAgregar.addEventListener('click', function() {
  let nombre = document.getElementById('nombre').value;
  let apellido = document.getElementById('apellido').value;
  let telefono = document.getElementById('telefono').value;
  let direccion = document.getElementById('direccion').value;
  let email = document.getElementById('email').value;

  let contacto = {
    name: nombre,
    apellido: apellido,
    numero: telefono,
    direccion: direccion,
    email: email
  }

  $.ajax({
    type: "POST",
    url: "http://localhost:8000/api/contactos",
    contentType: "application/json",
    crossDomain: true,
    async: true,
    data: JSON.stringify(contacto),
    beforeSend: function() {
      console.log('Cargando...');
    },
    success: function (data) {
      console.log(data)
      listarContactos();
    },
    complete: function() {
      console.log('Carga completa');
    },
    error: function (error) {
      console.log(error)
    }
  })
});

// Funcion para ver detalles de un contacto
const verContacto = (id) => {
  let contacto = contactos.find(contacto => contacto.id == id);
  console.log("Ver Contacto: ", contacto);
  let modal = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-sm modal-bg="primary" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenterTitle">Detalles del Contacto ${contacto.name}</h5>
                    </div>
                    <div class="modal-body m-auto">
                      <div class="card">
                        <div class="text-center pt-3">
                          <i class="fa-solid fa-user-tie fa-5x"></i>
                        </div>
                        <div class="card-body">
                          <h5 class="card-title text-center">${contacto.name} ${contacto.apellido}</h5>

                          <p class="card-text text-center">
                            <i class="fa-solid fa-phone"></i> ${contacto.numero}
                          </p>
                          
                          <p class="card-text text-center">
                            <i class="fas fa-map-marker-alt fa-1x"></i> ${contacto.direccion}
                          </p>

                          <p class="card-text text-center">
                            <i class="fa-solid fa-envelope"></i> ${contacto.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer justify-content-center">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                      <button class="btn btn-primary" onclick="editarContacto(${contacto.id})" data-dismiss="modal">Editar</button>
                      <button class="btn btn-danger" onclick="eliminarContacto(${contacto.id})">Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>`
  
  document.getElementById('modal').innerHTML = modal;

}

// Funcion para editar un contacto
const editarContacto = (id) => {
  let contacto = contactos.find(contacto => contacto.id == id);
  console.log("Contacto a Editar: ", contacto);

  $('#editarSection').show();
  $('#agregarSection').hide();

  $('#nombreEditar').val(contacto.name);
  $('#apellidoEditar').val(contacto.apellido);
  $('#telefonoEditar').val(contacto.numero);
  $('#direccionEditar').val(contacto.direccion);
  $('#emailEditar').val(contacto.email);

  let botonEditar = document.getElementById('botonEditar');
  botonEditar.addEventListener('click', () => {
    let nuevoNombre = $('#nombreEditar').val();
    let nuevoApellido = $('#apellidoEditar').val();
    let nuevoTelefono = $('#telefonoEditar').val();
    let nuevaDireccion = $('#direccionEditar').val();
    let nuevoEmail = $('#emailEditar').val();

    let nuevoContacto = {
      name: nuevoNombre,
      apellido: nuevoApellido,
      numero: nuevoTelefono,
      direccion: nuevaDireccion,
      email: nuevoEmail
    }

    $.ajax({
      type: "PATCH",
      url: `http://localhost:8000/api/contactos/${id}`,
      contentType: "application/json",
      crossDomain: true,
      async: true,
      data: JSON.stringify(nuevoContacto),
      beforeSend: function() {
        console.log('Editando...');
      },
      success: function (data) {
        console.log(data)
        listarContactos();
      },
      complete: function() {
        console.log('Edición completa');
      },
      error: function (error) {
        console.log(error)
      }
    })
  });

}

// Funcion para eliminar un contacto
const eliminarContacto = (id) => {
  let contacto = contactos.find(contacto => contacto.id == id);
  console.log('Eliminar: ', contacto);
  $.ajax({
    type: "DELETE",
    url: `http://localhost:8000/api/contactos/${id}`,
    contentType: "application/json",
    crossDomain: true,
    async: true,
    beforeSend: function() {
      console.log('Cargando...');
    },
    success: function (data) {
      console.log(data)
      listarContactos();
      window.location.reload();
    },
    complete: function() {
      console.log('Carga completa');
    },
    error: function (error) {
      console.log(error)
    }
  })
}

// Funcion para cancelar y ocultar el formulario de editar
let botonCancelarEditar = document.getElementById('botonCancelarEditar');
botonCancelarEditar.addEventListener('click', function() {
  $('#editarSection').hide();
  $('#agregarSection').show();
});

