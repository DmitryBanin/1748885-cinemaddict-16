const cardToFilterMap = {
  all: (cards) => cards.filter((card) => card.id).length,
  watchlist: (cards) => cards.filter((card) => {
    const { userDetails } = card;
    const { watchlist } = userDetails;
    return watchlist;}).length,
  history: (cards) => cards.filter((card) => {
    const { userDetails } = card;
    const { watched } = userDetails;
    return watched;}).length,
  favorites: (cards) => cards.filter((card) => {
    const { userDetails } = card;
    const { favorite } = userDetails;
    return favorite;}).length,
};

export const generateFilter = (cards) => Object.entries(cardToFilterMap).map(
  ([filterName, countCards]) => ({
    name: filterName,
    count: countCards(cards),
  }),
);
