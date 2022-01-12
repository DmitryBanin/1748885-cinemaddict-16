import dayjs from 'dayjs';
import { getTimeFromMins } from '../utils.js';
import AbstractView from './abstract-view.js';

const createFilmCardTemplate = (card) => {
  const { filmInfo, userDetails, comments } = card;
  const { release, title, poster, totalRating, genre, description, runTime } = filmInfo;
  const { date } = release;
  const durationFormat = getTimeFromMins(runTime);
  const yearFormat = dayjs(date).format('YYYY');
  const { watchlist, watched, favorite } = userDetails;
  const watchlistSelect = watchlist ? ' ' : 'film-card__controls-item--active';
  const watchedSelect = watched ? ' ' : 'film-card__controls-item--active';
  const favoriteSelect = favorite ? ' ' : 'film-card__controls-item--active';
  const commentsSelect = comments.length;
  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${yearFormat}</span>
      <span class="film-card__duration">${durationFormat}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <span class="film-card__comments">${commentsSelect} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistSelect}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedSelect}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteSelect}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCardView extends AbstractView {
  #filmCard = null;

  constructor(filmCard) {
    super();
    this.#filmCard = filmCard;
  }

  get template() {
    return createFilmCardTemplate(this.#filmCard);
  }

  setFormFilmCardHandler = (callback) => {
    this._callback.formClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#formFilmCardHandler);
  }

  #formFilmCardHandler = () => {
    this._callback.formClick();
  }
}
