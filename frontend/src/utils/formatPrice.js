export const formatPrice = (amount) => {
  const convertToDecimal = (amount) => {
    return Math.floor(amount) / 100;
  };

  return Intl.NumberFormat("en-US", {
    currency: JSON.parse(localStorage.getItem("region")).currency_code,
    style: "currency",
  }).format(convertToDecimal(amount));
};
