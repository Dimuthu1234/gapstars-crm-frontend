<template>
  <!-- Start Top Header Area -->
  <div class="top-header">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-7 col-md-6">
          <ul v-if="!$auth.loggedIn" class="top-header-nav">
            <li>
              <nuxt-link to="/login">Login</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/signup">Signup</nuxt-link>
            </li>
          </ul>

          <ul v-if="$auth.loggedIn" class="top-header-nav">
            <li><a href="" @click.prevent="logout">Logout</a></li>
            <li>
              <nuxt-link to="/profile">{{ $auth.user.name }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="col-lg-5 col-md-6">
          <ul class="top-header-right-nav">
            <li>
              <nuxt-link to="/products">Products</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/contact">Contact</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/blog-one">Blog</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/cart">Cart</nuxt-link>
            </li>
            <li>
              <div class="languages-list">
                <select>
                  <option value="1">Eng</option>
                  <option value="2">Ger</option>
                  <option value="3">Span</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- End Top Header Area -->
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout();
    }
  }
};
</script>
