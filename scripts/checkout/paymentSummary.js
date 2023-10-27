import { calculateCartQuantity, cart } from "../../data/cart.js";
import { getProducts } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { moneyFix } from "../utils/money.js";

export function renderPayment(){

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem)=>{
     const product= getProducts(cartItem.productId);
     productPriceCents += product.priceCents * cartItem.quantity;

     const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
     shippingPriceCents += deliveryOption.priceCents;

    });

    const totalBeforeTax = productPriceCents+shippingPriceCents;
    const taxCents = totalBeforeTax *0.1;
    const total = totalBeforeTax + taxCents;

    console.log(productPriceCents);
    console.log(shippingPriceCents);

    const paymentHTML =
    
    `
    <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${calculateCartQuantity()}):</div>
    <div class="payment-summary-money">₹${productPriceCents}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">₹${shippingPriceCents}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">₹${totalBeforeTax}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">₹${moneyFix(taxCents)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">₹${total}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
    `;

    document.querySelector('.js-payment-summary')
      .innerHTML = paymentHTML;
      }