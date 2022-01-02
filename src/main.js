import { renderElement, renderTemplate, RenderPosition } from './render.js';
import { generateFilmCard, generateComment } from './mock/card.js';
import { getRandomIndexFromList, getRandomInteger } from './utils.js';
import { generateFilter } from './mock/generate-filter.js';
import SortView from './view/sort-view.js';
import UserRankView from './view/user-rank-view.js';
import FilmsView from './view/films-view.js';
import FilmsListView from './view/films-list-view.js';
import FilmsListContainerView from './view/films-list-container-view.js';
import FilterView from './view/filter-view.js';
import MoviesInsideView from './view/movies-inside-view.js';
import FilmCardView from './view/film-card-view.js';
import ButtonShowMoreView from './view/button-show-more-view.js';
// import PopupFilmView from './view/popup-film-view.js';

export const FILM_CARDS = 30;
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

filmCards.map(generetCommentsCard); // массив карточек фильмов
const filters = generateFilter(filmCards);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const filmsComponent = new FilmsView();
const filterComponent = new FilterView(filters);
const filmsListComponent = new FilmsListView();
const filmsListContainerComponent = new FilmsListContainerView();

renderElement(siteHeaderElement, new UserRankView().element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, filterComponent.element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, filmsComponent.element, RenderPosition.BEFOREEND);
renderElement(filmsComponent.element, filmsListComponent.element, RenderPosition.BEFOREEND);
renderElement(filmsListComponent.element, filmsListContainerComponent.element, RenderPosition.BEFOREEND);
renderElement(siteFooterElement, new MoviesInsideView(filmCards.length).element, RenderPosition.BEFOREEND);
renderElement(filterComponent.element, new SortView().element, RenderPosition.AFTEREND);

for (let i = 0; i < Math.min(filmCards.length, FILM_CARDS_PER_STEP); i++) {
  renderElement(filmsListContainerComponent.element, new FilmCardView(filmCards[i]).element, RenderPosition.BEFOREEND);
  // renderElement(siteFooterElement, new PopupFilmView(filmCards[i]).element, RenderPosition.AFTEREND);
}

// Кнопка showMore
if (filmCards.length > FILM_CARDS_PER_STEP) {
  let renderedCardCount = FILM_CARDS_PER_STEP;

  const buttonShowMoreComponent = new ButtonShowMoreView();
  renderElement(filmsListContainerComponent.element, buttonShowMoreComponent.element, RenderPosition.AFTEREND);

  buttonShowMoreComponent.element.addEventListener('click', (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedCardCount, renderedCardCount + FILM_CARDS_PER_STEP)
      .forEach((card) => renderElement(filmsListContainerComponent.element, new FilmCardView(card).element, RenderPosition.BEFOREEND));

    renderedCardCount += FILM_CARDS_PER_STEP;

    if (renderedCardCount >= filmCards.length) {
      buttonShowMoreComponent.element.remove();
      buttonShowMoreComponent.element.removeElement();
    }
  });
}
