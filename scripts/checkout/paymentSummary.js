import { cart } from "../../data/cart.js";
import { getProducts } from "../../data/products.js";

export function renderPayment(){

  let productPriceCents = 0;

  cart.forEach((cartItem)=>{
     const product= getProducts(cartItem.productId);
     productPriceCents += product.priceCents * cartItem.quantity;
    });

    console.log(productPriceCents);
 
      }