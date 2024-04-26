export const calculateDiscountedPrice = (price, discount) => {
  const discountAmount = (price * discount) / 100;
  const discountedPrice = price - discountAmount;
  return discountedPrice;
};

export const isNewProduct = (date) => {
  const currentDate = new Date();
  const dateAdded = new Date(date);
  const differenceInMilliseconds = currentDate - dateAdded;
  const halfYearInMilliseconds = 6 * 30 * 24 * 60 * 60 * 1000;
  return differenceInMilliseconds <= halfYearInMilliseconds;
};
