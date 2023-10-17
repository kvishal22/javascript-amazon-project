// deliveryOptions.js
document.addEventListener("DOMContentLoaded", function () {
  const deliveryOptions = document.querySelectorAll(".delivery-option");
  const deliveryOptionInputs = document.querySelectorAll(".delivery-option-input");
  const deliveryOptionDates = document.querySelectorAll(".delivery-option-date");
  const deliveryOptionPrices = document.querySelectorAll(".delivery-option-price");

  const today = new Date();
  const twoDaysFromNow = new Date(today);
  twoDaysFromNow.setDate(today.getDate() + 2);
  const oneDayFromNow = new Date(today);
  oneDayFromNow.setDate(today.getDate() + 1);

  deliveryOptionDates[0].textContent = formatDate(twoDaysFromNow);
  deliveryOptionPrices[0].textContent = "FREE Shipping";

  deliveryOptionDates[1].textContent = formatDate(oneDayFromNow);
  deliveryOptionPrices[1].textContent = "$9.99 - Shipping";

  deliveryOptionDates[2].textContent = formatDate(today);
  deliveryOptionPrices[2].textContent = "$4.99 - Shipping";

  deliveryOptionInputs.forEach((input, index) => {
    input.addEventListener("change", () => {
      const selectedOption = deliveryOptions[index];
    });
  });

  function formatDate(date) {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
});
