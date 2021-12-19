import { renderTemplate, RenderPosition } from './render.js';
import { createUserRankTemplate } from './view/user-rank-view.js';
import { createMenuTemplate } from './view/menu-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
// import { createPopupFilmInformationTemplate } from './view/popup-film-view.js';
import { createCommensTemplate } from './view/popup-comments-view.js';
import { createQuantityMoviesTemplate } from './view/quantity-movies-view.js';
import { createShowMoreTemplate } from './view/button-show-more-view.js';
import { generateFilmCard, generateComment } from './mock/card.js';
import { getRandomIndexFromList, getRandomInteger } from './utils.js';
import { createFilterTemplate } from './mock/filter.js';
import { generateFilter } from './mock/generate-filter.js';

export const FILM_CARDS = 50;
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

const siteMainElement = document.querySelector('.main');     // main
const siteHeaderElement = document.querySelector('.header'); // header
const siteFooterElement = document.querySelector('.footer'); // footer

renderTemplate(siteHeaderElement, createUserRankTemplate(), RenderPosition.BEFOREEND); // в header отрисовываем рейтинг (user-rank)
renderTemplate(siteMainElement, createFilterTemplate(filters), RenderPosition.BEFOREEND); // в main отрисовываем меню (menu-view)
renderTemplate(siteMainElement, createMenuTemplate(), RenderPosition.BEFOREEND); // в main отрисовываем меню (menu-view)
renderTemplate(siteFooterElement, createQuantityMoviesTemplate(), RenderPosition.BEFOREEND); // в footer прописываем число количества фильмов (quantity-movies)

const filmListElement = siteMainElement.querySelector('.films-list'); // ищем <section class="films-list"></section>
const filmListContainerElement = filmListElement.querySelector('.films-list__container'); // ищем <div class="films-list__container">

// отрисовываем карточки фильма и попап после .films-list__container в (menu-view)
for (let i = 0; i < Math.min(filmCards.length, FILM_CARDS_PER_STEP); i++) {
  renderTemplate(filmListContainerElement, createFilmCardTemplate(filmCards[i]), RenderPosition.BEFOREEND);
  // renderTemplate(siteFooterElement, createPopupFilmInformationTemplate(filmCards[i]), RenderPosition.AFTEREND);
}

const filmDetailsElement = document.querySelectorAll('.film-details__comments-list');

filmDetailsElement.forEach((element) => renderTemplate(element, createCommensTemplate(), RenderPosition.BEFOREEND));

// Кнопка showMore
if (filmCards.length > FILM_CARDS_PER_STEP) {
  let renderedCardCount = FILM_CARDS_PER_STEP;

  renderTemplate(filmListElement, createShowMoreTemplate(), RenderPosition.BEFOREEND);

  const showMoreButton = filmListElement.querySelector('.films-list__show-more'); // ищем в <section class="films-list"></section>

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedCardCount, renderedCardCount + FILM_CARDS_PER_STEP)
      .forEach((card) => renderTemplate(filmListContainerElement, createFilmCardTemplate(card), RenderPosition.BEFOREEND));

    renderedCardCount += FILM_CARDS_PER_STEP;

    if (renderedCardCount >= filmCards.length) {
      showMoreButton.remove();
    }
  });
}
