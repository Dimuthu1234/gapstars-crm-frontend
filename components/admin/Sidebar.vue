<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <nuxt-link
              v-b-tooltip.hover
              title="Dashboard"
              class="nav-link"
              :class="$route.path === '/admin/profile' ? ' active' : ''"
              to="/admin/profile"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            {{ $auth.user.name }}
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="$auth.user.is_admin">
          <nuxt-link
              v-b-tooltip.hover
              title="All Customers"
              class="nav-link"
              :class="$route.path === '/admin/customer' ? ' active' : ''"
              to="/admin/customer"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-users"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Customers
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="$auth.user.is_admin">
          <nuxt-link
              v-b-tooltip.hover
              title="All Users"
              class="nav-link"
              :class="$route.path === '/admin/user' ? ' active' : ''"
              to="/admin/user"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-users"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Users
          </nuxt-link>
        </li>
        <li class="nav-item">
          <a
              v-b-tooltip.hover
              title="User Logout"
              class="nav-link"
              @click.prevent="logout"
              style="cursor: pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
                 stroke-width="2"
                 stroke-linecap="round"
                 stroke-linejoin="round"
                 class="feather feather-power"
            >
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
              <line x1="12" y1="2" x2="12" y2="12"></line>
            </svg>
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout();
    }
  }
}
</script>
