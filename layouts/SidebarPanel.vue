<template>
  <div>
    <div v-if="isPanelOpen" class="modal-backdrop"></div>
    <!-- Start Shopping Cart Modal -->
    <transition name="slide-fade">
      <div
        v-if="isPanelOpen"
        id="shoppingCartModal"
        class="modal right shoppingCartModal"
        tabindex="-1"
        role="dialog"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <button type="button" class="close" @click="closeSidebarPanel">
              <span aria-hidden="true">&times;</span>
            </button>

            <div v-if="cart.length > 0" class="modal-body">
              <h3>My Cart ({{ cart.length }})</h3>

              <div class="product-cart-content">
                <div v-for="cart in cart" :key="cart.id" class="product-cart">
                  <div class="product-image">
                    <img :src="cart.image" :alt="cart.name" />
                  </div>

                  <div class="product-content">
                    <h3>
                      <a href="#">{{ cart.name }}</a>
                    </h3>
                    <span>Blue / XS</span>
                    <div class="product-price">
                      <span>{{ cart.quantity }}</span>
                      <span>x</span>
                      <span class="price">${{ cart.price }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="product-cart-subtotal">
                <span>Subtotal</span>

                <span class="subtotal">${{ cartTotal }}</span>
              </div>

              <div class="product-cart-btn" @click="closeSidebarPanel">
                <nuxt-link to="/checkout" class="btn btn-primary"
                  >Proceed to Checkout</nuxt-link
                >
                <nuxt-link to="/cart" class="btn btn-light"
                  >View Shopping Cart</nuxt-link
                >
              </div>
            </div>
            <div v-else class="modal-body">
              <h3>Empty!</h3>
              <div class="product-cart-btn" @click="closeSidebarPanel">
                <nuxt-link to="/products" class="btn btn-primary"
                  >Browse All Time Hot!</nuxt-link
                >
                <nuxt-link to="/products" class="btn btn-light"
                  >Browse Latest!</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- End Shopping Cart Modal -->
  </div>
</template>

<script>
import { store, mutations } from "../utils/sidebar-util";

export default {
  name: "SidebarPanel",
  computed: {
    isPanelOpen() {
      return store.isNavOpen;
    },
    cart() {
      return this.$store.getters.cart;
    },
    cartTotal() {
      return this.$store.getters.totalAmount;
    }
  },
  methods: {
    closeSidebarPanel: mutations.toggleNav
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/styles/_transitions.scss";
</style>
