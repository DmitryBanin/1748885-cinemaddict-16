import dayjs from 'dayjs';

const createCommentTemplate = (items) => {
  const { author, comment, date, emotion } = items;
  const commentDay = dayjs(date).format('DD MMMM YYYY');
  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDay}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );
};

export const createPopupCommentsTemplate = (filmComments) => {
  const commentsItems = filmComments
    .map((filter) => createCommentTemplate(filter))
    .join('');
  return `<ul class="film-details__comments-list">

  ${commentsItems}

</ul>`;
};


