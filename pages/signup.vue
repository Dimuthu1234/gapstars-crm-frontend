<template>
  <div>
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li>
            <nuxt-link to="/">Signup</nuxt-link>
          </li>
          <li>404 Not Found</li>
        </ul>
      </div>
    </div>

    <section class="signup-area ptb-60">
      <div class="container">
        <div class="signup-content">
          <div class="section-title">
            <h2><span class="dot"></span> Create an Account</h2>
          </div>

          <form class="signup-form" @submit.prevent="register">
            <div class="form-group">
              <label>Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="form-control"
                placeholder="Enter your name"
                name="name"
              />
            </div>

            <div class="form-group">
              <label>Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-control"
                placeholder="Enter your email"
                name="email"
              />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                class="form-control"
                placeholder="Enter your password"
                name="password"
              />
            </div>

            <div class="form-group">
              <label>Confirm Password</label>
              <input
                id="password_confirmation"
                v-model="form.password_confirmation"
                type="password"
                class="form-control"
                placeholder="Enter your password"
                name="password_confirmation"
              />
            </div>

            <button type="submit" class="btn btn-primary">Signup</button>

            <nuxt-link to="/" class="return-store"
              >or Return to Store</nuxt-link
            >
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      errors: {
        name: "",
        email: "",
        password: ""
      }
    };
  },

  methods: {
    async register() {
      try {
        this.$axios.setBaseURL("http://localhost:8000");
        await this.$axios.get("sanctum/csrf-cookie");
        await this.$axios.post("register", this.form);

        await this.$auth.loginWith("laravelSanctum", {
          data: { email: this.form.email, password: this.form.password }
        });
        this.$toast.success("User has successfully logged into the system.");
      } catch (e) {
        this.$toast.error("Invalid data", {
          icon: "fas fa-times"
        });
      }
    }
  }
};
</script>
