export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin', // перед elem
  AFTERBEGIN: 'afterbegin', // внутрь elem, в самое начало
  BEFOREEND: 'beforeend', // внутрь elem, в конец
  AFTEREND: 'afterend', // после elem
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


// container - куда мы вставляем компонент
// template - разметка которую вставляем
// place - в какое место относительно тега
