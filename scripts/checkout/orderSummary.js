import { cart, removeCartItem, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products,getProducts } from "../../data/products.js";
import { moneyFix } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions,getDeliveryOption } from "../../data/deliveryOption.js";


export function render(){

let totalSubtotal = 0;
let cartQuantity = 0;
  let cartSummaryHTML = '';


  cart.forEach((cartItem) => {
    
     const {productId, quantity} = cartItem;

      const matchingProduct = getProducts(productId);
    
      const subtotal = Number.parseFloat(moneyFix(matchingProduct.priceCents) * quantity).toFixed(2);
      totalSubtotal += parseFloat(subtotal);

      cartQuantity += quantity;
      
      const deliveryOptionId = cartItem.deliveryOptionId;

      const deliveryOption = getDeliveryOption(deliveryOptionId);


      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,'days');
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      cartSummaryHTML +=
    `
    <div class="cart-item-container js-add-to-cart-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${moneyFix(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label 
                js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update is-editing-quantity" 
              data-product-id="${matchingProduct.id}">
                Update 
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save" 
              data-product-id="${matchingProduct.id}"
              >Save</span>
              <span class="delete-quantity-link link-primary js-delete"
              data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingProduct,cartItem)}
          </div>
        </div>
      </div>
 `;
      function deliveryOptionHTML(matchingProduct,cartItem){

        let HTML = '';

                  deliveryOptions.forEach((deliveryOption)=>{
                    const today = dayjs();
                    const deliveryDate = today.add(
                      deliveryOption.deliveryDays,'days');
                    const dateString = deliveryDate.format(
                      'dddd, MMMM D'
                    );

                    const priceString = deliveryOption.priceCents 
                    ===0 ? 'FREE Shipping' : `$${moneyFix(deliveryOption.priceCents)} - Shipping`;

                    const isChecked = deliveryOption.id ===
                    cartItem.deliveryOptionId;

               HTML +=`
                    <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
              <input type="radio" ${isChecked ? 'checked': ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  ${priceString}
                </div>
              </div>
            </div>
                    `
                  });

                  return HTML;
      }
  
});
  

      document.querySelector('.js-order-summary')
          .innerHTML = cartSummaryHTML;

      document.querySelectorAll('.js-delete')
          .forEach((link)=>{
              link.addEventListener('click', ()=>{
              const {productId} = link.dataset;
            removeCartItem(productId);
      const container =  document.querySelector(`.js-add-to-cart-${productId}`)
      container.remove();

      updateCart();
            });
          });

      

      function updateCart(){
        const cartQuantity = calculateCartQuantity();

        if(cartQuantity === 1){
          document.querySelector('.js-check-out-items')
            .innerHTML = `${cartQuantity} item`;
        }else if(cartQuantity === 0){
          document.querySelector('.js-check-out-items')
            .innerHTML = 'your cart is empty';
        }
        else{
        document.querySelector('.js-check-out-items')
            .innerHTML = `${cartQuantity} items`;
        }
      }
      updateCart();

      document.querySelectorAll('.js-update')
          .forEach((link)=>{
              link.addEventListener('click', ()=>{
                const {productId} = link.dataset;
          
          const container = document.querySelector(`.js-add-to-cart-${productId}`);
            container.classList.add('is-editing-quantity');
              });
          });
          
      document.querySelectorAll('.js-save')
          .forEach((link)=>{
              link.addEventListener('click',()=>{
                const {productId} = link.dataset;

              const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
              
                const newQuantity = Number(quantityInput.value);

                if(newQuantity<=0 || newQuantity >10){
                  alert('quantity must be at least 1 and less than 10');
                  return;
                }

                updateQuantity(productId,newQuantity);

                const container = document.querySelector(`.js-add-to-cart-${productId}`);
                container.classList.remove('is-editing-quantity');

                const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

                quantityLabel.innerHTML = newQuantity;

                updateCart();
              });
          });
          
          

      
         document.querySelectorAll('.js-delivery-option')
              .forEach((element) =>{
                  element.addEventListener('click',()=>{
                    const {productId,deliveryOptionId} = element.dataset;
                    updateDeliveryOption(productId,deliveryOptionId);
                    render();
                  })
              });
            }