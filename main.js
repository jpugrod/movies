import '@picocss/pico'
import './style.css'

import error from './mocks/movies-error.json'
import movies from './mocks/movies-for-titles.json'


function cargarPeliculas (resultado){
if (resultado.Response === 'True') {
console.log('ok')
}else {
  console.log('No encontradas')
}
}




document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Mis peliculas</h1>
    <div class="listado"></div>
  </div>
`

cargarPeliculas(movies)