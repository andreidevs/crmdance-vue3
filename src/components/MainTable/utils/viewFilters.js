export const getViewFromFilter = (view, item) => {
  const F = item.filterView;
  if (F) {
    if (F === "price_kz") {
      return `${view.toLocaleString()} ₸`;
    }
    return view;
  } else return view;
};
