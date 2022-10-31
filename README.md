<p align='right'>
  <img src='https://img.shields.io/badge/Versión-1.0.0-blue?style=flat-square' />
  <img src='https://img.shields.io/badge/Estatus-Terminado-green?style=flat-square' />
</p>

<h1> Agenda Telefonica Front-End </h1>
<p> Web desarrollada con HTML, JS y Bootstrap consumiendo una Api con Symfony para una Agenda Telefónica. </p>
<br>

<h2> Agenda Telefonica Back-End </h2>
<p> Para que el proyecto funcione tienes que tener la parte del Back-End funcionando en el servidor: </p>
<a href="https://github.com/UriLP/agenda_telefonica_backend" target="_blank" >Agenda Telefonica Back-End</a>
<br><br>
<p> Ahí puedes encontrar más instrucciones para iniciar el servidor y la base de datos. </p>
<br>

<h2> Instalación </h2>
<p> Despues de clonar el repositorio localmente asegurate de haber instalado los paquetes de node con el comando: </p>

```bash
npm install
```
<br>

<h2> Abrir en el Navegador </h2>
<p> Puedes usar la extensión de Visual Studio "Live Server" para ver la página en tu navegador. </p>

<h3> Home </h3>
<p> Una vez ya tengas funcionando el servidor del Back-End y Front-End podrás ver la página principal al igual que en la siguiente imagen: </p>
<br>
<p>
  <img src="https://user-images.githubusercontent.com/98054611/198862750-a5e0622b-3393-47bb-8041-2c17c4742b49.jpeg" width="1000" alt="Listar Contactos" />
</p>
<p> 
  Si no te aparecen contactos en la tabla no te asustes! Es por que aun no tienes registros en la Base de Datos asi que puedes empezar registrando uno en el          formulario :) 
</p>

<h3> Detalles </h3>
<p> Una vez ya tengas algunos Contactos registrados ya puedes verlos en la tabla y si quieres ver más información del contacto puedes dar click en el botón de "Ver Más" respectivamente y verás un modal como el siguiente: </p>
<p>
  <img src="https://user-images.githubusercontent.com/98054611/198909734-da3b0fab-af89-4b6a-86fc-ec4510192c2a.jpeg" width="500" alt="Detalles Contactos" />
</p>

<h3> Agregar Nuevos Números </h3>
<p> Todos los Contactos registrados pueden tener hasta 3 números de teléfono extras, para registrar uno nuevo puedes dar click en el botón "Nuevo Número" y el formulario del principio cambiara a tener solo un campo para ingresar el nuevo número de teléfono:  </p>
<p>
  <img src="https://user-images.githubusercontent.com/98054611/198910184-b43be3b8-6471-4d43-880d-9dea31ce1735.jpeg" width="1000" alt="Agregar Numero" />
</p>
<p> Una vez agregado el nuevo número de teléfono se actualizara la página y ya podrás verlo en los detalles del Contacto. </p>

<h3> Editar Contactos </h3>
<p> Para poder editar los datos de algún Contacto puedes dar click en el botón de "Editar" en el modal y de nuevo, el formulario del principio cambiara y se llenara con los datos del Contacto a editar: </p>
<p>
  <img src="https://user-images.githubusercontent.com/98054611/198910610-d35b6803-12ff-4353-add7-b6a8cc146883.jpeg" width="1000" alt="Editar Contactos" />
</p>
<p> Después de haber realizado tus cambios da click en el botón de "Editar" del formulario y se actualizara la página para guardar los nuevos datos, si das click en el botón de "Cancelar" se limpiaran los campos y el formulario cambiara al del principio de "Agregar Contactos". </p>

<h3> Eliminar Contactos </h3>
<p> También puedes eliminar Contactos dando click en el botón de "Eliminar" en el modal y no volveras a ver ese Contacto ni su información asi que ten cuidado :) </p>

<br>

<h2> Conclusión </h2>
<p> Resumiendo un poco, en la página puedes Registrar, Listar, Editar y Borrar Contactos mediante el uso de una Api desarrollada con PHP, cada registro será guardado, modificado o eliminado en una Base de Datos con MySQL y podrás ver los cambios en tiempo real.
  <li> Para el Listado de Contactos se usó "DataTable" que facilita la representación de datos en una tabla. </li>
  <li> El CSS de la página fue hecho con Bootstrap en la versión 5.2. </li>
  <li> El funcionamiento es gracias a JavaScript donde se usó la libreria de "jQuery" y el consumo de la Api fue con "Ajax". </li>
</p>

<br>

<p> Si encuentras algún bug hazmelo saber para darle solución lo más pronto posible o si tienes alguna duda con respecto al proyecto no dudes en contactarme! :) </p>

<br>

Programado con ❤️ por [UriLP](https://github.com/UriLP)

