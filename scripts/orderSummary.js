import { cart } from "../data/cart";

 let orderSummaryHTML  =
   `

   <div class="payment-summary-title">
   Order Summary
 </div>

 <div class="payment-summary-row">
   <div>Items (3):

   </div>
   <div class="payment-summary-money">$42.75</div>
 </div>

 <div class="payment-summary-row">
   <div>Shipping &amp; handling:</div>
   <div class="payment-summary-money">$4.99</div>
 </div>

 <div class="payment-summary-row subtotal-row">
   <div>Total before tax:</div>
   <div class="payment-summary-money">$47.74</div>
 </div>

 <div class="payment-summary-row">
   <div>Estimated tax (10%):</div>
   <div class="payment-summary-money">$4.77</div>
 </div>

 <div class="payment-summary-row total-row">
   <div>Order total:</div>
   <div class="payment-summary-money">$52.51</div>
 </div>

 <button class="place-order-button button-primary">
   Place your order
 </button>
   `;

  
    document.querySelector('.js-payment-summary')
        .innerHTML= orderSummaryHTML;

        function updateCart(){
          const cartQuantity = calculateCartQuantity();
  
          document.querySelector('.js-pay-check-out-items')
              .innerHTML = `${cartQuantity} items`;
        }

        function calculateCartQuantity() {
          let cartQuantity = 0;
        
          cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
          });
        
          return cartQuantity;
        }	

        updateCart();
   