import { render, RenderPosition } from './render.js';
import { generateFilmCard, generateComment } from './mock/card.js';
import { getRandomIndexFromList, getRandomInteger } from './utils.js';
import { generateFilter } from './mock/generate-filter.js';
import SortView from './view/sort-view.js';
import UserRankView from './view/user-rank-view.js';
import FilmsView from './view/films-view.js';
import FilmsListView from './view/films-list-view.js';
import FilmsListContainerView from './view/films-list-container-view.js';
import FilterView from './view/filter-view.js';
import ListEmptyView from './view/list-empty-view.js';
import MoviesInsideView from './view/movies-inside-view.js';
import FilmCardView from './view/film-card-view.js';
import ButtonShowMoreView from './view/button-show-more-view.js';
import PopupFilmView from './view/popup-film-view.js';

export const FILM_CARDS = 0;
const COMMENTS = 100;
const FILM_CARDS_PER_STEP = 5;
const FILM_COMMENTS = 20;

const generetIdIndex = (element, index) => {
  element.id = index;
  return element;
};

const filmCards = Array.from({ length: FILM_CARDS }, generateFilmCard);
filmCards.map(generetIdIndex);

const comments = Array.from({ length: COMMENTS }, generateComment);
comments.map(generetIdIndex);

const generetCommentsCard = (element) => {
  element.comments = getRandomIndexFromList(comments, getRandomInteger(FILM_COMMENTS));
  return element;
};

filmCards.map(generetCommentsCard);
const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsComponent = new FilmsView();
const filterComponent = new FilterView(filters);
const filmsListComponent = new FilmsListView();
const filmsListContainerComponent = new FilmsListContainerView();

render(siteHeaderElement, new UserRankView().element, RenderPosition.BEFOREEND);
render(siteMainElement, filterComponent.element, RenderPosition.BEFOREEND);
render(siteMainElement, filmsComponent.element, RenderPosition.BEFOREEND);
render(filmsComponent.element, filmsListComponent.element, RenderPosition.BEFOREEND);
render(filmsListComponent.element, filmsListContainerComponent.element, RenderPosition.BEFOREEND);
render(siteFooterElement, new MoviesInsideView(filmCards.length).element, RenderPosition.BEFOREEND);

const renderFilmCard = (filmCardElement, filmCard) => {
  const filmCardComponent = new FilmCardView(filmCard);
  const popupfilmCardComponent = new PopupFilmView(filmCard);

  const replacefilmCardToForm = () => {
    filmCardElement.appendChild(popupfilmCardComponent.element);
  };

  const replaceFormTofilmCard = () => {
    filmCardElement.removeChild(popupfilmCardComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormTofilmCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
    replacefilmCardToForm();
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  });

  popupfilmCardComponent.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceFormTofilmCard();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(filmCardElement, filmCardComponent.element, RenderPosition.BEFOREEND);
};

console.log(filterComponent.element.querySelectorAll('.main-navigation__item'));


if (!filmCards.length) {
  render(filmsListContainerComponent.element, new ListEmptyView().element, RenderPosition.BEFOREEND);
} else {
  render(filterComponent.element, new SortView().element, RenderPosition.AFTEREND);

  if (filmCards.length > FILM_CARDS_PER_STEP) {
    let renderedCardCount = FILM_CARDS_PER_STEP;

    const buttonShowMoreComponent = new ButtonShowMoreView();
    render(filmsListContainerComponent.element, buttonShowMoreComponent.element, RenderPosition.AFTEREND);

    for (let i = 0; i < Math.min(filmCards.length, FILM_CARDS_PER_STEP); i++) {
      renderFilmCard(filmsListContainerComponent.element, filmCards[i]);
    }

    buttonShowMoreComponent.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      filmCards
        .slice(renderedCardCount, renderedCardCount + FILM_CARDS_PER_STEP)
        .forEach((filmCard) => renderFilmCard(filmsListContainerComponent.element, filmCard));

      renderedCardCount += FILM_CARDS_PER_STEP;

      if (renderedCardCount >= filmCards.length) {
        buttonShowMoreComponent.element.remove();
        buttonShowMoreComponent.element.removeElement();
      }
    });
  }
}
