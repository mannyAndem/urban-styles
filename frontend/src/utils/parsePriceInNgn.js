export const parsePriceInNgn = (variant) => {
  const price = variant.prices.find((price) => price.currency_code === "ngn");

  return `N${(price.amount / 100).toLocaleString()}`;
};
