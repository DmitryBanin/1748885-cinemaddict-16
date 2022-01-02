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
export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};
