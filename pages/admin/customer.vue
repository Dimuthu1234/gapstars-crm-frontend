<template>
  <div class="container-fluid">
    <div class="row">
      <Sidebar />
      <main role="main" class="col-md-12 ml-sm-auto col-lg-10 px-4">
        <div
          class="d-md-flex d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <h1 class="h2">Customers</h1>
          <div class="btn-toolbar">
            <div class="btn-group mr-2">
              <button
                v-b-tooltip.hover
                title="Import csv"
                type="button"
                class="btn btn-sm btn-outline-secondary"
              >
                Import CSV
              </button>
              <button
                v-b-tooltip.hover
                title="Export csv"
                type="button"
                class="btn btn-sm btn-outline-secondary ml-2"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>
        <div
          class="d-md-flex d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <input
            v-model="searchText"
            type="text"
            name="search"
            class="form-control"
            placeholder="Search customers... ( Filter by : email address, phone numbers, first name, last name )"
            style="width: 80%;"
          />
          <div class="btn-toolbar">
            <div class="btn-group mr-2">
              <b-button
                v-b-modal.modal-1
                v-b-tooltip.hover
                title="Add Customer"
                type="button"
                class="btn btn-outline-secondary"
                style="padding: 12px;"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-plus"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Customer
              </b-button>
              <b-modal
                id="modal-1"
                ref="customer-modal"
                hide-footer
                title="Add a Customer"
              >
                <form class="signup-form" @submit.prevent="addCustomer">
                  <div class="form-group">
                    <label>First Name</label>
                    <input
                      id="first_name"
                      v-model="form.first_name"
                      type="text"
                      class="form-control"
                      placeholder="Enter your first name"
                      name="first_name"
                    />
                  </div>
                  <div class="form-group">
                    <label>Last Name</label>
                    <input
                      id="last_name"
                      v-model="form.last_name"
                      type="text"
                      class="form-control"
                      placeholder="Enter your last name"
                      name="last_name"
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
                    <label style="display: flex"
                      >Telephone Number (s.) &nbsp;&nbsp;
                      <a @click="addNumber"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-plus-circle"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="16"></line>
                          <line x1="8" y1="12" x2="16" y2="12"></line></svg></a
                    ></label>

                    <div
                      v-for="input in form.phone_numbers"
                      :key="input.id"
                      style="display: flex"
                      class="inputArea"
                    >
                      <input
                        :id="input.id"
                        v-model="input.value"
                        type="text"
                        class="form-control"
                        placeholder="Enter your telephone number"
                        name="telephone"
                        style="margin-top: 10px"
                      />
                      <a
                        style="padding-top: 20px; padding-left: 10px"
                        @click="removeNumber(input.id)"
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
                          class="feather feather-x-circle"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Create Customer
                  </button>
                </form>
              </b-modal>
            </div>
          </div>
        </div>
        <Loader v-if="loading" />
        <div v-if="customers.length > 0">
          <CustomerList :customers="customers" />
        </div>
        <div v-else>
          <h3><i>There are no customers right now!!</i></h3>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Loader from "../../components/common/Loader";
import Sidebar from "../../components/admin/Sidebar";
import CustomerList from "~/components/admin/CustomerList";

export default {
  components: {
    CustomerList,
    Loader,
    Sidebar
  },
  layout: "admin",
  middleware: "auth",
  data() {
    return {
      loading: true,
      customers: [],
      counter: 0,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        phone_numbers: [
          {
            id: "number0",
            label: "Enter phone number",
            value: ""
          }
        ]
      }
    };
  },
  computed: {
    searchText: {
      get() {
        return this.$route.query.search;
      },
      set(searchText) {
        if (searchText) {
          this.$router.push(
            {
              query: {
                ...this.$route.query,
                search: searchText
              }
            },
            () => {}
          );
        } else {
          let query = { ...this.$route.query };
          delete query.search;
          this.$router.replace({ query }, () => {});
        }
      }
    }
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      handler: function(newVal, oldVal) {
        if (newVal === oldVal) return;

        this.fetchCustomers();
      }
    }
  },
  mounted() {
    this.fetchCustomers();
  },
  methods: {
    addNumber() {
      this.form.phone_numbers.push({
        id: `number${++this.counter}`,
        label: "Enter phone number",
        value: ""
      });
    },
    // eslint-disable-next-line no-unused-vars
    removeNumber(inputId) {
      let filteredNumber = this.form.phone_numbers.filter(
        input => input.id === inputId
      );
      this.form.phone_numbers.splice(filteredNumber, 1);
    },
    async addCustomer() {
      try {
        this.$axios.setBaseURL("http://localhost:8000");
        await this.$axios
          .post("api/customer", this.form)
          .then(response => {
            if (response.status === 201) {
              this.fetchCustomers();
              this.form.first_name = "";
              this.form.last_name = "";
              this.form.email = "";
              this.form.phone_numbers = [
                {
                  id: "number0",
                  label: "Enter phone number",
                  value: ""
                }
              ];
              this.$refs["customer-modal"].hide();
              this.$toast.success("Customer adding successfully!...");
            } else {
              this.$toast.error("Invalid data!...");
            }
          })
          .catch(e => {
            this.$toast.error(e);
          });
      } catch (e) {
        this.$toast.error(e.message);
      }
    },

    async fetchCustomers() {
      this.$axios.setBaseURL("http://localhost:8000");
      let customers = await this.$axios.get("api/customer", {
        params: {
          ...this.$route.query
        }
      });
      this.customers = customers.data;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
.preloader-loading {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.66);
  z-index: 999;

  .loader {
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    left: 50%;
    color: #fff;
  }
}

.recent-orders-box {
  margin-top: 30px;

  .title {
    position: relative;

    h3 {
      margin-bottom: 15px;
      font: {
        size: 20px;
        weight: 600;
      }
    }

    ul {
      padding-left: 0;
      margin-bottom: 0;
      list-style-type: none;
      position: absolute;
      right: 0;
      top: -10px;

      li {
        display: inline-block;
        margin-left: 5px;

        a,
        button {
          display: block;
          background-color: #f2f2f2;
          color: #000000;
          padding: 5px 15px;
          border: none;
          transition: 0.5s;

          &:hover {
            background-color: #000000;
            color: #fff;
          }
        }

        &:nth-child(2) {
          a,
          button {
            &:hover {
              background-color: red;
              color: #fff;
            }
          }
        }

        &:nth-child(3) {
          a,
          button {
            &:hover {
              background-color: green;
              color: #fff;
            }
          }
        }
      }
    }
  }

  table {
    margin-bottom: 0;

    thead {
      th {
        text-align: left;
        white-space: nowrap;
        padding: 15px 15px 15px 0;
        border-bottom: 1px solid #f6f6f7;
        border-color: #f6f6f7;
        font-size: 15px;
      }
    }

    tbody {
      tr {
        td {
          padding: 15px;
          vertical-align: middle;
          white-space: nowrap;
          border-bottom: 1px solid #f6f6f7;
          border-top: none;
          font-size: 14.4px;

          &:first-child {
            padding-left: 0;
          }

          &.name {
            font-weight: 700;
          }

          img {
            width: 50px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

/*
 * Content
 */

[role="main"] {
  padding-top: 133px; /* Space for fixed navbar */
}

@media (min-width: 768px) {
  [role="main"] {
    padding-top: 48px; /* Space for fixed navbar */
  }
}
</style>
