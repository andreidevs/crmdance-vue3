export const getPagination = (page, size) => {
  const limit = +size || 10;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};

export const arrayRandElement = (arr) => {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};
