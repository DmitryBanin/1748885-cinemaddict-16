import { createElement } from '../render.js';

const createMoviesInsideTemplate = (cards) => (
  `<section class="footer__statistics">
<p>${cards} movies inside</p>
</section>`
);

export default class MoviesInsideView {
  #element = null;
  #moviesInside = null;

  constructor(moviesInside) {
    this.#moviesInside = moviesInside;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMoviesInsideTemplate(this.#moviesInside);
  }

  removeElement() {
    this.#element = null;
  }
}
