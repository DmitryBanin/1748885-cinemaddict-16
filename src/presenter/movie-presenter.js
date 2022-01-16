import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';

import ListEmptyView from '../view/list-empty-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import PopupFilmView from '../view/popup-film-view.js';
import { render, RenderPosition, remove } from '../render.js';


const FILM_CARDS_PER_STEP = 5;

export default class MoviePresenter {
  #filmContainer = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #listEmptyComponent = new ListEmptyView();
  #sortComponent = new SortView();

  #filmCards = []; // приходят моки

  constructor(filmContainer) {
    this.#filmContainer = filmContainer;
  }

  init = (filmCards) => {
    this.#filmCards = [...filmCards];
    render(this.#filmContainer, this.#filmsComponent, RenderPosition.BEFOREEND);
    render(this.#filmsComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);
    render(this.#filmsListComponent, this.#filmsListContainerComponent, RenderPosition.BEFOREEND);
    this.#renderFilmList();
  }

  #renderfilmCard = (filmCard) => {
    const filmCardComponent = new FilmCardView(filmCard);
    const popupFilmCardComponent = new PopupFilmView(filmCard);

    const replaceFilmCardToForm = () => {
      this.#filmContainer.appendChild(popupFilmCardComponent.element);
    };

    const replaceFormTofilmCard = () => {
      this.#filmContainer.removeChild(popupFilmCardComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormTofilmCard();
        document.body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmCardComponent.setFormFilmCardHandler(() => {
      replaceFilmCardToForm();
      document.body.classList.add('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
    });

    popupFilmCardComponent.setFormPopupHandler(() => {
      replaceFormTofilmCard();
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#filmContainer, filmCardComponent, RenderPosition.BEFOREEND);
  }

  #renderCards = (from, to) => {
    this.#filmCards
      .slice(from, to)
      .forEach((filmCard) => this.#renderfilmCard(filmCard));
  }

  #renderListEmpty = () => {
    render(this.#filmsListContainerComponent, this.#listEmptyComponent, RenderPosition.BEFOREEND);
  }

  #renderButtonShowMore = () => {
    let renderedCardCount = FILM_CARDS_PER_STEP;

    const buttonShowMoreComponent = new ButtonShowMoreView();
    render(this.#filmsListContainerComponent, buttonShowMoreComponent, RenderPosition.AFTEREND);

    buttonShowMoreComponent.setClickHandler(() => {
      this.#filmCards
        .slice(renderedCardCount, renderedCardCount + FILM_CARDS_PER_STEP)
        .forEach((filmCard) => this.#renderfilmCard(filmCard));

      renderedCardCount += FILM_CARDS_PER_STEP;

      if (renderedCardCount >= this.#filmCards.length) {
        remove(buttonShowMoreComponent);
      }
    });
  }

  #renderCardList = () => {
    this.#renderCards(0, Math.min(this.#filmCards.length, FILM_CARDS_PER_STEP));
    if (this.#filmCards.length > FILM_CARDS_PER_STEP) {
      this.#renderButtonShowMore();
    }
  }

  #renderFilmList = () => {
    if (!this.#filmCards.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderCardList();
  }
}
