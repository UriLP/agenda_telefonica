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
      console.log('Carga completa!');
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

  // Obtener los valores de los inputs con getElementById
  let nombre = document.getElementById('nombre').value;
  let apellido = document.getElementById('apellido').value;
  let telefono = document.getElementById('telefono').value;
  let direccion = document.getElementById('direccion').value;
  let email = document.getElementById('email').value;

  // Crear el objeto contacto con los nuevos valores
  let contacto = {
    name: nombre,
    apellido: apellido,
    numero: telefono,
    direccion: direccion,
    email: email
  }

  // Enviar el objeto contacto al servidor
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
      console.log('Éxito!', data);
      listarContactos();
    },
    complete: function() {
      console.log('Carga completa!');
    },
    error: function (error) {
      console.log(error);
    }
  });

});

// Funcion para ver detalles de un contacto
const verContacto = (id) => {
  let contacto = contactos.find(contacto => contacto.id == id);
  console.log("Ver Contacto: ", contacto);

  // Llenar el modal con los datos del contacto
  let modal = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-bg="primary" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenterTitle">Detalles del Contacto ${contacto.name}</h5>
                    </div>
                    <div class="modal-body m-auto">
                      <div class="card px-5">
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

                          <p class="card-text text-center fs-6">
                            <i class="fa-solid fa-square-phone"></i> Otros Números
                            `
                              // Si el contacto tiene otros números, los listamos
                              if (contacto.otrosNumeros.length > 0) {
                                for (let i = 0; i < contacto.otrosNumeros.length; i++) {
                                  let numero = contacto.otrosNumeros[i];
                                  console.log(numero);
                                  modal += `<li class="text-center">${numero.telefono}</li>`;
                                }
                                // Si no tiene otros números, mostramos un mensaje
                              } else {
                                modal += `<li class="text-center">No hay otros números</li>`;
                              }
                            modal += `

                          </p>

                        </div>
                      </div>
                    </div>
                    <div class="modal-footer justify-content-center">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                      `
                      // Puedes agregar hasta 3 numeros, si ya tiene 3, no mostramos el boton
                      if (contacto.otrosNumeros.length < 3) {
                        modal += `<button class="btn btn-success" onclick="nuevoNumero(${contacto.id})" data-dismiss="modal">Nuevo Número</button>`
                      }
                      modal += `
                      
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

  // Llenar los inputs con los datos del contacto con jQuery
  $('#nombreEditar').val(contacto.name);
  $('#apellidoEditar').val(contacto.apellido);
  $('#telefonoEditar').val(contacto.numero);
  $('#direccionEditar').val(contacto.direccion);
  $('#emailEditar').val(contacto.email);

  let botonEditar = document.getElementById('botonEditar');
  botonEditar.addEventListener('click', () => {

    // Llenar los inputs con los nuevos datos del contacto con jQuery
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

    // Hacer la peticion Post con el id del contacto a editar
    $.ajax({
      type: "POST",
      url: `http://localhost:8000/api/contactos/${id}`,
      contentType: "application/json",
      crossDomain: true,
      async: true,
      data: JSON.stringify(nuevoContacto),
      beforeSend: function() {
        console.log('Editando...');
      },
      success: function (data) {
        console.log('Éxito', data)
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

// Funcion para agregar un nuevo numero al contacto
const nuevoNumero = (id) => {
  let contacto = contactos.find(contacto => contacto.id == id);
  console.log("Nuevo numero para el contacto: ", contacto);

  $('#editarSection').hide();
  $('#agregarSection').hide();
  $('#nuevoNumeroSection').show();

  // Recuperamos los datos del contacto para volver a mandarlos
  let Nombre = contacto.name;
  let Apellido = contacto.apellido;
  let Telefono = contacto.numero;
  let Direccion = contacto.direccion;
  let Email = contacto.email;

  let botonAgregarNumero = document.getElementById('botonAgregarNumero');
  botonAgregarNumero.addEventListener('click', () => {

    // Obtenemos el nuevo numero
    let nuevoTelefono = $('#telefonoNuevo').val();

    // Creamos un objeto con el campo otrosNumeros y dentro un array con el nuevo numero
    let nuevoNumero = {
      name: Nombre,
      apellido: Apellido,
      numero: Telefono,
      direccion: Direccion,
      email: Email,
      otrosNumeros: {
        "0": {
          telefono: nuevoTelefono,
        }
      }
    }
    
    // Hacemos la peticion Post con el id del contacto y mandamos el objeto con el nuevo numero
    $.ajax({
      type: "POST",
      url: `http://localhost:8000/api/contactos/${id}`,
      contentType: "application/json",
      crossDomain: true,
      async: true,
      data: JSON.stringify(nuevoNumero),
      beforeSend: function() {
        console.log('Agregando Numeros...');
      },
      success: function (data) {
        console.log('Éxito!', data)
        listarContactos();
      },
      complete: function() {
        console.log('Servicio completado');
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

  // Hacemos la peticion Delete con el id del contacto
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
      console.log('Éxito', data)

      // Recargamos la pagina para que se actualice la lista de contactos
      listarContactos();
      window.location.reload();
    },
    complete: function() {
      console.log('Carga completa!');
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
  console.log('Cancelar');
});

// Funcion para cancelar y ocultar el formulario de agregar numero
let botonCancelarNumero = document.getElementById('botonCancelarNumero');
botonCancelarNumero.addEventListener('click', function() {
  $('#nuevoNumeroSection').hide();
  $('#agregarSection').show();
  console.log('Cancelar');
});

