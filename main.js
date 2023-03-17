import { getMovies } from './helpers/get-movies'
import viewGrid from './movies/views/grid-movies.html?raw'
import '@picocss/pico'
import './style.css'
import movies from './movies/mocks/movies-for-titles.json'
import { BASE_URL, APIKEY } from './constants'


function moviesapp(rootElement) {
  if (!rootElement)
    throw new Error('No se encontró el elemento raíz de la aplicación')

  rootElement.innerHTML = `
  <div class="container">
  <h1>Mis peliculas</h1>
  ${viewGrid}
  </div>
  `


  const form = rootElement.querySelector('#my-form')
  if (!form) throw new Error('No existe el botón de id search')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const search = e.target.busca.value.trim()
    const url = `${BASE_URL}/?i=tt3896198&apikey=${APIKEY}&s=${search}`
    console.log(url)

    fetch(url)
      .then((respuesta) => {
        return respuesta.json()
      })
      .then((movies) => {
        getMovies(movies)
      })




  })
}




const app = document.querySelector('#app')
moviesapp(app)