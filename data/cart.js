export const cart =[];

export function addToCart(productId){

  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const dropDown = document.querySelector(`.js-drop-down-${productId}`);

  const quantity = Number(dropDown.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }
}