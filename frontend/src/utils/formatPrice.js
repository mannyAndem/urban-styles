const convertToDecimal = (amount) => {
  return Math.floor(amount) / 100;
};

export const formatPrice = (amount) => {
  return Intl.NumberFormat("en-US", {
    currency: JSON.parse(localStorage.getItem("region")).currency_code,
    style: "currency",
  }).format(convertToDecimal(amount));
};
