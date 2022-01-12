import { render, RenderPosition, remove } from './render.js';
import { generateFilmCard, generateComment } from './mock/card.js';
import { getRandomIndexFromList, getRandomInteger, generetIdIndex,  } from './utils.js';
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

const FILM_CARDS = 30;
const COMMENTS = 100;
const FILM_CARDS_PER_STEP = 5;
const FILM_COMMENTS = 20;

const comments = Array.from({ length: COMMENTS }, generateComment);
const filmCards = Array.from({ length: FILM_CARDS }, generateFilmCard);

const generetCommentsCard = (element) => {
  element.comments = getRandomIndexFromList(comments, getRandomInteger(FILM_COMMENTS));
  return element;
};

filmCards.map(generetIdIndex);
filmCards.map(generetCommentsCard);
comments.map(generetIdIndex);

const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsComponent = new FilmsView();
const filterComponent = new FilterView(filters);
const filmsListComponent = new FilmsListView();
const filmsListContainerComponent = new FilmsListContainerView();

const renderFilmCard = (filmCardElement, filmCard) => {
  const filmCardComponent = new FilmCardView(filmCard);
  const popupfilmCardComponent = new PopupFilmView(filmCard);

  const replaceFilmCardToForm = () => {
    filmCardElement.appendChild(popupfilmCardComponent.element);
  };

  const replaceFormTofilmCard = () => {
    filmCardElement.removeChild(popupfilmCardComponent.element);
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

  popupfilmCardComponent.setFormPopupHandler(() => {
    replaceFormTofilmCard();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(filmCardElement, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderShowMoreCards = (cardContainer) => {
  if (!cardContainer.length) {
    render(filmsListContainerComponent, new ListEmptyView(), RenderPosition.BEFOREEND);
  } else {
    render(filterComponent, new SortView(), RenderPosition.AFTEREND);

    if (cardContainer.length > FILM_CARDS_PER_STEP) {
      let renderedCardCount = FILM_CARDS_PER_STEP;

      const buttonShowMoreComponent = new ButtonShowMoreView();
      render(filmsListContainerComponent, buttonShowMoreComponent, RenderPosition.AFTEREND);

      for (let i = 0; i < Math.min(cardContainer.length, FILM_CARDS_PER_STEP); i++) {
        renderFilmCard(filmsListContainerComponent.element, cardContainer[i]);
      }

      buttonShowMoreComponent.setClickHandler(() => {
        cardContainer
          .slice(renderedCardCount, renderedCardCount + FILM_CARDS_PER_STEP)
          .forEach((filmCard) => renderFilmCard(filmsListContainerComponent.element, filmCard));

        renderedCardCount += FILM_CARDS_PER_STEP;

        if (renderedCardCount >= cardContainer.length) {
          remove(buttonShowMoreComponent);
        }
      });
    }
  }
};

render(siteMainElement, filterComponent, RenderPosition.BEFOREEND);
render(siteHeaderElement, new UserRankView(), RenderPosition.BEFOREEND);
render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);
render(filmsComponent, filmsListComponent, RenderPosition.BEFOREEND);
render(filmsListComponent, filmsListContainerComponent, RenderPosition.BEFOREEND);
render(siteFooterElement, new MoviesInsideView(filmCards.length), RenderPosition.BEFOREEND);

renderShowMoreCards(filmCards);
