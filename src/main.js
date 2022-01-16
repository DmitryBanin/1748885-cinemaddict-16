import { render, RenderPosition} from './render.js';
import { generateFilmCard, generateComment } from './mock/card.js';
import { getRandomIndexFromList, getRandomInteger, generetIdIndex,  } from './utils.js';
import { generateFilter } from './mock/generate-filter.js';
import SortView from './view/sort-view.js';
import UserRankView from './view/user-rank-view.js';
// import FilmsView from './view/films-view.js';
// import FilmsListView from './view/films-list-view.js';
// import FilmsListContainerView from './view/films-list-container-view.js';
import FilterView from './view/filter-view.js';
// import ListEmptyView from './view/list-empty-view.js';
import MoviesInsideView from './view/movies-inside-view.js';
// import FilmCardView from './view/film-card-view.js';
// import ButtonShowMoreView from './view/button-show-more-view.js';
// import PopupFilmView from './view/popup-film-view.js';
import MoviePresenter from './presenter/movie-presenter.js';

const FILM_CARDS = 30;
const COMMENTS = 100;
// const FILM_CARDS_PER_STEP = 5;
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

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

// все ниже - удалить

const filters = generateFilter(filmCards);

// const renderFilmCard = (filmCardElement, filmCard) => {
//   const filmCardComponent = new FilmCardView(filmCard);
//   const popupFilmCardComponent = new PopupFilmView(filmCard);

//   const replaceFilmCardToForm = () => {
//     filmCardElement.appendChild(popupFilmCardComponent.element);
//   };

//   const replaceFormTofilmCard = () => {
//     filmCardElement.removeChild(popupFilmCardComponent.element);
//   };

//   const onEscKeyDown = (evt) => {
//     if (evt.key === 'Escape' || evt.key === 'Esc') {
//       evt.preventDefault();
//       replaceFormTofilmCard();
//       document.body.classList.remove('hide-overflow');
//       document.removeEventListener('keydown', onEscKeyDown);
//     }
//   };

//   filmCardComponent.setFormFilmCardHandler(() => {
//     replaceFilmCardToForm();
//     document.body.classList.add('hide-overflow');
//     document.addEventListener('keydown', onEscKeyDown);
//   });

//   popupFilmCardComponent.setFormPopupHandler(() => {
//     replaceFormTofilmCard();
//     document.body.classList.remove('hide-overflow');
//     document.removeEventListener('keydown', onEscKeyDown);
//   });

//   render(filmCardElement, filmCardComponent, RenderPosition.BEFOREEND);
// };

// const renderButtonShowMore = (filmsListContainer, cardList) => {

//   const filmsComponent = new FilmsView();
//   const filmsListComponent = new FilmsListView();
//   const filmsListContainerComponent = new FilmsListContainerView();

//   render(filmsListContainer, new FilterView(filters), RenderPosition.BEFOREEND);
//   render(filmsListContainer, new SortView(), RenderPosition.BEFOREEND);
//   render(filmsListContainer, filmsComponent, RenderPosition.BEFOREEND);
//   render(filmsComponent, filmsListComponent, RenderPosition.BEFOREEND);
//   render(filmsListComponent, filmsListContainerComponent, RenderPosition.BEFOREEND);

//   if (!cardList.length) {
//     render(filmsListContainerComponent, new ListEmptyView(), RenderPosition.BEFOREEND);
//     return;
//   }

//   if (cardList.length > FILM_CARDS_PER_STEP) {
//     let renderedCardCount = FILM_CARDS_PER_STEP;

//     const buttonShowMoreComponent = new ButtonShowMoreView();
//     render(filmsListContainerComponent, buttonShowMoreComponent, RenderPosition.AFTEREND);

//     cardList
//       .slice(0, Math.min(filmCards.length, FILM_CARDS_PER_STEP))
//       .forEach((filmCard) => renderFilmCard(filmsListContainerComponent.element, filmCard));

//     buttonShowMoreComponent.setClickHandler(() => {
//       cardList
//         .slice(renderedCardCount, renderedCardCount + FILM_CARDS_PER_STEP)
//         .forEach((filmCard) => renderFilmCard(filmsListContainerComponent.element, filmCard));

//       renderedCardCount += FILM_CARDS_PER_STEP;

//       if (renderedCardCount >= cardList.length) {
//         remove(buttonShowMoreComponent);
//       }
//     });
//   }
// };

const filmCardPresenter = new MoviePresenter(siteMainElement);

render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new UserRankView(), RenderPosition.BEFOREEND);
render(siteFooterElement, new MoviesInsideView(filmCards.length), RenderPosition.BEFOREEND);

filmCardPresenter.init(filmCards);
// renderButtonShowMore(siteMainElement, filmCards);
