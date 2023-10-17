import { cart, removeCartItem, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyFix } from "./utils/money.js";

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
     const {productId} = cartItem;

      let matchingProduct;

      products.forEach((product) => {
        if(product.id === productId){
          matchingProduct=product;
        }
      });


      cartSummaryHTML +=
    `
    <div class="cart-item-container js-add-to-cart-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, December 21
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
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update is-editing-quantity" 
              data-product-id="${matchingProduct.id}">
                Update 
              </span>
              <input class="quantity-input">
              <span class="save-quantity-link link-primary">Save</span>
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
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Tuesday, December 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Wednesday, December 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Monday, December 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
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
    
      document.querySelector('.js-check-out-items')
          .innerHTML = `${cartQuantity} items`;
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
    
