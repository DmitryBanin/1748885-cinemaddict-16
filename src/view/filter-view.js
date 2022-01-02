import {createElement} from '../render.js';

const createFilterItemTemplate = (filter, isChecked) => {
  const { name, count } = filter;

  const getName = (names) => {
    switch (names) {
      case 'all':
        return 'All movies';
      case 'watchlist':
        return 'Watchlist';
      case 'history':
        return 'History';
      case 'favorites':
        return 'Favorites';
    }
  };

  return (
    `
      <a href="#${name}" class="main-navigation__item
      ${isChecked ? 'main-navigation__item--active' : ''}">${getName(name)}${name === 'all' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>
    `
  );
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">

    ${filterItemsTemplate}

    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class FilterView {
  #element = null;
  #filters = null;

  constructor(filters) {
    this.#filters = filters;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  removeElement() {
    this.#element = null;
  }
}
