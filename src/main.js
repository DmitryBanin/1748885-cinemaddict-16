import {renderTemplate, RenderPosition} from './render.js';
import { createUserRankTemplate } from './view/user-rank-view.js';
import { createMenuTemplate } from './view/menu-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createPopupFilmInformationTemplate } from './view/popup-film-information-view.js';
import { createQuantityMoviesTemplate } from './view/quantity-movies-view.js';
import { createSwowMoreButtonTemplate } from './view/button-show-more-view.js';

const FILM_CARDS = 5;

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

renderTemplate(siteHeaderElement, createUserRankTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createPopupFilmInformationTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterElement, createQuantityMoviesTemplate(), RenderPosition.BEFOREEND);

const FilmListElement = siteMainElement.querySelector('.films-list');
const FilmListCintainerElement = FilmListElement.querySelector('.films-list__container');

for (let i = 0; i < FILM_CARDS; i++) {
  renderTemplate(FilmListCintainerElement, createFilmCardTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(FilmListElement, createSwowMoreButtonTemplate(), RenderPosition.BEFOREEND);
