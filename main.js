import debounce from 'just-debounce-it'
import viewGrid from './movies/views/grid-movies.html?raw'
import '@picocss/pico'
import './style.css'
import { BASE_URL, APIKEY } from './constants'
import { showError } from './movies/views/show-error'
import { fetchMovies } from './helpers/async-await-movies'
import { renderMovies } from './movies/views/render-movies'



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






  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const { busca } = form // busca --> HTMLInputElement
    const url = `${BASE_URL}/?i=tt3896198&apikey=${APIKEY}&s=${busca.value.trim()}`
    try {
      form.querySelector('button').setAttribute('aria-busy', true)
      renderMovies(await fetchMovies(url))
    } catch (error) {
      showError(error)
    } finally {
      form.querySelector('button').removeAttribute('aria-busy')
    }
  })

  const miFuncion = debounce(
    async (e) => {
      const url = `${BASE_URL}/?i=tt3896198&apikey=${APIKEY}&s=${e.target.value.trim()}`
      renderMovies(await fetchMovies(url))
    },
    300
  )

  form.addEventListener('input', miFuncion)


}


const app = document.querySelector('#app')
moviesapp(app) 