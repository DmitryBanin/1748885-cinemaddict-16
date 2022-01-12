import AbstractView from './abstract-view.js';

const createMoviesInsideTemplate = (count) => (
  `<section class="footer__statistics">
<p>${count} movies inside</p>
</section>`
);
export default class MoviesInsideView extends AbstractView {
  #movies = null;

  constructor(movies) {
    super();
    this.#movies = movies;
  }

  get template() {
    return createMoviesInsideTemplate(this.#movies);
  }
}
