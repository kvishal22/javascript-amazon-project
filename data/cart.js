export let cart = JSON.parse(localStorage.getItem('cart'));

    if(!cart){
      cart = [{
        productId:'58b4fc92-e98c-42aa-8c55-b6b79996769a',
        quantity:1,
        deliveryOptionId: '1'
      },{
        productId:'3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity:2,
        deliveryOptionId: '2'
      }
        ];
    }

export function saveStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
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
      productId: productId,
      quantity: 1,
      deliveryOptionId: '2'
    });
  }
    saveStorage();
}

export function removeCartItem(productId){
  const newCart = [];

  cart.forEach((cartItem)=>{
    if(productId != cartItem.productId){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
  saveStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}	

export function updateQuantity(productId,newQuantity){
        let matchingItem;
        cart.forEach((cartItem)=>{
          
            if(productId==cartItem.productId){
                matchingItem = cartItem;
            }
        });
        matchingItem.quantity=newQuantity;
        saveStorage();

}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveStorage();
}