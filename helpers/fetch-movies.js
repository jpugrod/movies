import {getMovies } from '../movies/views/render-movies'
import {showError} from '../movies/views/show-error'


export function fetchMovies(url, btn){
  fetch(url)
  .then((respuesta) => {
    btn.setAttribute('aria-busy', true)
    return respuesta.json()
  })
  .then((movies) => {
    renderMovies(movies)
    btn.removeAttribute('aria-busy')
  })
  // Sólo para los errores
  .catch((error) => {
    showError(error)
    btn.removeAttribute('aria-busy')
  
  })
}

