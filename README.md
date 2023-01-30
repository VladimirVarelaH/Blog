# Blog con React.js, MongoDB y Flask

En este proyecto se busca desarrollar un blog tipo como práctica del stack mencionado en el título.
Se ha implementado un ruteo (`ReactRouter`) y control de estados globales (`Redux`) para el front, además de un simple sistema de autenticación con un componente que funge como middleware, redirigiendo al login si el usuario no se encuentra autenticado.

Además, para agilizar el desarrollo, se integró Bootstrap para los estilos de las distintas pantallas, complemetando con algunas clases propias.

El control de sesiones se plantea con JWT y el cifrado con bcrypt en Flask. Además se buscará implementar el logeo con Google (OAuth) y los anuncios de la misma plataforma, a modo de estudio. 
