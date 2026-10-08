<template>
  <div class="cart-page">
    <div class="cart-container">

      <!-- Page Header -->
      <div class="cart-header">
        <h1>Shopping Cart</h1>
        <span>{{ cartItems.items.length }} Items</span>
      </div>

      <div class="cart-layout">

        <!-- Cart Items -->
        <section class="cart-items">

            <div class="cart-item" v-for="cartItem of cartItems.items" :key="cartItem.product.id">
            <img
              :src="cartItem.product.thumbnail"
              alt="Product"
              class="product-image"
            />

            <div class="product-info">
              <h2>{{ cartItem.product.title }} - ₹{{ cartItem.product.price }}</h2>
              <p class="product-category">{{ cartItem.product.category }}</p>

             
              <div class="quantity">
                <button @click="cartItems.decreaseQuantity(cartItem.product.id)">-</button>
                <span>{{ cartItem.quantity }}</span>
                <button @click="cartItems.addToCart(cartItem.product)">+</button>
              </div>
            </div>

            <div class="item-price">
              <h2>{{ (cartItem.product.price * cartItem.quantity).toFixed(2) }}</h2>
              <button @click="cartItems.removeFromCart(cartItem.product.id)" class="remove-btn">Remove</button>
            </div>
          </div>
  
          <button class="continue-shopping">
             <RouterLink to="/">← Continue Shopping</RouterLink>
          </button>

        </section>


        <!-- Order Summary -->
        <aside class="order-summary">

          <h2>Order Summary</h2>

          <div class="summary-row">
            <span>Subtotal</span>
            <span>₹{{subTotal}}</span>
          </div>

          <div class="summary-row">
            <span>Discount</span>
            <span class="discount">-₹{{ discount }}</span>
          </div>

          <div class="summary-row">
            <span>Shipping</span>
            <span class="free">FREE</span>
          </div>

          <div class="divider"></div>

          <div class="summary-total">
            <span>Total</span>
            <strong>₹{{ (Number(subTotal) - discount).toFixed(2) }}</strong>
          </div>

          <!-- Coupon -->
          <div class="coupon">
            <input
              type="text"
              placeholder="Coupon code"
            />

            <button>Apply</button>
          </div>

          <button class="checkout-btn">
            Proceed to Checkout
          </button>

          <p class="secure-checkout">
            🔒 Secure checkout
          </p>

        </aside>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This is a static cart page for demonstration purposes.
import useCartStore from '@/stores/cartStore'
import { onMounted, computed } from 'vue';

const cartItems = useCartStore()  

const subTotal = computed(() => cartItems.items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2));
const discount = 0;
// In a real application, you would fetch cart data from a store or API. 

onMounted(() => {
  // Simulate fetching cart data
  console.log('Cart page mounted. Cart items:', cartItems.items);
}); 


</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: #f7f7f7;
  padding: 40px 20px;
}

.cart-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */

.cart-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
}

.cart-header h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
}

.cart-header span {
  color: #777;
  font-size: 15px;
}


/* Main Layout */

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 30px;
  align-items: start;
}


/* Cart Items */

.cart-items {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #e5e5e5;
}

.product-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  background: #f3f3f3;
}

.product-info h2 {
  margin: 0 0 6px;
  font-size: 18px;
}

.product-category {
  margin: 0 0 12px;
  color: #777;
  font-size: 14px;
}

.product-options {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #555;
}


/* Quantity */

.quantity {
  display: flex;
  align-items: center;
  width: fit-content;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.quantity button {
  width: 32px;
  height: 32px;
  border: none;
  background: #fff;
  cursor: pointer;
  font-size: 18px;
}

.quantity span {
  width: 35px;
  text-align: center;
  font-size: 14px;
}


/* Price */

.item-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
}

.item-price strong {
  font-size: 18px;
}

.remove-btn {
  border: none;
  background: none;
  color: #d33;
  cursor: pointer;
  font-size: 13px;
}


/* Continue Shopping */

.continue-shopping {
  margin-top: 25px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}


/* Order Summary */

.order-summary {
  background: #fff;
  border-radius: 10px;
  padding: 25px;
  position: sticky;
  top: 20px;
}

.order-summary h2 {
  margin: 0 0 25px;
  font-size: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 14px;
}

.discount {
  color: #159447;
}

.free {
  color: #159447;
  font-weight: 600;
}

.divider {
  height: 1px;
  background: #e5e5e5;
  margin: 20px 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin-bottom: 25px;
}

.summary-total strong {
  font-size: 22px;
}


/* Coupon */

.coupon {
  display: flex;
  margin-bottom: 20px;
}

.coupon input {
  min-width: 0;
  flex: 1;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 6px 0 0 6px;
  outline: none;
}

.coupon button {
  width: 80px;
  border: none;
  background: #222;
  color: #fff;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
}


/* Checkout */

.checkout-btn {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 6px;
  background: #111;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.secure-checkout {
  text-align: center;
  margin: 15px 0 0;
  color: #777;
  font-size: 13px;
}


/* Responsive */

@media (max-width: 768px) {
  .cart-page {
    padding: 25px 15px;
  }

  .cart-layout {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
  }

  .cart-item {
    grid-template-columns: 90px 1fr;
  }

  .product-image {
    width: 90px;
    height: 90px;
  }

  .item-price {
    grid-column: 2;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>