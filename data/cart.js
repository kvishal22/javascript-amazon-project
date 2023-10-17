export let cart =[{
  productId:'58b4fc92-e98c-42aa-8c55-b6b79996769a',
  quantity:1
},{
  productId:'3ebe75dc-64d2-4137-8860-1f5a963e534b',
  quantity:3
}
  ];

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

export function removeCartItem(productId){
  const newCart = [];

  cart.forEach((cartItem)=>{
    if(productId != cartItem.productId){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
}