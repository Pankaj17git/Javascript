
import { getProduct, products } from "../data/products.js";
import { orders } from "../data/order.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "./utils/money.js";

export function loadPage(){
  let ordersHTML = '';
  
  orders.forEach((order) => {
    const orderId = order.orderId

    let matchingOrder;

    products.forEach((product) => {
      if ( product.id === orderId) {
        matchingOrder = product
      }
    });

    ordersHTML += `
    <div class="order-container">     
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>August 12</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$35.06</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
      </div>
    </div>

    <div class="order-details-grid">
      ${productsListHTML(order)}
    </div>
  </div>
    `;
  });

  function productsListHTML(order) {
  let productsListHTML = '';

  products.forEach((productDetails) => {
    const product = getProduct(productDetails.productId);
    console.log(productDetails);

    productsListHTML += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
        ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${
            dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
          }
        </div>
        <div class="product-quantity">
          Quantity: ${productDetails.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });

  return productsListHTML;
}

  // orders.forEach((order) => {
  //   const productId = order.productId;

  //   let matchingProduct;

  //   products.forEach((product) => {
  //     if ( product.id === productId) {
  //       matchingProduct = product;
  //     }
  //   });

   
  //   const orderTimeString = dayjs(order.orderTime).format('MMMM D');

  //   ordersHTML += `
  //     <div class="order-container">
  //       <div class="order-header">
  //         <div class="order-header-left-section">
  //           <div class="order-date">
  //             <div class="order-header-label">Order Placed:</div>
  //             <div>${orderTimeString}</div>
  //           </div>
  //           <div class="order-total">
  //             <div class="order-header-label">Total:</div>
  //             <div>$${formatCurrency(order.totalCostCents)}</div>
  //           </div>
  //         </div>
  //         <div class="order-header-right-section">
  //           <div class="order-header-label">Order ID:</div>
  //           <div>654564646574ddg6dfhgdrgd</div>
  //         </div>
  //       </div>
  //       <div class="order-details-grid">
  //         ${productsListHTML(order)}
  //       </div>
  //     </div>
  //   `;
  // });

  // function productsListHTML(order) {
  //   let productsListHTML = '';
    
    

  //   products.forEach((productDetails) => {
  //     const product = getProduct(productDetails.productId);

  //     productsListHTML += `
  //       <div class="product-image-container">
  //         <img src="${product.image}">
  //       </div>
  //       <div class="product-details">
  //         <div class="product-name">
  //           ${product.name}
  //         </div>
  //         <div class="product-delivery-date">
  //           Arriving on: ${
  //             dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
  //           }
  //         </div>
  //         <div class="product-quantity">
  //           Quantity: ${productDetails.quantity}
  //         </div>
  //         <button class="buy-again-button button-primary">
  //           <img class="buy-again-icon" src="images/icons/buy-again.png">
  //           <span class="buy-again-message">Buy it again</span>
  //         </button>
  //       </div>
  //       <div class="product-actions">
  //         <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
  //           <button class="track-package-button button-secondary">
  //             Track package
  //           </button>
  //         </a>
  //       </div>
  //     `;
  //   });

  //   return productsListHTML;
  // }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}
  
loadPage();