# DynamizaTic Test

Prueba técnica para DynamizaTic.<br>

Tiempo de trabajo: 10 horas aprox.<br>
Tecnologías: React Js + PHP Laravel<br><br>

### Repositorios

<a href="https://github.com/VicenteAparicio/dynamizatic">Front</a><br>
<a href="https://github.com/VicenteAparicio/dynamizaback">Back</a><br>
<br>

### Deploy

<a href="https://dynamizatestfront.herokuapp.com/">DynamizaTic Test</a>

<br>

## Instrucciones

Acceder al deploy en heroku a través del enlace anterior. 

<img src="./src/assets/Img/img01.png">

<br><br>

Navegar a la sección de "data" en los links del Header.<br>
En esta sección encontraremos el listado de la base de datos junto con el box de los filtros.

<br>

A través de los inputs el usuario puede filtrar los datos sin necesidad que se recargue la página cada vez ya que el objeto ha sido guardado en un hook desde el cuál nos permitirá trabajar con él sin necesidad de volver a llamar al servidor.

<br>

<img src="./src/assets/Img/img02.png">

<br><br>

En el box de los filtros encontraremos el botón para abrir la función de crear un nuevo registro. <br>

Esta función nos permitirá añadir los datos y decidir si los guardamos en la base de datos o cancelamos la acción.

<br>

<img src="./src/assets/Img/img03.png">

<br>
<br>

En la lista de los elementos tenemos dos acciones, editar el elemento o borrarlo. Al pulsar en la acción de editar elemento nos aparecerá un box preparado con la información de ese elemento.

<br>

<img src="./src/assets/Img/img04.png">

<br><br>

Desde el box de edición podremos cancelar la edición o guardarla en el servidor. 

Tanto si añadimos, eliminamos o editamos un registro el servidor nos devolverá la lista actualizada.

<br>
<br>

### ¿QUÉ HA FALTADO?

<br>

Me ha faltado añadir la paginación del listado. Me he quedado sin tiempo para investigar bien cómo implementarla con el método de paginate desde el backend y he decidido que no era buena idea dejarla a medias estropeando la funcionalidad del resto del código.