import AbstractView from './abstract-view.js';
import { buttonIndex } from './filter-view.js';

const createListEmptyTemplate = () => {
  const createTitleListTemplate = (answer) => {
    switch (answer) {
      case 0:
        return 'There are no movies in our database';
      case 1:
        return 'There are no movies to watch now';
      case 2:
        return 'There are no watched movies now';
      case 3:
        return 'There are no favorite movies now';
    }
  };
  return `<section class="films-list">
  <h2 class="films-list__title">${createTitleListTemplate(buttonIndex)}</h2>

  <!--
    Значение отображаемого текста зависит от выбранного фильтра:
      * All movies – 'There are no movies in our database'
      * Watchlist — 'There are no movies to watch now';
      * History — 'There are no watched movies now';
      * Favorites — 'There are no favorite movies now'.
  -->

  </section>`;
};

export default class ListEmptyView extends AbstractView {
  get template() {
    return createListEmptyTemplate();
  }
}
